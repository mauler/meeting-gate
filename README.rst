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


About
=====

This application aims to manage the access control on cashless festivals (or other compatible kind of meeting) via Tickets (Scanning previous generated QRCodes)
and update this information over the other systems such any Cashless Sells Application prepared to handle the data.

For more information of how to use this Application, check the Cases of Use & Setup section in Docs.


How it Works ?
--------------

First the application need to be fed with the Tickets data, the kinds supported: bought via e-commerce, paper tickets, guest invite or local (sell on the event entrance).

With the ticket data loaded the dashboard can be accessed to begin the ticket
validation system.

The common usage is:

1. Read the Ticket QRCODE.
2. Check if it is valid.
3. Ask the person documentation if the Ticket type requires it.
4. Read the Wrsitband
5. Confirm the entrance

After the Entry is confirmed, the data is sent to the cashless application.
