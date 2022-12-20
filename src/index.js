const dependencyTree = require('dependency-tree')
const path = require('path')
const { lazyAss: la } = require('lazy-ass')

function convertKeysToRelative(tree, directory) {
  const result = {}
  const paths = Object.keys(tree)
  paths.forEach((absolutePath) => {
    const relativePath = path.relative(directory, absolutePath)
    result[relativePath] = convertKeysToRelative(tree[absolutePath], directory)
  })
  return result
}

/**
 * Returns a tree of dependencies found starting from the filename.
 * All paths are relative to the given directory.
 */
function getFileDependencies(filename, directory) {
  const tree = dependencyTree({
    filename,
    directory,
  })

  // convert absolute paths into relative
  const relativeTree = convertKeysToRelative(tree, directory)
  return relativeTree
}

/**
 * Returns an array of filenames (relative to the directory)
 * for all dependencies reachable from the given filename via "require" or "import"
 * statements.
 */
function getFlatFileDependencies(filename, directory) {
  const firstFileRelative = path.relative(directory, filename)
  const tree = getFileDependencies(filename, directory)
  const set = new Set()

  const addPaths = (tr) => {
    const paths = Object.keys(tr)
    paths.forEach((relativePath) => {
      // do not add the top level file itself
      if (relativePath !== firstFileRelative) {
        if (!set.has(relativePath)) {
          set.add(relativePath)
        }
      }
      addPaths(tr[relativePath])
    })
  }

  addPaths(tree)

  return [...set].sort()
}

/**
 * Computes the list of files each spec in the filenames depends on.
 * All returned paths are relative to the given directory.
 */
function getFlatFilesDependencies(filenames, directory) {
  la(Array.isArray(filenames), 'expected a list of filenames', filenames)
  la(typeof directory === 'string', 'expected a directory', directory)

  const result = {}
  filenames.forEach((filename) => {
    const name = path.relative(directory, filename)
    const dependsOn = getFlatFileDependencies(filename, directory)
    result[name] = dependsOn
  })

  return result
}

module.exports = {
  getFileDependencies,
  getFlatFileDependencies,
  getFlatFilesDependencies,
}
