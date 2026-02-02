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

const updateRouteFee = async (payload: { routeId: string; monthlyFee: number }) => {
  const result = await prisma.route.update({
    where: { id: payload.routeId },
    data: {
      monthlyFee: payload.monthlyFee,
    },
  });

  return result;
};

const getAllRoutes = async () => {
  const result = await prisma.route.findMany();
  return result;
};

const getAllRoutesWithPickupPoints = async () => {
  const result = await prisma.route.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      vehicles: {
        select: {
          id: true,
          vehicleNo: true,
          driverName: true,
          contactNo: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      routePickupPoints: {
        orderBy: { stopOrder: "asc" },
        include: {
          pickupPoint: true,
        },
      },
    },
  });

  const formattedResult = result.map((route) => ({
    id: route.id,
    name: route.name,
    startPoint: route.startPoint,
    endPoint: route.endPoint,
    monthlyFee: route.monthlyFee,
    createdAt: route.createdAt,
    updatedAt: route.updatedAt,

    pickupPoints: route.routePickupPoints.map((rp) => ({
      id: rp.pickupPoint.id,
      name: rp.pickupPoint.name,
      address: rp.pickupPoint.address,
      stopOrder: rp.stopOrder,
      routePickupPointId: rp.id,
    })),

    vehicles: route.vehicles.map((v) => ({
      id: v.id,
      vehicleNo: v.vehicleNo,
      driverName: v.driverName,
      contactNo: v.contactNo,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    })),
  }));

  return formattedResult;
};


export const RouteManagementService = { createRoute, getAllRoutes,updateRouteFee,getAllRoutesWithPickupPoints };
