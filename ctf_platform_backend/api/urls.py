from django.urls import path

from ctf_platform_backend.api.views import (
    CompetitionViewSet,
    CompetitionTasksViewSet,
    SubmitFlagView,
    CompetitionScoreboardView,
)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"competitions", CompetitionViewSet, basename="competition")
router.register(
    r"competition-tasks", CompetitionTasksViewSet, basename="competition-tasks"
)

urlpatterns = [
    path("submit-flag/", SubmitFlagView.as_view()),
    path(
        "competition-scoreboard/",
        CompetitionScoreboardView.as_view(),
        name="competition-scoreboard",
    ),
]

urlpatterns += router.urls
