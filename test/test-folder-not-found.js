const test = require('ava')
const execaWrap = require('execa-wrap')
const path = require('path')

// run the bin script in the project's root folder
const cwd = path.join(__dirname, '..')

test('reports an error for non-existent folder', async (t) => {
  t.plan(1)
  const out = await execaWrap(
    'node',
    ['bin/spec-change', '--folder', 'fixtures/does-not-exist'],
    { cwd, filter: ['stderr', 'code'] },
  )
  t.snapshot(out, 'folder not found')
})
