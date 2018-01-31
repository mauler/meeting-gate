# Makefile for Sphinx documentation and other tools

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-autobuild
PAPER         =
BUILDDIR      = /tmp/meeting-gate-docs
PYTEST      = pytest

# User-friendly check for sphinx-build
ifeq ($(shell which $(SPHINXBUILD) >/dev/null 2>&1; echo $$?), 1)
	$(error The "$(SPHINXBUILD)" command was not found. Make sure you have Sphinx installed, then set the SPHINXBUILD environment variable to point to the full path of the "$(SPHINXBUILD)" executable. Alternatively you can add the directory with the executable to your PATH. If you dont have Sphinx installed, grab it from http://sphinx-doc.org/)
endif

# Internal variables.
ALLSPHINXOPTS   = -B docs/ -z meeting/ -z docs/

# the i18n builder cannot share the environment and doctrees with the others
I18NSPHINXOPTS  = $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) .

.PHONY: help
help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  docs-preview    	to serve html documenation from folder docs/ "
	@echo "  test    	to run tests used on Travis CI inside a Docker container via docker-compose (Doesn't run browser tests)"
	@echo "  test-browser    	to run browser tests in this machine (Doesn't use a Docker container). "

.PHONY: docs-preview
docs-preview:
	$(SPHINXBUILD) $(ALLSPHINXOPTS) $(BUILDDIR)

.PHONY: test
test:
	docker-compose run --rm test

.PHONY: test-browser
test-browser:
	$(PYTEST) tests/test_browser.py
