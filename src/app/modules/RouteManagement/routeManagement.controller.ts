import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { RouteManagementService } from "./routeManagement.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status-codes";

const createRoute = catchAsync(async (req: Request, res: Response) => {
  const newRoute = req.body;
  const result = await RouteManagementService.createRoute(newRoute);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Route created successfully",
    data: result,
  });
});

export const RouteManagementController = { createRoute };
