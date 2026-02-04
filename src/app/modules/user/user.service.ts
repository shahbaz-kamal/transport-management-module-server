import { Prisma, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { envVars } from "../../../config/env";
import { prisma } from "../../shared/prisma";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes"

const createUser = async (newUser: Prisma.UserCreateInput) => {
  const { password, ...rest } = newUser;
  const hashedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
  const result = await prisma.user.create({
    data: { ...rest, password: hashedPassword },
  });
  return result;
};

const getMe=async(myId:string)=>{
const user=await prisma.user.findUnique({
  where:{
    id:myId
  }
})
return user
}


// const getAllStudents = async () => {
//   const result = await prisma.user.findMany({
//     where: {
//       role: Role.STUDENT,
//     },
//     select: {
//       id: true,
//       email: true,
//       name: true,
//       role: true,
//       address: true,
//       isRouteAssigned: true,
//       createdAt: true,
//       updatedAt: true,

//       transportAsStudent: {
//         take: 1,
//         orderBy: {
//           assignedAt: "desc",
//         },
//         select: {
//           route: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//           vehicle: {
//             select: {
//               id: true,
//               vehicleNo: true,
//             },
//           },
//           pickupPoint: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//           assignedAt: true,
//         },
//       },
//     },
//   });

//   return result;
// };
const getAllStudents = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: Role.STUDENT,
    },
    include: {
      transportAsStudent: {
        orderBy: { assignedAt: "desc" },
        take: 1,
        include: {
          route: {
            select: { id: true, name: true },
          },
          vehicle: {
            select: { id: true, vehicleNo: true },
          },
          pickupPoint: {
            select: { id: true, name: true },
          },
        },
      },
      student: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: {
          month: true,
          year: true,
        },
      },
    },
  });

  return result;
};

export const getStudentDashboardData = async (userId: string) => {
  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "User id is required");
  }

  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" }); 
  const year = String(now.getFullYear()); 

  const [fee, transport] = await Promise.all([
    prisma.studentFeeAssignment.findFirst({
      where: { userId, month, year },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        amount: true,
        month: true,
        year: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    }),

    prisma.studentTransportAssignment.findFirst({
      where: { userId },
      orderBy: { assignedAt: "desc" },
      select: {
        id: true,
        assignedAt: true,
        updatedAt: true,
        route: {
          select: {
            id: true,
            name: true,
            startPoint: true,
            endPoint: true,
            monthlyFee: true,
          },
        },
        vehicle: {
          select: {
            id: true,
            vehicleNo: true,
            driverName: true,
            contactNo: true,
          },
        },
        pickupPoint: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    }),
  ]);

  const isAssigned = Boolean(transport);

  return {
    month,
    year,
    fee: fee
      ? fee
      : {
          month,
          year,
          status: "UNPAID",
          amount: 0,
          message: "No fee assigned for current month",
        },
    transport: isAssigned
      ? transport
      : {
          message: "No transport assigned",
        },
    isTransportAssigned: isAssigned,
  };
};


export const UserService = { createUser,getMe,getAllStudents,getStudentDashboardData };
