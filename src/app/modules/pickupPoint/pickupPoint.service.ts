import { prisma } from "../../shared/prisma";

const getAllPickupPoint = async () => {
  const result = await prisma.pickupPoint.findMany();

  return result;
};

export const PickupPointService = { getAllPickupPoint };
