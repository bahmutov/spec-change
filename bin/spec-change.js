#!/usr/bin/env node

const arg = require('arg')
const debug = require('debug')('spec-change')
const path = require('path')
const fs = require('fs')
const { getDependsInFolder } = require('../src')

const args = arg({
  '--folder': String,
  '--mask': String,
  '--save-deps': String, // output filename
  '--time': Boolean,
  // aliases
  '-f': '--folder',
  '-m': '--mask',
  '-t': '--time',
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
const fileMask = args['--mask'] || '**/*.{js,ts}'
const saveDepsFilename = args['--save-deps']
const time = args['--time']
const deps = getDependsInFolder({ folder, fileMask, saveDepsFilename, time })
const depsWithMessage = {
  warning:
    'This is a machine-generated file, do not modify it manually. Use https://github.com/bahmutov/spec-change',
  ...deps,
}
const depsStringified = JSON.stringify(depsWithMessage, null, 2)
console.log(depsStringified + '\n')
