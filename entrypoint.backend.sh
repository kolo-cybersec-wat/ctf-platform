#!/usr/bin/sh

set -e

./manage.py migrate

./manage.py collectstatic --noinput

exec gunicorn -w 4 -b 0.0.0.0:8000 ctf_platform_backend.wsgi:application