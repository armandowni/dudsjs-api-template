import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Test } from "./entities/test";
import { CONFIG } from "../config";
import { User } from "./entities/user";

const configDB: DataSourceOptions = {
  ...CONFIG.DBS.postgresql,
  entities: [Test, User],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export const datasource = new DataSource(configDB);
