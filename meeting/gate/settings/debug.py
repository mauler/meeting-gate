from os import environ as env

DEBUG = env.get('DEBUG', 'false').lower() == 'true'
