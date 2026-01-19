import { Response } from "express";

interface ResponseData<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: object;
}

const sendResponse = <T>(res: Response, data: ResponseData<T>): void => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
