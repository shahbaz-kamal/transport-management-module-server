import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../utils/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

router.post("/login", AuthController.login);

router.post("/logout", checkAuth([Role.ADMIN, Role.SUPER_ADMIN,Role.STUDENT]), AuthController.logout);

export const AuthRoutes = router;
