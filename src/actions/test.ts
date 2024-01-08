import { NextFunction, Request, Response } from "express";
import { TestRepository } from "../database/repository";

export const getDataTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  await TestRepository.find()
    .then((data) => next({ message: "Success get data", result: data }))
    .catch((err) => next(err));

export const postDataTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  await TestRepository.save(body)
    .then((data) => next({ message: "Success post data", result: data }))
    .catch((err) => next(err));
};
export const putDataTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body, params } = req;
  const id = parseInt(params.id);

  const findData = await TestRepository.findOneBy({ id: id });

  if (findData) {
    await TestRepository.save({ ...findData, ...body })
      .then((data) => next({ message: "Success put data", result: data }))
      .catch((err) => next(err));
    return;
  }

  next(new Error("Data not found"));
};
export const deleteDataTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { params } = req;
  const id = parseInt(params.id);

  const findData = await TestRepository.findOneBy({ id: id });

  if (findData) {
    await TestRepository.softDelete(findData.id)
      .then((data) => next({ message: "Success delete data", result: data }))
      .catch((err) => next(err));
    return;
  }

  next(new Error("Data not found"));
};
