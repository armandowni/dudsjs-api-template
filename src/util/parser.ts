import {
    Not,
    LessThan,
    LessThanOrEqual,
    MoreThan,
    MoreThanOrEqual,
    Like,
    ILike,
    Between,
    In,
    Any,
    IsNull,
    Raw,
} from "typeorm";

const opKeys = [
    "$not",
    "$lt",
    "$lte",
    "$gt",
    "$gte",
    "$like",
    "$ilike",
    "$between",
    "$in",
    "$any",
    "$isNull",
    "$raw",
];

function isOp(value: any) {
    if (typeof value !== "object") return false;

    if (Array.isArray(value)) return false;

    for (const key in value) {
        if (opKeys.indexOf(key) > -1) return true;
    }

    return false;
}

export function convertValueToOp(value: any) {
    for (const key in value) {
        if (typeof value[key] === "object" && !Array.isArray(value[key]))
            value[key] = convertValueToOp(value[key]);

        switch (key) {
            case "$not":
                return Not(value[key]);

            case "$lt":
                return LessThan(value[key]);

            case "$lte":
                return LessThanOrEqual(value[key]);

            case "$gt":
                return MoreThan(value[key]);

            case "$gte":
                return MoreThanOrEqual(value[key]);

            case "$like":
                return Like(value[key]);

            case "$ilike":
                return ILike(value[key]);

            case "$between":
                return Between(value[key].from, value[key].to);

            case "$in":
                return In(value[key]);

            case "$any":
                return Any(value[key]);

            case "$isNull":
                return value[key] === true ? IsNull() : Not(IsNull());

            case "$raw":
                return Raw((alias) =>
                    value[key].replace(new RegExp("\\[alias\\]", "gi"), alias)
                );

            default:
                break;
        }
    }

    return value;
}

export function parseQuery(params: any) {
    if (typeof params !== "object") return params;

    for (const key in params) {
        // console.log(key, isOp(params[key]));
        if (isOp(params[key])) {
            params[key] = convertValueToOp(params[key]);
            continue;
        }

        /* if (opKeys.indexOf(key) > -1) {
            params[key] = convertValueToOp(key, parseQuery(params[key]));
            continue;
          } */

        if (typeof params[key] === "object" && !Array.isArray(params[key])) {
            params[key] = parseQuery(params[key]);
            continue;
        }
    }

    return params;
}