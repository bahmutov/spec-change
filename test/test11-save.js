const test = require('ava')
const execaWrap = require('execa-wrap')
const path = require('path')
const fs = require('fs')

// run the bin script in the project's root folder
const cwd = path.join(__dirname, '..')

test('uses file mask', async (t) => {
  t.plan(2)

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
  t.snapshot(deps, 'saved dependencies')
})
