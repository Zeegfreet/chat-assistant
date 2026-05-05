import "dotenv/config";
import "reflect-metadata";
import { createApp } from "@src/app/app";
import { dbConfig } from "@src/app/config/dbConfig";
import { DbConnection } from "@db/db/config/dbConnection";
import chalk from "chalk";
import { RedisConnection } from "@db/redis/config/redisConnect";
import { redisConfig } from "@db/redis/config/redisConfig";

const PORT = process.env.SERVER_PORT || 3000;

const bootstrap = async () => {
    try {
        await DbConnection.getInstance().connect(dbConfig());
        await RedisConnection.getInstance().connect(redisConfig());
        const app = await createApp();
        app.listen(PORT, () => {
            console.log(chalk.blue("[SERVER]:"), `Servidor instanciado na porta http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("[DB_ERROR]: Falha ao conectar aos serviços: ", error);
    }
};

void bootstrap();