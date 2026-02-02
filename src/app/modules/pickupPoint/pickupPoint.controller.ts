import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { RouteManagementService } from "../RouteManagement/routeManagement.service";
import { PickupPointService } from "./pickupPoint.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status-codes";

const getAllPickupPoint = catchAsync(async (req: Request, res: Response) => {

  const result = await PickupPointService.getAllPickupPoint();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pickup point retrieved successfully",
    data: result,
  });
});

export const PickupPointController = { getAllPickupPoint };
