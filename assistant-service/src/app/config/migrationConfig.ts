import "dotenv/config";
import { DataSource } from "typeorm";
import { dbConfig } from "./dbConfig";

export default new DataSource(dbConfig());
