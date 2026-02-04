import { Prisma } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import { ICreateRoute, IStudentFeeAssignment, IStudentTransportAssignment } from "./routeManagement.interface";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

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

const assignRoute = async (feeAssign: IStudentFeeAssignment, transportAssign: IStudentTransportAssignment) => {
  if (!feeAssign.assignedBy) {
    throw new AppError(httpStatus.BAD_REQUEST, "assignedBy is required");
  }

  const result = await prisma.$transaction(async (tx) => {
    const isStudentExist = await tx.user.findUnique({
      where: { id: feeAssign.userId },
    });
    console.log("Is:", isStudentExist);
    if (isStudentExist?.isRouteAssigned) throw new AppError(httpStatus.BAD_REQUEST, "Route ALready assigned");
    const feeData = await tx.studentFeeAssignment.create({
      data: {
        amount: feeAssign.amount,
        month: feeAssign.month,
        year: feeAssign.year,
        status: feeAssign.status,
        user: { connect: { id: feeAssign.userId } },
        assignedByUser: { connect: { id: feeAssign.assignedBy } },
      },
    });

    const transportData = await tx.studentTransportAssignment.create({
      data: {
        user: { connect: { id: transportAssign.userId } },
        assignedByUser: { connect: { id: feeAssign.assignedBy } },
        route: { connect: { id: transportAssign.routeId } },
        vehicle: { connect: { id: transportAssign.vehicleId } },
        pickupPoint: { connect: { id: transportAssign.pickupPointId } },
      },
    });

    await tx.user.update({
      where: { id: feeAssign.userId },
      data: { isRouteAssigned: true },
    });
    return { feeData, transportData };
  });

  return result;
};

export const RouteManagementService = { createRoute, getAllRoutes, updateRouteFee, getAllRoutesWithPickupPoints, assignRoute };
