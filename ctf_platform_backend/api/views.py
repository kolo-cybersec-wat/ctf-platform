from django.db.models import OuterRef, Subquery, Sum, F, Count
from rest_framework import status, viewsets, views, permissions
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from ctf_platform_backend.api.models import (
    Competition,
    CompetitionTask,
    CompetitionCompletedTask,
    CompetitionTeamMember,
    CompetitionTeam,
)
from ctf_platform_backend.api.serializers import (
    CompetitionSerializer,
    CompetitionTaskSerializer,
    SubmitFlagSerializer,
)


class CompetitionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer
    lookup_field = "slug"


class CompetitionTasksViewSet(viewsets.ModelViewSet):
    queryset = CompetitionTask.objects.all()
    serializer_class = CompetitionTaskSerializer

    @action(detail=False, methods=["GET"])
    def by_competition(self, request):
        competition_slug = request.query_params.get("competition_slug", None)
        competition = get_object_or_404(Competition, slug=competition_slug)

        user_team_member = None

        try:
            user_team_member = CompetitionTeamMember.objects.filter(
                user=request.user, team__competition=competition
            ).get()
        except CompetitionTeamMember.DoesNotExist:
            return Response(status=status.HTTP_403_FORBIDDEN)

        user_team = user_team_member.team

        completed_task_subquery = (
            CompetitionCompletedTask.objects.filter(
                task=OuterRef("pk"), competition_team=user_team
            )
            .annotate()
            .values("pk")[:1]
        )

        competition_tasks = (
            self.queryset.filter(competition=competition)
            .annotate(is_completed=Subquery(completed_task_subquery))
            .all()
        )

        serializer = self.get_serializer(competition_tasks, many=True)
        return Response(serializer.data)


class SubmitFlagView(views.APIView):
    # TODO(micorix): Scope by competition
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        return Response(
            {
                "success": False,
            },
            status=status.HTTP_403_FORBIDDEN,
        )

        serializer = SubmitFlagSerializer(
            data=self.request.data, context={"request": self.request}
        )

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "wrong_flag": True,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        task = CompetitionTask.objects.get(pk=serializer.validated_data["task_pk"])
        completed_task, created = CompetitionCompletedTask.objects.get_or_create(
            competition_team=CompetitionTeam.get_from_competition_and_user(
                task.competition, request.user
            ),
            user=request.user,
            task=task,
        )
        if created:
            completed_task.save()

        return Response(
            {
                "success": True,
            },
            status=status.HTTP_202_ACCEPTED,
        )


class CompetitionScoreboardView(views.APIView):
    # TODO(micorix): Scope by competition
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        competition_slug = request.query_params.get("competition_slug", None)

        competition = get_object_or_404(Competition, slug=competition_slug)

        competition_teams = CompetitionTeam.objects.filter(
            competition=competition
        ).all()

        teams_total_scores = (
            competition_teams.annotate(
                total_score=Sum("competitioncompletedtask__task__points")
            )
            .order_by("-total_score")
            .all()
        )

        return Response(
            {
                "success": True,
                "teams": [
                    {"name": team.name, "total_score": team.total_score}
                    for team in teams_total_scores
                ],
            },
            status=status.HTTP_200_OK,
        )
