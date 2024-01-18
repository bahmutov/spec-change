const test = require('ava')
const execaWrap = require('execa-wrap')
const path = require('path')
const fs = require('fs')

// run the bin script in the project's root folder
const cwd = path.join(__dirname, '..')

test('uses file mask', async (t) => {
  t.plan(3)

  try {
    fs.unlinkSync('./deps.json')
  } catch (e) {}
  const out = await execaWrap(
    'node',
    [
      'bin/spec-change',
      '--folder',
      'fixtures/6',
      '--mask',
      'spec-b.js',
      '--save-deps',
      'deps.json',
    ],
    { cwd, filter: 'stdout' },
  )
  t.snapshot(out, 'spec b only and saved')
  const deps = JSON.parse(fs.readFileSync('./deps.json', 'utf-8'))
  // should we check the timestamp itself?
  t.true('generatedAt' in deps, 'has generatedAt')
  // replace the random timestamp with the constant timestamp
  deps.generatedAt = '2020-01-01T00:00:00.000Z'
  t.snapshot(deps, 'saved dependencies')
})
