=========================
Installation instructions
=========================


Using PIP
=========

meeting-gate can be installed using pip::

    $ python -m pip install meeting-gate

This command will fetch the archive and its dependencies from the internet and
install them.

If you've downloaded the tarball, unpack it, and execute::

    $ python setup.py install --user

You might prefer to install it as system-wide. In this case, skip the ``--user``
option and execute as superuser by prepending the command with ``sudo``.


Adding into a existing Project
------------------------------

+ Add **meeting.gate** app and it dependencies to `INSTALLED_APPS` settings value:

.. code::

    INSTALLED_APPS = [

        # meeting-gate required apps
        'meeting.gate',
        'compressor',
        'bootstrap3',
        'rest_framework',

    ]

+ Add **meeting.gate.urls** module to your project urls:

.. code::

    urlpatterns = [

        url(r'', include('meeting.gate.urls', namespace='meeting-gate')),

    ]

Troubleshoot
------------

Windows users may find that these command will only works if typed from Python's
installation directory.

Some Linux distributions (e.g. Ubuntu) install Python without installing pip.
Please install it before. If you don't have root privileges, download the
get-pip.py script at https://bootstrap.pypa.io/get-pip.py and execute it as
``python get-pip.py --user``.
