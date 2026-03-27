import { dbConfig } from "@app/config/dbConfig";
import "dotenv/config";
import { DataSource } from "typeorm";

export default new DataSource(dbConfig());
