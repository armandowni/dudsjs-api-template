export class NullFilterQuery extends Error {
    constructor() {
        super("filter query is null");
    }
}

export class InvalidFilterQuery extends Error {
    constructor(filterQuery: any) {
        super(
            `filter query is not falid: \n\t${JSON.stringify(filterQuery, null, 4)}`
        );
    }
}