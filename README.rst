============
meeting-gate
============

.. image:: https://img.shields.io/pypi/v/meeting-gate.svg
        :target: https://pypi.python.org/pypi/meeting-gate

.. image:: https://travis-ci.org/mauler/meeting-gate.svg?branch=master
        :target: https://travis-ci.org/mauler/meeting-gate

.. image:: https://coveralls.io/repos/github/mauler/meeting-gate/badge.svg?branch=master
    :target: https://coveralls.io/github/mauler/meeting-gate?branch=master

.. image:: https://readthedocs.org/projects/meeting-gate/badge/?version=latest
        :target: https://readthedocs.org/projects/meeting-gate/?badge=latest
        :alt: Documentation Status

.. image:: https://landscape.io/github/mauler/meeting-gate/master/landscape.svg?style=flat
        :target: https://landscape.io/github/mauler/meeting-gate/master
        :alt: Code Health

.. image:: https://img.shields.io/scrutinizer/g/mauler/meeting-gate.svg
        :target: https://scrutinizer-ci.com/g/mauler/meeting-gate/?branch=master
        :alt: Scrutinizer Code Quality


This is Meeting Project entrace management application (know as meeting-gate-gate).
For more information, please check:

http://meeting-gate.readthedocs.io/en/latest/


CHANGELOG
---------

.. include:: CHANGELOG.rst



DRAFT
-----

Contributing / Running tests: make test-browser // make test

TODO: meetin-gate jsx code needs to be splitted in modules, add require.js and etc.

Our project Wristand is 10 character length, containing only numbers. Regular Expression: ^\d{10}$

The reason there is not auth (API and Views) it's because we used the application
on a private local area network, no internet connection or outside access. Actually most of the time totally offline since the festival gate was in a farm gate.

Caso de Uso (Procurar README de projetos similares e olhar os tópicos)

Como o sistema comunica com outros 2

História, Foi criado para controlar entrada do meeting-festival

Ele lê tickets do meeting-shop porém é possível usar tickets de outros sistemas

Formas de instalação do sistema

Instalar via pip e executar sem um projeto

Instalar via pip no seu projeto existente

Instalar e testar por imagem do dockerhub

Carregando WebTickets, meeting-shop e ou/outro sistema

Carregando LocalTickets/Lote (Recriar a aplicação)

Frontend de Leitura de QRCodes (origundos do meeting-shop ou não)
formato atual configurado de pulseira

Possíveis erros

Rotina para atualizar a Wristband no meeting-gate

O uso do admin

API dos Models

Como Contribuir

Usando o docker-compose para testar, testando o navegador também

Testando navegador (Sem uso do Docker-compose)


TODO
----

+ Changelog
+ Enable Pull Request interaction with Travis CI
+ Freeze vesions and upload to pypi
+ Docs for Models, Api, Install Instructions, Docker Image, pip install.
+ Run as standalone application.
+ Docker image available at DockerHub (Uploaded via TravisCI build).
+ Add .jsx processor
+ Split React JSX code in modules/imports
