#!/bin/sh

echo "Running dataBase migrations..."
npx typeorm migration:run -d dist/app/config/migrationConfig.js

echo "Implementando seeds..."
node ./node_modules/typeorm-extension/bin/cli.cjs seed:run -d dist/app/config/migrationConfig.js

echo "Starting server..."
node dist/server.js