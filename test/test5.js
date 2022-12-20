const test = require('ava')
const {
  getFileDependencies,
  getFlatFileDependencies,
  getFlatFilesDependencies,
} = require('../src')
const path = require('path')

const directory = path.join(__dirname, '..', 'fixtures', '5')
const filename = path.join(directory, 'spec.js')

test('circular dependencies', (t) => {
  t.plan(1)
  const deps = getFileDependencies(filename, directory)
  // console.log(deps)
  t.snapshot(deps, 'circular paths')
})

test('nested flat paths', (t) => {
  t.plan(1)
  const deps = getFlatFileDependencies(filename, directory)
  // console.log(deps)
  t.snapshot(deps, 'flat circular paths')
})

test('all flat paths', (t) => {
  t.plan(1)
  const deps = getFlatFilesDependencies([filename], directory)
  // console.log(deps)
  t.snapshot(deps, 'flat circular paths')
})
