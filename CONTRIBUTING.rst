============
Contributing
============

Basic Instructions
==================

1. Fork and clone the repository.
2. Setup your python environment using *virtualenv* or you can use our docker-compose.yml if you are familiar with docker-compose.
3. Code!
4. Run the tests via **python setup.py test** or via docker-compose using **make test** command.
5. Write tests for the changes you made, coverage must be above 95%.
6. Write browser tests if suitable, test via **pytest tests/test_browser.py** or via **make test-browser** command (These tests are not executed on Travis CI, so they need to be tested before committing and pushing).
7. Check if your new code follow standards :ref:`code-standards`.
8. Commit, push and open a new Pull Request.


.. _code-standards:

Code standards
==============

We follow PEP8 as much as possible except for *max-line-length = 99* and we recommend the linters:

+ flake8
+ flake8-quotes plugin


Versioning
==========
This project adheres to `Semantic Versioning <http://semver.org/>`_.
