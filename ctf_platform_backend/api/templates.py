from typing import NamedTuple, List, Any

from django.db import models
from reactivated import template, Pick

from ctf_platform_backend.api.forms import FlagSubmissionForm
from ctf_platform_backend.api.models import Competition, CompetitionTask, CompetitionCompletedTask


class EmptyTemplate(NamedTuple):
    empty: bool


@template
class LoginTemplate(NamedTuple):
    empty: bool


@template
class CompetitionsTemplate(NamedTuple):
    competitions: List[Pick[Competition, "name", "slug"]]


@template
class CompetitionAboutTemplate(NamedTuple):
    competition: Pick[Competition, "name", "slug", "about"]


@template
class CompetitionTasksTemplate(NamedTuple):
    is_user_authenticated: bool
    are_tasks_visible: bool
    completed_task: Pick[CompetitionCompletedTask, "task"]
    competition: Pick[Competition, "name", "slug", "about"]
    tasks: Any
    # tasks: List[Pick[CompetitionTask, "title", "category.name", "description", "points", "pk"]]
    form: FlagSubmissionForm

