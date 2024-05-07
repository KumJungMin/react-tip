module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  "import/resolver": {
    alias: {
      map: [["@", "./src"]],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    node: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  },
  overrides: [
    {
      files: ["src/utils/test/**.ts", "src/**/*.spec.ts", "src/**/*.spec.tsx"],
      plugins: ["vitest"],
      rules: {
        "vitest/no-large-snapshots": "error",
        "vitest/no-identical-title": "off",
        "vitest/expect-expect": "off",
      },
      extends: ["plugin:vitest/recommended"],
      globals: {
        globalThis: true,
        describe: true,
        it: true,
        test: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
        vi: true,
      },
    },
  ],
};
