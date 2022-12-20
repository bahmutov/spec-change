const test = require('ava')
const { getFileDependencies } = require('../src')
const path = require('path')

test('require and import helper', (t) => {
  t.plan(1)
  const directory = path.join(__dirname, '..', 'fixtures', '3')
  const filename = path.join(directory, 'spec.js')
  const deps = getFileDependencies(filename, directory)
  // console.log(deps)
  t.snapshot(deps, 'two requires')
})
