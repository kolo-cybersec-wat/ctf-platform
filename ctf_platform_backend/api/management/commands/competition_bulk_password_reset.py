import csv
import random
from django.core.management.base import BaseCommand
from ctf_platform_backend.api.models import Competition, CompetitionTeam


class Command(BaseCommand):
    help = 'Reset passwords of team members in a competition and save to a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('competition_slug', type=str, help='Competition slug for which to reset passwords')

    def handle(self, *args, **kwargs):
        competition_slug = kwargs['competition_slug']

        try:
            competition = Competition.objects.get(slug=competition_slug)
        except Competition.DoesNotExist:
            self.stderr.write(self.style.ERROR(f'Competition with slug {competition_slug} does not exist'))
            return

        teams = CompetitionTeam.objects.filter(competition=competition)

        # Collect user information and reset passwords
        user_info_list = []
        for team in teams:
            for user in team.members.all():
                new_password = self.generate_random_password()
                user.set_password(new_password)
                user.save()
                user_info_list.append({
                    'full_name': user.get_full_name(),
                    'email': user.email,
                    'team_name': team.name,
                    'new_password': new_password,
                })

        # Save user information to CSV file
        csv_filename = f'.files/reset_passwords_{competition.slug}.csv'
        with open(csv_filename, 'w', newline='') as csv_file:
            fieldnames = ['full_name', 'email', 'team_name', 'new_password']
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader()
            for user_info in user_info_list:
                writer.writerow(user_info)

        self.stdout.write(self.style.SUCCESS(f'Reset passwords and saved to {csv_filename}'))

    def generate_random_password(self):
        # Generate a random password (you can customize this according to your needs)
        characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
        return ''.join(random.choice(characters) for i in range(12))