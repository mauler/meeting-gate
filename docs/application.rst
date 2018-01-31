===========
Application
===========

Instructions of how to use the application are written below, beginning of how to load ticket data into system.


Loading Tickets
===============

The tickets data can be loaded using the following methods:

+ `REST calls` to other applications.
+ Direct `DATABASE inserts`.
+ Insert manually via `django-admin interface`.


Web Tickets
-----------

This kind of ticket is the basic one, it handles a sell via e-commerce platform. Using the :class:`meeting.gate.models.WebTicket` model:

.. autoclass:: meeting.gate.models.WebTicket
   :members:
   :noindex:


Paper Tickets
-------------

Usually paper ticket vendors provides a text file containing one
**uuid/qrcode** per line. There is a way to import these tickets using the model
:class:`meeting.gate.models.BatchPaperTicket`.

Access **/gate/batchpaperticket/** admin interface and add the batch file to
create the paper tickets in one operation.


Guest Tickets
-------------

This ticket is used for guests, they still receive a qrcode to be accredited.
The :class:`meeting.gate.models.GuestTicket` model handle this information with
extra fields related to the guest information and also requires identification
during the accreditation process.

.. autoclass:: meeting.gate.models.GuestTicket
   :members:
   :noindex:
