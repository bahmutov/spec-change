const test = require('ava')
const execaWrap = require('execa-wrap')
const path = require('path')

// run the bin script in the project's root folder
const cwd = path.join(__dirname, '..')

test('finds dependencies', async (t) => {
  t.plan(1)
  const out = await execaWrap(
    'node',
    ['bin/spec-change', '--folder', 'fixtures/7'],
    { cwd, filter: 'stdout' },
  )
  t.snapshot(out, 'fixture 7')
})
