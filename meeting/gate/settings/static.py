from os import environ as env

STATIC_URL = env.get('STATIC_URL', '/static/')

STATIC_ROOT = env.get('STATIC_ROOT', 'static')

MEDIA_URL = env.get('MEDIA_URL', '')

MEDIA_ROOT = env.get('MEDIA_ROOT', '')
