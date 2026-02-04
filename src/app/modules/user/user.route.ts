import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { checkAuth } from "../../utils/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

router.post("/create-user", validateRequest(UserValidation.createUserZodSchema), UserController.createUser);

router.get("/me", checkAuth([Role.ADMIN, Role.SUPER_ADMIN,Role.STUDENT]), UserController.getMe);

router.get("/student",checkAuth([Role.ADMIN, Role.SUPER_ADMIN]),UserController.getAllStudent)
router.get("/student/myData",checkAuth([Role.STUDENT]),UserController.getStudentDashboardData)


export const UserRoutes = router;
