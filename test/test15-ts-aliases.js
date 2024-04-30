const test = require('ava')
const execaWrap = require('execa-wrap')
const path = require('path')

const cwd = path.join(__dirname, '..', 'test-ts-aliases')

test('resolved TS path aliases', async (t) => {
  t.plan(1)
  const out = await execaWrap(
    'node',
    [
      '../bin/spec-change',
      '--folder',
      'cypress',
      '--ts-config',
      'tsconfig.json',
    ],
    { cwd, filter: 'stdout' },
  )
  // console.log(out)
  t.snapshot(out, 'resolved path aliases')
})
