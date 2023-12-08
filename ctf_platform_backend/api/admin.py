from django.contrib import admin
from ctf_platform_backend.api.models import Competition, TaskCategory, CompetitionTask, \
    CompetitionCompletedTask, CompetitionTeam, CompetitionTeamMember

# Register your models here.

models_to_register = [
    Competition,
    TaskCategory,
    CompetitionTask,
    CompetitionCompletedTask,
    CompetitionTeam,
    CompetitionTeamMember,
]

for model in models_to_register:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass
