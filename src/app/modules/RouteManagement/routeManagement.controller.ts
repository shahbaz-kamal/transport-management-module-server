import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { RouteManagementService } from "./routeManagement.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status-codes";

const getAllRoutes = catchAsync(async (req: Request, res: Response) => {
  const result = await RouteManagementService.getAllRoutes();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Route retrieved successfully",
    data: result,
  });
});
const getAllRoutesWithPickupPoints = catchAsync(async (req: Request, res: Response) => {
  const result = await RouteManagementService.getAllRoutesWithPickupPoints();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Route with Pickup point retrieved successfully",
    data: result,
  });
});
const updateRouteFee = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await RouteManagementService.updateRouteFee(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Route Updated successfully",
    data: result,
  });
});

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

export const RouteManagementController = { createRoute, getAllRoutes,updateRouteFee,getAllRoutesWithPickupPoints };
