import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { VehicleService } from "./vehicle.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status-codes";

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


export const VehicleController={createVehicle}
