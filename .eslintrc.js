/** @type {import('eslint').Linter.Config} */
module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  parserOptions: {
    project: ["./tsconfig.eslint.json"],
  },
  extends: ["@20i/eslint-config/react"],
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  ignorePatterns: [],
}
