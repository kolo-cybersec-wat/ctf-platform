import csv
import tomllib
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from ctf_platform_backend.api.models import CompetitionTeam, CompetitionTeamMember, CompetitionTask, \
    CompetitionCompletedTask, Competition, TaskCategory


class Command(BaseCommand):
    help = 'Import users and tasks from CSV and TOML files'

    def add_arguments(self, parser):
        parser.add_argument('users_file', type=str, help='Path to the CSV file with users')
        parser.add_argument('tasks_file', type=str, help='Path to the TOML file with tasks')

    def _add_contestants(self, users_file_path):
        # Import users from CSV
        with open(users_file_path, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                name = row['user_full_name']
                team_name = row["team_name"]
                email = row['user_email']

                # Create or get user
                user, created = User.objects.get_or_create(
                    name=name, username=email, email=email
                )
                if created:
                    user.save()
                self.stdout.write(self.style.SUCCESS(f'User {email} {"created" if created else "already exists"}'))

                # Create or get team
                team, created = CompetitionTeam.objects.get_or_create(competition=Competition.objects.first(),
                                                                      name=team_name)
                if created:
                    team.save()
                self.stdout.write(self.style.SUCCESS(f'Team {team_name} {"created" if created else "already exists"}'))

                # Add user to team through CompetitionTeamMember
                competition_team_member, created = CompetitionTeamMember.objects.get_or_create(team=team, user=user)
                if created:
                    competition_team_member.save()
                self.stdout.write(self.style.SUCCESS(f'User {email} added to team {team_name}'))

    def _add_tasks(self, tasks_file_path):
        competition, created = Competition.objects.get_or_create(
            name="Studenckie zawody CTF",
        )
        # Create or get competition
        if created:
            competition.save()
        self.stdout.write(
            self.style.SUCCESS(f'Competition {competition.name} {"created" if created else "already exists"}'))

        # Import tasks from TOML
        with open(tasks_file_path, 'rb') as tomlfile:
            data = tomllib.load(tomlfile)
            for task_data in data['tasks']:
                title = task_data['title']
                category_name = task_data['category_name']
                description = task_data['description']
                points = task_data['points']
                flag = task_data['flag']

                # Create or get category
                category, created = TaskCategory.objects.get_or_create(name=category_name)
                if created:
                    category.save()
                self.stdout.write(
                    self.style.SUCCESS(f'Category {category_name} {"created" if created else "already exists"}'))

                # Create or get task
                task, created = CompetitionTask.objects.get_or_create(
                    title=title, category=category, competition=competition,
                    description=description, points=points, flag=flag
                )
                if created:
                    task.save()
                self.stdout.write(self.style.SUCCESS(f'Task {title} {"created" if created else "already exists"}'))

    def handle(self, *args, **options):
        users_file_path = options['users_file']
        tasks_file_path = options['tasks_file']

        self._add_tasks(tasks_file_path)
        self._add_contestants(users_file_path)

        self.stdout.write(self.style.SUCCESS('Data import completed'))
