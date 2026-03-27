import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
    { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
    tseslint.configs.recommended,
    {
        rules: {
            "quotes": ["warn", "double"],
            "indent": ["warn", 4],
            "semi": "warn",
            "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 0 }],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": ["warn", {
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_",
                "caughtErrorsIgnorePattern": "^_",
                "destructuredArrayIgnorePattern": "^_"
            }],
            "@typescript-eslint/no-namespace": "off"
        }
    },
    {
        files: ["__tests__/**/*.test.ts", "__tests__/**/*.spec.ts"],
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.node
            },
            ecmaVersion: 2020,
            sourceType: "module"
        }
    }
]);
