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
  // aliases
  '-f': '--folder',
  '-m': '--mask',
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
const deps = getDependsInFolder(folder, fileMask, saveDepsFilename)
const depsStringified = JSON.stringify(deps, null, 2)
console.log(depsStringified + '\n')
