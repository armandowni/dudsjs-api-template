import { NextFunction } from "express";
import {
  EMPTY,
  Observable,
  catchError,
  from,
  map,
  of,
  tap,
  throwError,
} from "rxjs";

export const useObserveble = (
  result: Observable<any>,
  nextFunc?: NextFunction
) =>
  result.subscribe({
    next: (value) =>
      nextFunc
        ? nextFunc(value)
        : console.info("There is no next function. Check your code again..."),
    error: (value) =>
      nextFunc
        ? nextFunc(value)
        : console.info("There is no next function. Check your code again..."),
  });

export const useObservebleImage = (
  result: Observable<any>,
  nextFunc?: NextFunction
) =>
  result.subscribe({
    error: (value) =>
      nextFunc
        ? nextFunc(value)
        : console.info("There is no next function. Check your code again..."),
  });

export const logData = tap(console.log);
export const initAction = (value:any) => of(value);

export const queryParse = (params: any) =>
  from(params).pipe(
    map((result: any) => ({ ...result.query })),
    map((result: any) => (result?.filter ? JSON.parse(result?.filter) : null))
  );

export const queryParseId = (params: any) =>
  from(params).pipe(map((result: any) => result.params));

export const queryParseIdData = (params: any) =>
  from(params).pipe(
    map((req: any) => ({ id: req.params.id, data: req.body })),
    map((result: any) => {
      const tempData = result.data;
      delete tempData?.id;
      return { id: parseInt(result.id), data: tempData };
    })
  );

export const queryParseIdStringData = (params: any) =>
  from(params).pipe(
    map((req: any) => ({ id: req.params.id, data: req.body })),
    map((result: any) => {
      const tempData = result.data;
      delete tempData?.id;
      return { id: result.id, data: tempData };
    })
  );

export const queryParseData = (params: any) =>
  from(params).pipe(map((req: any) => ({ ...req.body })));

export const catchErrorData = catchError((error) => {
  return throwError(() => error);
});

export const checkingData = (callback: (value: any) => void) => (data: any) =>
  callback(data);
