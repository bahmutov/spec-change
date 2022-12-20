const test = require('ava')
const { getDependentFiles } = require('../src')
const path = require('path')

const directory = path.join(__dirname, '..', 'fixtures', '6')
const filenames = [
  path.join(directory, 'spec-a.js'),
  path.join(directory, 'spec-b.js'),
  path.join(directory, 'spec-c.js'),
]

test('dependent files', (t) => {
  t.plan(1)
  const deps = getDependentFiles(filenames, directory)
  // console.log(deps)
  t.snapshot(deps, 'dependent files')
})
