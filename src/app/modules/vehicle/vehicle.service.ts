import { prisma } from "../../shared/prisma";
import { IVehicle } from "./vehicle.interface";



const getAllVehicles = async () => {
  const result = await prisma.vehicle.findMany({
    include: {
      route: true, // adds route object inside each vehicle
    },
    orderBy: { createdAt: "desc" },
  });

  return result;
};


const createVehicle = async (payload: IVehicle) => {
  console.log(payload)
  const result = await prisma.vehicle.create({
    data: payload,
  });

  return result;
};

export const VehicleService = { createVehicle,getAllVehicles };
