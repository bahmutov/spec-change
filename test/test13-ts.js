const test = require('ava')
const execaWrap = require('execa-wrap')
const path = require('path')
const dependencyTree = require('dependency-tree')
const { paperwork } = require('precinct')
const cabinet = require('filing-cabinet')

// run the bin script in the project's root folder
const cwd = path.join(__dirname, '..')

const fixtureFolder = path.join(cwd, 'fixtures', '13-ts-and-js')
const jsFilename = path.join(fixtureFolder, 'spec.js')

test('precinct with js importing ts', (t) => {
  t.plan(1)
  const deps = paperwork(jsFilename)
  console.log(deps)
  // finds both imports
  t.deepEqual(deps, ['./ts-utils', './js-utils'])
})

test('resolves JavaScript import', (t) => {
  t.plan(1)
  const result = cabinet({
    partial: './js-utils',
    directory: fixtureFolder,
    filename: jsFilename,
  })
  const relative = path.relative(fixtureFolder, result)
  t.is(relative, 'js-utils.js')
})

test('resolves TypeScript import', (t) => {
  t.plan(1)
  const foundFile = cabinet({
    partial: './ts-utils',
    directory: fixtureFolder,
    filename: jsFilename,
    tsConfig: {
      compilerOptions: {
        // JS files can import TS files
        // and vice versa
        allowJs: true,
      },
    },
  })
  const tsFilename = path.join(fixtureFolder, 'ts-utils.ts')
  t.is(foundFile, tsFilename)
})

/**
 * Changes all keys in the object from absolute paths
 * to relative paths WRT the give "from" folder.
 * Recursive, modifies the object
 */
function relativeKeys(obj, from) {
  if (typeof obj !== 'object') {
    return obj
  }
  Object.keys(obj).forEach((key) => {
    const value = relativeKeys(obj[key], from)
    const relativeKey = path.relative(from, key)
    delete obj[key]
    obj[relativeKey] = value
  })
  return obj
}

test('dependency tree (JS only)', (t) => {
  t.plan(2)
  const tree = dependencyTree({
    filename: jsFilename,
    directory: fixtureFolder,
    tsConfig: {
      compilerOptions: {
        // JS files can import TS files
        // and vice versa
        allowJs: true,
      },
    },
  })
  t.is(typeof tree, 'object')
  const familyTree = relativeKeys(tree, fixtureFolder)
  // the JS spec depends on both TS and JS utils files
  t.deepEqual(familyTree, {
    'spec.js': {
      'ts-utils.ts': {},
      'js-utils.js': {},
    },
  })
})

test('JS imports TS dependency', async (t) => {
  t.plan(1)
  const out = await execaWrap(
    'node',
    ['bin/spec-change', '--folder', 'fixtures/13-ts-and-js', '--allowjs'],
    { cwd, filter: 'stdout' },
  )
  t.snapshot(out, 'fixture JS imports TS dependency')
})
