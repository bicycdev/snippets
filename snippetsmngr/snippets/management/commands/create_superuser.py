from django.contrib.auth import get_user_model
User = get_user_model()
from optparse import make_option
from django.core.management.base import BaseCommand



class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('--user',
                    action='store',
                    default=None,
                    help='Username for new user'),
        parser.add_argument('--password',
                    action='store',
                    default=None,
                    help='User Password'),
        parser.add_argument('--email',
                    action='store',
                    default=None,
                    help='User Email Address')

    def handle(self, *args, **kwargs):
        user = User.objects.create_superuser(
            pk=1,
            username=options['delete'].strip(),
            email=options['email'].strip(),
            password=options['password'].strip(),
            )
        user.save()
