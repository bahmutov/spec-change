const test = require('ava')
const { getFileDependencies, getFlatFileDependencies } = require('../src')
const path = require('path')

const directory = path.join(__dirname, '..', 'fixtures', '4')
const filename = path.join(directory, 'spec.js')

test('nested subfolders', (t) => {
  t.plan(1)
  const deps = getFileDependencies(filename, directory)
  // console.log(deps)
  t.snapshot(deps, 'nested paths')
})

test('nested flat paths', (t) => {
  t.plan(1)
  const deps = getFlatFileDependencies(filename, directory)
  console.log(deps)
  t.snapshot(deps, 'flat paths')
})
