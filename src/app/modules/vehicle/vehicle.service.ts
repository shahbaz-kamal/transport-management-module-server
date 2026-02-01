import { prisma } from "../../shared/prisma";
import { IVehicle } from "./vehicle.interface";

const createVehicle = async (payload: IVehicle) => {
  const result = await prisma.vehicle.create({
    data: payload,
  });

  return result;
};

export const VehicleService = { createVehicle };
