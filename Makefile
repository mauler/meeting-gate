.PHONY: test
test:
	docker-compose run --rm test

.PHONY: test-browser
test-browser:
	venv/bin/pytest tests/test_browser.py
