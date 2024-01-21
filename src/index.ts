import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import { json, urlencoded } from "body-parser";
import { initDataSource } from "./database/index";
import { routeExists, routesList } from "./util/routes";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger";
import { logHistory } from "./util/const";
import { mappingRespondData } from "./util/map";

const app: Application = express();
const port = 8000;

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json({ limit: "10mb" }));
app.get("/favicon.ico", (req, res) => res.status(204));
app.get("/", (req: Request, res: Response) => {
  const date = new Date();
  res.send(`Server is Working ${date.toISOString()}`);
});

app.use("/swagger-api", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/v1", (req: Request, res: Response, next: NextFunction) => {
  const startTime = new Date();

  router(req, res, (result: any) => {
    const endTime = new Date();
    const responseTime = endTime.getTime() - startTime.getTime();
    mappingRespondData(req, res, result, responseTime);
  });
});
app.use((req: Request, res: Response, next: NextFunction) => {
  const isExists = routeExists(app, req.method, req.path);

  if (isExists) return next();
  console.log("\x1b[31m" + logHistory(req, 404), `Path not found`, "\x1b[0m");
  return res
    .status(404)
    .send({ status: 404, message: `Api path ${req.path} not found` });
});

app.listen(port, async () => {
  console.log("Starting API, Please wait for a moment...");

  await initDataSource(port);
});
