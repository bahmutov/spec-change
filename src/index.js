const dependencyTree = require('dependency-tree')
const path = require('path')

function convertKeysToRelative(tree, directory) {
  const result = {}
  const paths = Object.keys(tree)
  paths.forEach((absolutePath) => {
    const relativePath = path.relative(directory, absolutePath)
    result[relativePath] = convertKeysToRelative(tree[absolutePath], directory)
  })
  return result
}

function getFileDependencies(filename, directory) {
  const tree = dependencyTree({
    filename,
    directory,
  })

  // convert absolute paths into relative
  const relativeTree = convertKeysToRelative(tree, directory)
  return relativeTree
}

module.exports = { getFileDependencies }
