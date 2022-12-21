#!/usr/bin/env node

const arg = require('arg')
const debug = require('debug')('spec-change')
const globby = require('globby')
const path = require('path')
const fs = require('fs')
const { getDependentFiles } = require('../src')

const args = arg({
  '--folder': String,
  // aliases
  '-f': '--folder',
})

debug('arguments %o', args)

if (!args['--folder']) {
  console.error('Missing --folder argument')
  process.exit(1)
}
if (!fs.existsSync(args['--folder'])) {
  console.error('Cannot find folder %s', args['--folder'])
  process.exit(1)
}

const folder = path.resolve(args['--folder'])
debug('absolute folder: %s', folder)
const files = globby.sync(folder + '/**/*.{js,ts}')
debug('found %d files %o', files.length, files)

const deps = getDependentFiles(files, folder)
const depsStringified = JSON.stringify(deps, null, 2)
console.log(depsStringified + '\n')
