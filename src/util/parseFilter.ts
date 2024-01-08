import { Observable } from "rxjs";
import { FindManyOptions } from "typeorm";
import { InvalidFilterQuery, NullFilterQuery } from "./errors";
import { parseQuery } from "./parser";

const ALLOWED_ATTRIBUTES = [
  "select",
  "relations",
  "join",
  "where",
  "order",
  "skip",
  "take",
];

const assertFilter = (filter: any) => {
  const keys = Object.keys(filter);

  if (keys.length == 0) return;
  if (keys.some((v) => !ALLOWED_ATTRIBUTES.includes(v)))
    throw new InvalidFilterQuery(filter);
  for (const key in filter) {
    try {
      // console.log(key)
      // try to parse it to json

      // const queryObj = JSON.parse(filter[key]);

      filter[key] = parseQuery(filter[key]);
    } catch {}
  }
};

export const parseFilter =
  <T>(fieldName: string = "filter") =>
  (source: Observable<any>) =>
    new Observable<FindManyOptions<T>>((subs) => {
      source.subscribe({
        next({ query }) {
          // console.log(!query[fieldName]);

          try {
            if (!query[fieldName]) return subs.next({});
            const filter = JSON.parse(query[fieldName]);
            assertFilter(filter);

            subs.next(filter);
          } catch (e) {
            subs.error(e);
          }
        },

        error: (err) => subs.error(err),
        complete: () => subs.complete(),
      });
    });
