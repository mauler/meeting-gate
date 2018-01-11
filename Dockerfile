FROM python:3

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD requirements.txt  .

RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p /usr/src/static

VOLUME ["/var/www/media"]

COPY . .

ENV PYTHONPATH .

ENV DJANGO_SETTINGS_MODULE meeting.gate.settings

RUN django-admin collectstatic
