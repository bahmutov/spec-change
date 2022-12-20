const test = require('ava')
const { getFileDependencies } = require('../src')
const path = require('path')

test('no imports', (t) => {
  t.plan(1)
  const directory = path.join(__dirname, '..', 'fixtures', '1')
  const filename = path.join(directory, 'spec.js')
  const deps = getFileDependencies(filename, directory)
  // console.log(deps)
  t.snapshot(deps, 'no imports')
})
