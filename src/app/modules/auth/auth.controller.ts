import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";

import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status-codes";

import { setAuthCookie } from "../../utils/setAuthCookie";
import { createUserToken } from "../../utils/userTokens";
import { AuthService } from "./auth.service";

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  const userTokens = await createUserToken(result.user);

  await setAuthCookie(res, userTokens);
  sendResponse(res, {
    data: result.user,
    statusCode: httpStatus.OK,
    message: "Log In successfull",
    success: true,
  });
});

const logout = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "logged out",
      data: null,
    });
  }
);
export const AuthController = { login, logout };
