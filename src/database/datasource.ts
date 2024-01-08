import { DataSource } from "typeorm";
import database from ".";

export default (port) =>
  database
    .initialize()
    .then((connection: DataSource) => {
      console.log(`Database ${connection?.options.database} is connected`);
      console.log(`This API ready in http://0.0.0.0:${port}`);
    })
    .catch((err) =>
      console.error("Error during Data Source initialization:", err)
    );
