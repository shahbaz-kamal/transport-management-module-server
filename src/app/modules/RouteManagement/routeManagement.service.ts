import { Prisma } from "@prisma/client";
import { prisma } from "../../shared/prisma";

const createRoute = async (payload: Prisma.RouteCreateInput) => {
  const result = await prisma.route.create({
    data: payload,
  });

  return result;
};

export const RouteManagementService = { createRoute };
