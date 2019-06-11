#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    # editing default settings location 
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "snippetsmngr.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
