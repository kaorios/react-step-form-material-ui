module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: "."
  },
  plugins: [
    "@typescript-eslint",
    "react",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb-typescript",
  ],
  rules: {
    "no-console": "error",
    "react/jsx-no-target-blank": "error",
  },
  env: {
    browser: true,
  },
};
