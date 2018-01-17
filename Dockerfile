FROM python:3

RUN pip install pytest pytest-django pytest-splinter pytest-sugar pytest-pythonpath pytest-cov

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD requirements.txt  .

RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p /usr/src/static

VOLUME ["/var/www/media"]

COPY . .

ENV DJANGO_SETTINGS_MODULE meeting.gate.settings

ENV STATIC_ROOT /usr/src/static

ENV MEDIA_ROOT /var/www/media

ENV PYTHONPATH .

RUN django-admin collectstatic
