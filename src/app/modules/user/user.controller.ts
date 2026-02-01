import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status-codes";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = req.body;
  const result = await UserService.createUser(newUser);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "User Created successfully",
    success: true,
    data: result,
  });
});

export const UserController = { createUser };
