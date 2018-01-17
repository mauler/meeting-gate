# Makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-autobuild
PAPER         =
BUILDDIR      = /tmp/meeting-docs

# User-friendly check for sphinx-build
ifeq ($(shell which $(SPHINXBUILD) >/dev/null 2>&1; echo $$?), 1)
$(error The '$(SPHINXBUILD)' command was not found. Make sure you have Sphinx installed, then set the SPHINXBUILD environment variable to point to the full path of the '$(SPHINXBUILD)' executable. Alternatively you can add the directory with the executable to your PATH. If you don't have Sphinx installed, grab it from http://sphinx-doc.org/)
endif

# Internal variables.
ALLSPHINXOPTS   = -B docs/ -z docs/ -z meeting/
# the i18n builder cannot share the environment and doctrees with the others
I18NSPHINXOPTS  = $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) .

.PHONY: help
help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  docs    	to serve html documenation from older docs/ "

.PHONY: clean
clean:
	rm -rf $(BUILDDIR)/*

.PHONY: docs
docs:
	$(SPHINXBUILD) $(ALLSPHINXOPTS) $(BUILDDIR)

.PHONY: test
test:
	docker-compose run --rm test
