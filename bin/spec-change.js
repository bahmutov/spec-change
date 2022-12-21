#!/usr/bin/env node

const arg = require('arg')
const debug = require('debug')('spec-change')
const globby = require('globby')
const path = require('path')
const { getDependentFiles } = require('../src')

const args = arg({
  '--folder': String,
  // aliases
  '-f': '--folder',
})

debug('arguments %o', args)

const folder = path.resolve(args['--folder'])
debug('absolute folder: %s', folder)
const files = globby.sync(folder + '/**/*.js')
console.log('found %d files %o', files.length, files)

const deps = getDependentFiles(files, folder)
const depsStringified = JSON.stringify(deps, null, 2)
console.log(depsStringified + '\n')
