export const logHistory = (req, statusCode) =>
  `[${new Date().toISOString()}] ${req.method} ${req.url} ${statusCode}`;

export declare type dataObjectRespond = {
  message: string;
  result?: any;
};
