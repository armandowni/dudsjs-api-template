import { Request, Response } from "express";
import { dataObjectRespond, logHistory } from "./const";
import { Observable, map } from "rxjs";
import { logData } from "./utilRxjs";

export const mappingRespondData = (
  req: Request,
  res: Response,
  data: dataObjectRespond,
  responseTime?: number
) => {
  if (data instanceof Error) {
    console.log("\x1b[31m" + logHistory(req, 500), data?.message, "\x1b[0m");
    return res.status(500).json({
      status: 500,
      message: `${
        data?.message.includes("invalid input")
          ? "Data not found"
          : data?.message
      }`,
    });
  }

  console.log(
    "\x1b[32m" + logHistory(req, 200),
    `${responseTime}ms`,
    "\x1b[0m"
  );
  return res.status(200).json({
    status: 200,
    message: `${data.message}`,
    data: data.result,
  });
};

export const mappingRespondDataRxjs =
  (message: any) => (result: Observable<any>) =>
    result.pipe(
      map((result: any) => {
        if (result instanceof Error) {
          return new Error(result?.message);
        }
        return { message: message, result: result };
      })
    );
