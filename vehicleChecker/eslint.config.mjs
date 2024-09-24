import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        process: "readonly",  
        describe: "readonly",  
        it: "readonly",
        before: "readonly",
        after: "readonly",
        ...globals.browser, 
      },
    },
    // the rules to be adopted as part of the code quality analysis 
    rules: {
      // Check for the use of console statements - warnings are shown but does not fail the linting process
      "no-console": ["warn"],
      // Check for the use of undeclared variables
      "no-undef": "error",
      // Check for duplicated case labels 
      "no-duplicate-case": "error",
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
    ...pluginJs.configs.recommended,
  },
]