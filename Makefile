PHONY += up
up:
	npm run dev

PHONY += fresh
fresh:
	rm -rf ./node_modules
	npm install
	npm run dev
