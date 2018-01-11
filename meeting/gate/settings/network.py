from os import environ as env

ALLOWED_HOSTS = env.get('ALLOWED_HOSTS', 'localhost').split(';')
