import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../database/repository";
import * as bcrypt from "bcryptjs";
import {
  checkingData,
  initAction,
  logData,
  queryParseData,
  queryParseIdData,
  queryParseIdStringData,
  useObserveble,
} from "../util/utilRxjs";
import { from, map, switchMap, tap } from "rxjs";
import { mappingRespondDataRxjs } from "../util/map";

export const getDataUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  useObserveble(
    initAction(null).pipe(
      switchMap((result) => UserRepository.find()),
      mappingRespondDataRxjs("Success get data user")
    ),
    next
  );

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  useObserveble(
    initAction(req).pipe(
      queryParseData,
      switchMap((result) =>
        from(
          UserRepository.createQueryBuilder("user")
            .where("user.name = :input ", {
              input: result.name,
            })
            .addSelect("user.password")
            .getOne()
        ).pipe(
          tap(
            checkingData((user) => {
              if (!user) throw new Error("User not found");
              if (!bcrypt.compareSync(result.password, user.password || ""))
                throw new Error("Invalid Password");

              return user;
            })
          )
        )
      ),
      map((user: any) => {
        delete user.password;
        return user;
      }),
      mappingRespondDataRxjs("Success registration user")
    ),
    next
  );

export const postDataUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  useObserveble(
    initAction(req).pipe(
      queryParseData,
      switchMap(async (result) => ({
        ...result,
        password: await bcrypt.hash(result.password, 10),
      })),
      switchMap((result) => UserRepository.save(result)),
      mappingRespondDataRxjs("Success registration user")
    ),
    next
  );

export const putDataUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  useObserveble(
    initAction(req).pipe(
      queryParseIdStringData,
      switchMap((result) =>
        from(UserRepository.findOneBy({ uuid: result.id })).pipe(
          map((user: any) => ({ ...user, ...result.data }))
        )
      ),
      switchMap((result) => UserRepository.save(result)),
      mappingRespondDataRxjs("Success registration user")
    ),
    next
  );

export const deleteDataUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  useObserveble(
    initAction(req).pipe(
      queryParseIdStringData,
      switchMap((result) =>
        from(UserRepository.findOneBy({ uuid: result.id }))
      ),
      switchMap((result) => UserRepository.softDelete(result.id)),
      mappingRespondDataRxjs("Success registration user")
    ),
    next
  );
