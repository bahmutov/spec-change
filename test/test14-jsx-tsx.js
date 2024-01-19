const test = require('ava')
const execaWrap = require('execa-wrap')
const path = require('path')
const { getDependsInFolder } = require('../src')

// run the bin script in the project's root folder
const cwd = path.join(__dirname, '..')

test('JSX and TSX files', async (t) => {
  t.plan(1)
  const out = await execaWrap(
    'node',
    ['bin/spec-change', '--folder', 'fixtures/jsx-tsx', '--allowJs'],
    { cwd, filter: 'stdout' },
  )
  t.snapshot(out, 'JSX and TSX')
})

test('JSX and TSX with getDependsInFolder', async (t) => {
  t.plan(1)
  const folder = path.join(cwd, 'fixtures', 'jsx-tsx')
  const deps = getDependsInFolder({ folder, allowJs: true })
  t.deepEqual(deps, {
    'utils.ts': ['spec-a.jsx', 'spec-b.tsx'],
    'spec-a.jsx': ['spec-a.jsx'],
    'spec-b.tsx': ['spec-b.tsx'],
  })
})
