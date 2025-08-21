// eslint.config.js
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettierPlugin from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

export default [
  { name: "ignores", ignores: ["node_modules", "dist", "build", "coverage"] },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.es2023 },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      "unused-imports": unusedImports,
      prettier: prettierPlugin,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".jsx"],
        },
      },
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Imports
      "import/no-unresolved": "off",
      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external", "internal"],
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // Unused
      "unused-imports/no-unused-imports": "error",
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Vite React Fast Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Prettier como regra
      "prettier/prettier": "error",
    },
  },

  // Desativa conflitos com Prettier
  eslintConfigPrettier,
];
