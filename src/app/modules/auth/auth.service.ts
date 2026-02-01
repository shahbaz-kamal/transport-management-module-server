
import httpStatus from "http-status-codes";

import { prisma } from "../../shared/prisma";

import bcrypt from "bcryptjs";
import AppError from "../../errorHelpers/AppError";
import { ILogin } from "./auth.interface";

export const login = async (payload: ILogin) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatched) throw new AppError(httpStatus.BAD_REQUEST, "Password dosent match");

  return { user };
};

export const AuthService = { login };
