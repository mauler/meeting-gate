===================
Use Cases and Setup
===================

Below we describe an use case of meeting-gate application, the example is a small festival who accredited 1k people, among them
tickets bought via internet, paper tickets bought in stores, guest list and work crew.


Small Festival
==============

The ticket data imported to meeting-gate was:

+ Web tickets from e-commerce done by meeting-shop application. Imported via REST calls.
+ Guest tickets from guest list managed by meeting-shop application. Imported via REST calls.
+ Paper Tickets from a local vendor, text file containing one ticket per line imported manually via the django-admin interface.

After the accreditmet the records data (entry date, wristband used...) was sent to meeting-festival, cashless application to manage sells of beverages, food and merchandising.
