import { Prisma } from "@prisma/client";
import { envVars } from "../../config/env";
import { prisma } from "../shared/prisma";
import bcrypt from "bcryptjs";

export const seedSuperAdmin = async () => {
  const isSuperAdminExist = await prisma.user.findFirst({
    where: {
      role: {
        in: ["ADMIN", "SUPER_ADMIN"],
      },
    },
  });

  if (isSuperAdminExist) {
    console.log("Super admin exist");
    return;
  }

  const hashedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND));

  const payload: Prisma.UserCreateInput = {
    email: envVars.SUPER_ADMIN_EMAIL,
    password: hashedPassword,
    name: "Super Admin Shaheb",
    role: "SUPER_ADMIN",
    address: "School location",
  };

  const result = await prisma.user.create({
    data: payload,
  });

  console.log("Super Admin Created\n", result);
};
