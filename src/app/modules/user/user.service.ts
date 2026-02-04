import { Prisma, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { envVars } from "../../../config/env";
import { prisma } from "../../shared/prisma";

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


const getAllStudents = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: Role.STUDENT,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      address: true,
      isRouteAssigned: true,
      createdAt: true,
      updatedAt: true,

      transportAsStudent: {
        take: 1,
        orderBy: {
          assignedAt: "desc",
        },
        select: {
          route: {
            select: {
              id: true,
              name: true,
            },
          },
          vehicle: {
            select: {
              id: true,
              vehicleNo: true,
            },
          },
          pickupPoint: {
            select: {
              id: true,
              name: true,
            },
          },
          assignedAt: true,
        },
      },
    },
  });

  return result;
};


export const UserService = { createUser,getMe,getAllStudents };
