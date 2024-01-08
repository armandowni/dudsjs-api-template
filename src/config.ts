const path = require("path");

require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.local"),
});

export const CONFIG = {
  DBS: {
    postgresql: {
      name: "default",
      type: "postgres",
      host: process.env.DB_CONFIG_HOST || "localhost",
      port:
        (process.env.DB_CONFIG_PORT && parseInt(process.env.DB_CONFIG_PORT)) ||
        5432,
      username: process.env.DB_CONFIG_USER || "",
      password: process.env.DB_CONFIG_PASSWORD || "",
      database: process.env.DB_CONFIG_DB || "",
    } as any,
    synchronize: true,
    logging: false,
  },

  DEV: {
    MODE: process.env.DEV_MODE || "dev",
  },
};
