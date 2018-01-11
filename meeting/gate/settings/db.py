from os import environ as env

import dj_database_url


GATE_DB_URI = env['GATE_DB_URI']

DATABASES_DEFAULT = dj_database_url.parse(GATE_DB_URI)

DATABASES = {
    'default': DATABASES_DEFAULT,
}
