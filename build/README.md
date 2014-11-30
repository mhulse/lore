# Build instructions

<a href="http://gruntjs.com/" title="Built with Grunt"><img src="https://cdn.gruntjs.com/builtwith.png" alt="Built with Grunt" align="right"></a>

Development and technology notes.

## Command line

```bash
# First:
$ cd repo/build/

# Next, install:
$ npm install
# ... or update Grunt dependencies:
$ npm update

# Update Bower packages:
$ grunt plugins
# ... or:
$ npm run plugins

# Watch (dev build only):
$ grunt watch
# ... or:
$ npm run watch

# Development build:
$ grunt
# ... or:
$ grunt dev
# ... or:
$ npm run dev
# ... or:
$ npm run grunt
# ... or:
$ npm run grunt dev

# Production build:
$ grunt prod
# ... or:
$ npm run prod
# ... or:
$ npm run grunt prod

# Access Grunt flags/options via npm:
$ npm run grunt -- --version
# ... or (verbose mode):
$ npm run grunt -- -v
# Comparatively, this will return the npm version:
$ npm run grunt -v
```

**Note:** If [Grunt](http://gruntjs.com/) isn’t installed globally, then roll with the `$ npm ...` commands.

## Demos

DEVELOPMENT | PRODUCTION
:-: | :-:
[![qr code](http://chart.apis.google.com/chart?cht=qr&chl=http://mhulse.github.io/lore/dev/&chs=240x240)](http://mhulse.github.io/lore/dev/) | [![qr code](http://chart.apis.google.com/chart?cht=qr&chl=http://mhulse.github.io/lore/prod/&chs=240x240)](http://mhulse.github.io/lore/prod/)
`$ grunt` | `$ grunt prod`
