const test = require('ava')
const execaWrap = require('execa-wrap')
const path = require('path')

// run the bin script in the project's root folder
const cwd = path.join(__dirname, '..')

test('finds dependencies in TypeScript specs', async (t) => {
  t.plan(1)
  const out = await execaWrap(
    'node',
    ['bin/spec-change', '--folder', 'fixtures/8-ts'],
    { cwd, filter: 'stdout' },
  )
  t.snapshot(out, 'fixture 8')
})
