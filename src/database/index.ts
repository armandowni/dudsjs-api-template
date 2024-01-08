import "reflect-metadata";
import { DataSource } from "typeorm";
import { Test } from "./entities/test";
import { CONFIG } from "../config";
import { User } from "./entities/user";

export default new DataSource({
  ...CONFIG.DBS.postgresql,
  entities: [Test, User],
  extra: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
});
