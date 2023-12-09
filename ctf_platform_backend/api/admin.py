from django.contrib import admin
from ctf_platform_backend.api.models import (
    Competition,
    TaskCategory,
    CompetitionTask,
    CompetitionCompletedTask,
    CompetitionTeam,
    CompetitionTeamMember, CompetitionTaskFile,
)

models_to_register = [
    Competition,
    TaskCategory,
    CompetitionCompletedTask,
    CompetitionTeam,
    CompetitionTeamMember,
]

for model in models_to_register:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass


class CompetitionTaskFileAdmin(admin.StackedInline):
    model = CompetitionTaskFile


@admin.register(CompetitionTask)
class CaseAdmin(admin.ModelAdmin):
    inlines = [CompetitionTaskFileAdmin]


@admin.register(CompetitionTaskFile)
class CompetitionTaskFileAdmin(admin.ModelAdmin):
    pass
