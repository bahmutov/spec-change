const test = require('ava')
const { getDependsInFolder, affectedFiles } = require('../src')
const path = require('path')

const directory = path.join(__dirname, '..', 'fixtures', '6')

test('affected files', (t) => {
  t.plan(1)
  const deps = getDependsInFolder({ folder: directory })
  const changedFiles = ['utils/sub/misc.js']
  const affected = affectedFiles(deps, changedFiles)
  // both spec-b and spec-b import the misc source file
  // thus any change to the misc file should affect
  // these two specs only
  t.deepEqual(affected, ['spec-b.js', 'spec-c.js'])
})
