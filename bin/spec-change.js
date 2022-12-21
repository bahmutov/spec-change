#!/usr/bin/env node

const arg = require('arg')
const debug = require('debug')('spec-change')

const args = arg({
  '--folder': String,
  // aliases
  '-f': '--folder',
})

debug('arguments %o', args)
