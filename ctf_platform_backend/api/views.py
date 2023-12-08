# import logging
#
# from django.core import serializers
# from django.db.models import OuterRef, Subquery
# from django.shortcuts import render, get_object_or_404
#
# # Create your views here.
# from django.http import HttpRequest, HttpResponse
#
# from .forms import FlagSubmissionForm
# from .models import Competition, CompetitionTask, CompetitionCompletedTask
# from .templates import LoginTemplate, CompetitionsTemplate, CompetitionAboutTemplate, CompetitionTasksTemplate
import logging

from django.db.models import OuterRef, Subquery, Sum
from rest_framework import status, viewsets, views, permissions
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ctf_platform_backend.api.models import Competition, CompetitionTask, CompetitionCompletedTask, \
    CompetitionTeamMember, CompetitionTeam
from ctf_platform_backend.api.serializers import CompetitionSerializer, CompetitionTaskSerializer, SubmitFlagSerializer


#
# def create_empty_template_view(template_class):
#     def empty_view(request: HttpRequest) -> HttpResponse:
#         return template_class(empty=True).render(request)
#
#     return empty_view
#
#
# # def my_view(request: HttpRequest) -> HttpResponse:
# #     return MyTemplate(
# #         name="George Washington",
# #         title="President",
# #         age=67,
# #         location="Virginia",
# #     ).render(request)
#
#
# def login_view(request: HttpRequest) -> HttpResponse:
#     return LoginTemplate(empty=True).render(request)
#
#
# def competitions_view(request: HttpRequest) -> HttpResponse:
#     competitions = Competition.objects.all()
#
#     return CompetitionsTemplate(
#         competitions=competitions
#     ).render(request)
#
#
# def competition_about_view(request: HttpRequest, *, slug: str) -> HttpResponse:
#     competition = get_object_or_404(Competition, slug=slug)
#
#     return CompetitionAboutTemplate(
#         competition=competition
#     ).render(request)
#
#
# def create_completed_task(user, form: FlagSubmissionForm) -> CompetitionCompletedTask | None:
#     submitted_task = CompetitionTask.objects.filter(pk=form.cleaned_data["task_pk"]).get()
#     if not submitted_task:
#         form.add_error("task_pk", "Nie znaleziono zadania")
#         return None
#
#     if form.cleaned_data["flag"] != submitted_task.flag:
#         form.add_error("flag", "Błędna flaga")
#         return None
#
#     return CompetitionCompletedTask.objects.get_or_create(
#         task=submitted_task,
#         user=user
#     )
#
#
# def competition_tasks_view(request: HttpRequest, *, slug: str) -> HttpResponse:
#     competition = get_object_or_404(Competition, slug=slug)
#
#     def get_tasks():
#         if not request.user.is_authenticated:
#             return []
#         completed_task_subquery = CompetitionCompletedTask.objects.filter(
#             task=OuterRef('pk'),
#             user=request.user
#         ).annotate().values('pk')[:1]
#
#         return CompetitionTask.objects.filter(competition=competition).annotate(
#             is_completed=Subquery(completed_task_subquery)
#         ).all()
#
#     form = FlagSubmissionForm(request.POST or None)
#
#     completed_task = None
#     if form.is_valid():
#         completed_task = create_completed_task(request.user, form)
#
#     return CompetitionTasksTemplate(
#         is_user_authenticated=request.user.is_authenticated,
#         are_tasks_visible=competition.are_tasks_visible,
#         completed_task=completed_task,
#         competition=competition,
#         tasks=list(get_tasks().values(
#             "pk",
#             "title",
#             "description",
#             "points",
#             "is_completed",
#             "category__name"
#         )),
#         form=form
#     ).render(request)

class CompetitionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer
    lookup_field = 'slug'


class CompetitionTasksViewSet(viewsets.ModelViewSet):
    queryset = CompetitionTask.objects.all()
    serializer_class = CompetitionTaskSerializer

    @action(detail=False, methods=['GET'])
    def by_competition(self, request):
        competition_slug = request.query_params.get('competition_slug', None)
        competition = get_object_or_404(Competition, slug=competition_slug)

        user_team_member = None

        try:
            user_team_member = CompetitionTeamMember.objects.filter(
                user=request.user,
                team__competition=competition
            ).get()
        except CompetitionTeamMember.DoesNotExist:
            return Response(status=status.HTTP_403_FORBIDDEN)

        user_team = user_team_member.team

        completed_task_subquery = CompetitionCompletedTask.objects.filter(
            task=OuterRef('pk'),
            competition_team=user_team
        ).annotate().values('pk')[:1]

        competition_tasks = self.queryset.filter(competition=competition).annotate(
            is_completed=Subquery(completed_task_subquery)
        ).all()

        serializer = self.get_serializer(competition_tasks, many=True)
        return Response(serializer.data)


class SubmitFlagView(views.APIView):
    # TODO(micorix): Scope by competition
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        serializer = SubmitFlagSerializer(
            data=self.request.data,
            context={'request': self.request})

        if not serializer.is_valid():
            return Response({
                'success': False,
                'wrong_flag': True,
            }, status=status.HTTP_400_BAD_REQUEST)

        task = CompetitionTask.objects.get(pk=serializer.validated_data['task_pk'])
        completed_task = CompetitionCompletedTask.objects.create(
            competition_team=CompetitionTeam.get_from_competition_and_user(task.competition, request.user),
            user=request.user,
            task=task
        )
        completed_task.save()

        return Response({
            'success': True,
        },
            status=status.HTTP_202_ACCEPTED
        )


class CompetitionScoreboardView(views.APIView):
    # TODO(micorix): Scope by competition
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        competition_slug = request.query_params.get('competition_slug', None)

        competition = get_object_or_404(Competition, slug=competition_slug)

        competition_teams = CompetitionTeam.objects.filter(competition=competition).all()

        teams_total_scores = competition_teams.annotate(
            total_score=Sum('competitioncompletedtask__task__points')
        ).order_by('-total_score').all()

        return Response({
            'success': True,
            'teams': [{
                'name': team.name,
                'total_score': team.total_score
            } for team in teams_total_scores]
        },
            status=status.HTTP_200_OK
        )