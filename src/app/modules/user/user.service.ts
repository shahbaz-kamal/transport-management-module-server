import { Prisma } from "@prisma/client";
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

export const UserService = { createUser,getMe };
