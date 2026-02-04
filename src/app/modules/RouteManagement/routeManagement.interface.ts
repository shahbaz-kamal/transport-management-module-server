import { FeeStatus } from "@prisma/client";

interface IPickupPoints {
  name: string;
  address: string;
  stopOrder: number;
}

export interface ICreateRoute {
  name: string;
  startPoint: string;
  endPoint: string;
  monthlyFee: number;
  pickupPoints: IPickupPoints[];
}

export interface IStudentFeeAssignment {
  userId: string;
  amount: number;
  month: string;
  year: string;
  status: FeeStatus;
  assignedBy: string;
  assignedAt?: Date;
  updatedAt?: Date;
}

export interface IStudentTransportAssignment {
  userId: string;
  routeId: string;
  vehicleId: string;
  pickupPointId: string;
  assignedBy: string;
  assignedAt?: Date;
  updatedAt?: string;
}
