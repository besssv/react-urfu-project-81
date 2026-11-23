install:
	npm ci

lint:
	npx oxlint
	npx oxfmt --check

lint-fix:
	npx oxlint --fix
	npx oxfmt

format:
	npx oxfmt

typecheck:
	npx tsc --noEmit

test:
	npx vitest run

test-coverage:
	npx vitest run --coverage

.PHONY: install lint lint-fix format typecheck test test-coverage
