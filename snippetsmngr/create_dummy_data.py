import os
import string
import random
from datetime import timedelta
import sys
import getopt


def start(name, argv):

    try:
        opts, args = getopt.getopt(argv, "hsro", ["help", "syntax"])
    except getopt.GetoptError:
        print('Invalid input. Type --help for help.')
        sys.exit(2)
    if not opts:
        print('No command. Please enter a flag. Type --help for help.')
        sys.exit()
    for opt, arg in opts:
        if opt in ("-h", "--help"):
            print('Help. Usage: create_dummy_data.py -i <inputfile> -o <outputfile>')
            print('-s for syntax creation -r for random pop script -o for one pop script')
            sys.exit()
        elif opt in ("-s", "--syntax"):
            print("Starting syntax pop script...")
            syntax_pop()
        elif opt in ("-r"):
            print("Starting random pop script...")
            random_populate()
        elif opt in ("-o"):
            print("Starting one pop script...")
            populate()


def site_id():
    from django.contrib.sites.models import Site
    Site.objects.create(pk=1, domain='127.0.0.1:8000', name='127.0.0.1:8000')


def syntax_pop():
    # maybe read from text file?
    syntax_list = ['Python', 'HTML']
    for s in syntax_list:
        add_syntax(s)

    # Print out what we have added to the user.
    for s in Syntax.objects.all():
        print("- {0}".format(str(s)))


def populate():
    start_time = timezone.now()
    python_syntax = add_syntax('Python')
    admin_user = get_admin_user(email='test@test.com')

    add_snippet(syntax=python_syntax, title="One snippet at a time",
            text="def: test", visibility='PU', author=admin_user)

    # Print out what we have added to the user.
    for b in Snippet.objects.filter(created_date__gte=start_time):
        print("- {0} - {1} - {2}".format(str(b), str(b.syntax), str(b.views)))

def random_populate():
    snippet_list = []
    plain_syntax = add_syntax('Plain Text')
    python_syntax = add_syntax('Python')
    admin_user = get_admin_user(email='test@test.com')
    for n in range(0, 10):
        syntax = random.choice([python_syntax, plain_syntax])
        title = 'random_{0}'.format(''.join(random.sample(string.digits, 8)))
        text = ''.join(random.sample(string.ascii_lowercase, 10))
        # vis_calc = ['PU']
        vis_calc = ['PU', 'UN', 'PR']
        visibility = random.choice(vis_calc)
        # author = random.choice([admin_user, None]).
        author = admin_user
        expiration_calc = timezone.now() + timedelta(days=1)
        expiration_date = random.choice([expiration_calc, None])
        created_calc = timezone.now() - timedelta(days=random.randrange(0, 80))
        created_date = random.choice([created_calc])
        views = random.randrange(1, 500)
        snippet_list.append(add_snippet(syntax=syntax, title=title, text=text, visibility=visibility, views=views,
                author=author, expiration_date=expiration_date, created_date=created_date))

    # Print out what we have added to the user.
    for b in snippet_list:
        print("- {0} - {1} - {2}".format(str(b), str(b.syntax), str(b.views)))


def add_snippet(title, text, visibility, syntax, author, created_date=None, expiration_date=None, views=0):
    if not created_date:
        created_date = timezone.now()
    p = Snippet.objects.get_or_create(syntax=syntax, title=title, text=text,
                                  visibility=visibility, author=author,
                                  expiration_date=expiration_date,
                                  created_date=created_date, views=views)[0]
    return p


def add_syntax(name):
    s = Syntax.objects.get_or_create(name=name)[0]
    return s


def get_admin_user(email):
    u = User.objects.filter(email=email)[0]
    return u

def populate_syntax():
    with open("syntax_name_list.txt") as f:
        data = f.read()
        data_split = data.split(',')
        for syntax in data_split:
            add_syntax(syntax)

    # Print out what we have added to the user.
    for s in Syntax.objects.all():
        print("- {0}".format(str(s)))


# Start execution here!
if __name__ == '__main__':
    print("Starting script...")
    # needs to be changed!
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'snippetsmngr.settings')
    import django
    django.setup()
    from snippets.models import Snippet, Syntax
    from django.contrib.auth.models import User
    from django.utils import timezone

    start(sys.argv[0], sys.argv[1:])
