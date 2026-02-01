import { Router } from "express";
import { RouteManagementController } from "./routeManagement.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { RouteValidation } from "./routeManagement.validation";

const router = Router();

router.post("/create-route", validateRequest(RouteValidation.createRouteZodSchema), RouteManagementController.createRoute);

export const RouteManagementRoutes = router;
