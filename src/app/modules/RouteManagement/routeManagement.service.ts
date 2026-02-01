import { Prisma } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import { ICreateRoute } from "./routeManagement.interface";

const createRoute = async (payload: ICreateRoute) => {
  const { pickupPoints, ...routeData } = payload;

  const orders = pickupPoints.map((p) => p.stopOrder);
  if (new Set(orders).size !== orders.length) {
    throw new Error("stopOrder must be unique within the route");
  }

  const result = await prisma.$transaction(async (tx) => {
    // creating routes
    const route = await tx.route.create({
      data: routeData,
    });

    // creating all Pick up points

    const createdPickUpPoints = await Promise.all(
      pickupPoints.map((pp) =>
        tx.pickupPoint.create({
          data: {
            name: pp.name,
            address: pp.address,
          },
        })
      )
    );

    // creating junction table
    await tx.routePickupPoints.createMany({
      data: createdPickUpPoints.map((pp, index) => ({
        routeId: route.id,
        pickupPointId: pp.id,
        stopOrder: pickupPoints[index]!.stopOrder,
      })),
    });

    return tx.route.findUnique({
      where: { id: route.id },
      include: {
        routePickupPoints: {
          orderBy: { stopOrder: "asc" },
          include: { pickupPoint: true },
        },
      },
    });
  });

  return result;
};

export const RouteManagementService = { createRoute };
