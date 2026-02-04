import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";

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
const getMe = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  console.log(decodedToken);
  const result = await UserService.getMe(decodedToken.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "My Data Retrieved successfully",
    success: true,
    data: result,
  });
});

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllStudents();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "All Student Data Retrieved Successfully",
    success: true,
    data: result,
  });
});
const getStudentDashboardData = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  if (!decodedToken) throw new AppError(httpStatus.BAD_REQUEST, "No token received");
  const userId = decodedToken.userId;
  const result = await UserService.getStudentDashboardData(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "My Data Retrieved successfully",
    success: true,
    data: result,
  });
});

export const UserController = { createUser, getMe, getAllStudent,getStudentDashboardData };
