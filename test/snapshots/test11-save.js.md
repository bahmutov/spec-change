# Snapshot report for `test/test11-save.js`

The actual snapshot is saved in `test11-save.js.snap`.

Generated by [AVA](https://avajs.dev).

## uses file mask

> spec b only and saved

    `  stdout:␊
      -------␊
      saved updated dependencies file deps.json␊
      {␊
        "utils/sub/misc.js": [␊
          "spec-b.js"␊
        ],␊
        "spec-b.js": [␊
          "spec-b.js"␊
        ]␊
      }␊
      -------␊
    `

> saved dependencies

    {
      deps: {
        'spec-b.js': [
          'spec-b.js',
        ],
        'utils/sub/misc.js': [
          'spec-b.js',
        ],
      },
      fileMask: 'spec-b.js',
      folder: 'fixtures/6',
      generatedAt: '2020-01-01T00:00:00.000Z',
      warning: 'This is a machine-generated file, do not modify it manually. Use https://github.com/bahmutov/spec-change',
    }
