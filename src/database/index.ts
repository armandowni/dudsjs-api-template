import { DataSource } from "typeorm";
import { datasource } from "./datasource";

async function AppDataSource(port: number) {
  await datasource
    .initialize()
    .then((connection) => {
      // console.log(`Database ${connection?.options?.database} is connected`);
      console.log(`This API ready in http://0.0.0.0:${port}`);
    })
    .catch((err) =>
      console.error("Error during Data Source initialization:", err)
    );
  return;
}
export const initDataSource = AppDataSource;
