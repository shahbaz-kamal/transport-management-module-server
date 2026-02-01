import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { StringSchema } from "zod/v4/core/json-schema.cjs";
import { handleZodError } from "../errorHelpers/handleZodError";
import { TErrorSources } from "../interfaces/error.types";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message || "Something went wrong!";
  let error = err;

  // Prisma known errors

  let errorSource: TErrorSources[] = [];

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = httpStatus.CONFLICT; // 409
        message = `${err?.meta?.driverAdapterError?.cause?.constraint?.fields.map((field: StringSchema) => field)} already exists`;
        break;

      case "P2025":
        statusCode = httpStatus.NOT_FOUND; // 404
        message = "Record not found";
        break;

      default:
        message = "Database error";
    }
  }

  //zod error
  else if (error.name === "ZodError") {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource as TErrorSources[];
  } else if (err.statusCode && err.message) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
