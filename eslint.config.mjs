import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: globals.node } },
  {
    parserOptions: {
      sourceType: module,
      allowImportExportEverywhere: true
    }
  },
  pluginJs.configs.recommended,
];
