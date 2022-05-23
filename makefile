SHELL := /bin/bash
#==================================================================================
# Dev tools
#==================================================================================

dev:
	lerna bootstrap
	lerna run dev --parallel

publish:
	lerna publish

republish:
	lerna publish from-package --yes

clean:
	lerna clean --y

lint:
	npm run lint

lint-fix:
	npm run lint:fix
#==================================================================================
# Ngrok Development
#==================================================================================

ngrok-development:
	ngrok http --region=us --hostname=magically-development.ngrok.io 3004

ngrok-production:
	ngrok http --region=us --hostname=magically-production.ngrok.io 3001
