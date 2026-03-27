/* eslint-disable @typescript-eslint/no-require-imports */
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
    testEnvironment: "node",
    transform: {
        ...tsJestTransformCfg,
    },
    moduleNameMapper: {
        "^@data/(.*)$": "<rootDir>/src/data/$1",
        "^@app/(.*)$": "<rootDir>/src/app/$1",
        "^@domain/(.*)$": "<rootDir>/src/domain/$1",
        "^@db/(.*)$": "<rootDir>/src/infra/$1",
        "^@presentation/(.*)$": "<rootDir>/src/presentation/$1",
        "^@src/(.*)$": "<rootDir>/src/$1",
    },
    globals: {
        ...tsJestTransformCfg.globals,
        tsconfig: "./tsconfig.test.json"
    },
    setupFiles: ["<rootDir>/jest.setup.ts"]
};