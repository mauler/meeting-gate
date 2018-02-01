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


This is Meeting Project entrace management application (know as meeting-gate).
For complete instructions and more information, please check:

http://meeting-gate.readthedocs.io/en/latest/


About
=====

This application focuses on managing festival accreditment that make use of identification methods such as bracelets or cards (rfid, qrcode) for access control or cashless sales.

The accreditation is controlled through tickets, e-tickets and pre-generated invitations, which can also be imported from other applications.

For more information of how to use this Application, check the Cases of Use & Setup section in Docs.


How it Works ?
--------------

The application needs to be fed with the tickets data, the supported kind of tickets are:

+ Web Tickets (E-Commerce)
+ Paper Tickets (Classic printed)
+ Guest Invite (Requires document udentification)
+ Local sell

This data can be loaded using: REST calls to other applications, direct database
inserts, insert via admin interface. How it will be inserted depends your event
case of use, check the :doc:`../use-cases-and-setup` section.

After the data is prepared, the dashboard operation workflow is:

1. Someone reads the Ticket QRCODE using a device.
2. The application check if it is a valid one.
3. If necessary asks the operator to verify the ticket owner documentation if the Ticket type requires it.
4. The operator reads a new Wristband or card to attached to this ticket.
5. The operator confirms the Entry.

After the entrance is confirmed, the data is sent to the cashless or access control application (If enabled).
