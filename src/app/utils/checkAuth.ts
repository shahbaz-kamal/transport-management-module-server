import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";

import { JwtPayload } from "jsonwebtoken";

import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../../config/env";
import { prisma } from "../shared/prisma";

export const checkAuth = (roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.headers.authorization as string) || (req.cookies.accessToken as string);
  if (!accessToken) throw new AppError(httpStatus.FORBIDDEN, "No token received");

  const verifiedToken = verifyToken(accessToken, envVars.JWT.ACCESS_TOKEN_SECRET) as JwtPayload;

  console.log("from verified Token", verifiedToken);
  const isUserExist = await prisma.user.findUnique({
    where: { email: verifiedToken.email },
  });

  if (!isUserExist) throw new AppError(httpStatus.BAD_REQUEST, "User dosent exist");

  if (!roles.includes(isUserExist.role)) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized to view this route");
  }

  req.user = verifiedToken;
  // console.log("from verified Token", verifiedToken);
  next();
};
