module.exports = {
    "env": {
      "browser": true,
      "es2021": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "overrides": [
      {
        "env": {
          "node": true
        },
        "files": [
          ".eslintrc.{js,cjs}"
        ],
        "parserOptions": {
          "sourceType": "script"
        }
      }
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    "plugins": [
      "simple-import-sort","react"
    //   "react-refresh",
    ],
    rules: {
      'simple-import-sort/imports': 'error',
      "react/prop-types": "off",
      
    }
  }
  