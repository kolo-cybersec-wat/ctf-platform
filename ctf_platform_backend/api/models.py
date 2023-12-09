from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.db import models


class Competition(models.Model):
    name = models.TextField(max_length=255)
    slug = models.SlugField(max_length=255)

    short_description = models.TextField()
    about = models.TextField()

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    is_registration_active = models.BooleanField()
    are_tasks_visible = models.BooleanField()
    are_submissions_open = models.BooleanField()

    def __str__(self):
        return f"Competition: {self.name}"


class TaskCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255)

    def __str__(self):
        return f"Category: {self.name}"


class CompetitionTask(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(TaskCategory, on_delete=models.CASCADE)
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)

    description = models.TextField()
    attachments = ArrayField(models.TextField())
    points = models.FloatField()
    flag = models.TextField()

    def __str__(self):
        return f"Task: {self.title} - {self.competition.name}"


def get_competition_task_file_location(instance, filename):
    task_name = instance.task.title.lower().replace(" ", "-")
    file_name = filename.lower().replace(" ", "-")
    return "competition/{}/{}".format(task_name, file_name)


class CompetitionTaskFile(models.Model):
    task = models.ForeignKey(
        CompetitionTask,
        on_delete=models.CASCADE
    )
    file = models.FileField(upload_to=get_competition_task_file_location, null=True, blank=True)

    def __str__(self):
        return f"File: {self.file} - {self.task.title}"


class CompetitionTeam(models.Model):
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(User, through="CompetitionTeamMember")

    is_approved = models.BooleanField()

    @staticmethod
    def get_from_competition_and_user(competition: Competition, user: User):
        return CompetitionTeam.objects.filter(
            competition=competition, members__exact=user
        ).get()

    def __str__(self):
        return f"Team: {self.name} - {self.competition.name}"


class CompetitionTeamMember(models.Model):
    team = models.ForeignKey(CompetitionTeam, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    @staticmethod
    def get_from_competition_and_user(competition: Competition, user: User):
        return CompetitionTeamMember.objects.filter(
            team__competition=competition, user=user
        ).get()

    def __str__(self):
        return f"Team member: {self.user.username} - {self.team.name} - {self.team.competition.name}"


class CompetitionCompletedTask(models.Model):
    competition_team = models.ForeignKey(CompetitionTeam, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(CompetitionTask, on_delete=models.CASCADE)

    completion_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Completed task: {self.task.title} - {self.competition_team.name} - {self.competition_team.competition.name}"
