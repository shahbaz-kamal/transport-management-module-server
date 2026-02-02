import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { VehicleService } from "./vehicle.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status-codes";

const getAllVehicle = catchAsync(async (req: Request, res: Response) => {
  const result = await VehicleService.getAllVehicles();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Vehicle retrieved successfully",
    data: result,
  });
});
const createVehicle = catchAsync(async (req: Request, res: Response) => {
  const newVehicle = req.body;
  const result = await VehicleService.createVehicle(newVehicle);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Vehicle created successfully",
    data: result,
  });
});

export const VehicleController = { createVehicle, getAllVehicle };
