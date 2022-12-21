# spec-change

> Computes specs to re-run when files change

## Use

### CLI

```
$ npx spec-change --folder "path to folder with specs"
```

Prints a JSON object with the list of JavaScript files. For each file prints the list of dependent files. For example, if `spec.js` imports or requires `utils.js` file, then it will print something like:

```json
{
  "spec.js": ["spec.js"],
  "utils.js": ["spec.js"]
}
```

### NPM module

Based on the `import` and `require` directives.

```js
const { getDependentFiles } = require('spec-change')
// the input paths should be absolute
const deps = getDependentFiles([
  'path/to/spec1.js',
  'path/to/spec2.js',
  ...
], 'path/to/common/directory')
```

The output will be an object with all files (the initial plus all files they import or require). Each key will be a relative filename to the directory. The values will be arrays, with relative filenames of files dependent on the key file.

```js
{
  // input files at least dependent on selves
  'path/to/spec1.js': ['path/to/spec1.js'],
  'path/to/spec2.js': ['path/to/spec2.js'],
  ...
  // the specs spec2 and spec3 imports something from utils
  'path/to/utils.js': ['path/to/spec2.js', 'path/to/spec3.js'],
  ...
}
```

## Debugging

Run this code with environment variable `DEBUG=spec-change`

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2022

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)
- [Cypress Tips & Tricks Newsletter](https://cypresstips.substack.com/)
- [my Cypress courses](https://cypress.tips/courses)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/spec-change/issues) on Github
