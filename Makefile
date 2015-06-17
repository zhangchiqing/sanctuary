ISTANBUL = node_modules/.bin/istanbul
JSCS = node_modules/.bin/jscs
JSHINT = node_modules/.bin/jshint
NPM = npm
TRANSCRIBE = node_modules/.bin/transcribe
XYZ = node_modules/.bin/xyz --repo git@github.com:plaid/sanctuary.git --script scripts/prepublish


.PHONY: all
all: README.md

README.md: index.js
	$(TRANSCRIBE) \
	  --heading-level 4 \
	  --url 'https://github.com/plaid/sanctuary/blob/v$(VERSION)/{filename}#L{line}' \
	  -- $^ \
	| sed 's/<h4 name="\(.*\)#\(.*\)">\(.*\)\1#\2/<h4 name="\1.prototype.\2">\3\1#\2/' >'$@'

repl/ramda.json: package.json
	curl --silent 'https://raine.github.io/ramda-json-docs/v$(shell node -p 'require("./$<").dependencies.ramda' | tr . _).json' >'$@'


.PHONY: lint
lint: repl/.jshintrc
	$(JSHINT) -- index.js repl/repl test/index.js
	$(JSCS) -- index.js repl/repl test/index.js

repl/.jshintrc: .jshintrc node_modules/ramda/package.json
	node -e 'var R = require("ramda"); var jshintrc = JSON.parse(require("fs").readFileSync("./$<")); jshintrc.predef = R.keys(R).concat(["R", "S"]).sort(); console.log(JSON.stringify(jshintrc))' >'$@'


.PHONY: release-major release-minor release-patch
release-major release-minor release-patch:
	@$(XYZ) --increment $(@:release-%=%)


.PHONY: setup
setup:
	$(NPM) install


.PHONY: test
test:
	$(ISTANBUL) cover node_modules/.bin/_mocha -- --recursive
	$(ISTANBUL) check-coverage --branches 100
	@<index.js \
	    sed -n "/^[ ]*\/\/\. >/{N;p;}" \
	  | sed -e "s:^[ ]*\/\/\. ::" \
	        -e "s:^\([^>].*\):   '\1');:" \
	        -e "s:^> \(.*\):eq(R.toString(\1),:" \
	  | sed "1 s:^:var eq = require('assert').strictEqual, R = require('ramda'), S = require('./');:" \
	  | node
