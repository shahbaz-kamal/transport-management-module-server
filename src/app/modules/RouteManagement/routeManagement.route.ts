import { Router } from "express";
import { RouteManagementController } from "./routeManagement.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { RouteValidation } from "./routeManagement.validation";
import { checkAuth } from "../../utils/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

// get all routes
router.get("/", checkAuth([Role.ADMIN, Role.SUPER_ADMIN]), RouteManagementController.getAllRoutes);

router.get("/route-with-pickup", checkAuth([Role.ADMIN, Role.SUPER_ADMIN]), RouteManagementController.getAllRoutesWithPickupPoints);

// create route
router.post(
  "/create-route",
  validateRequest(RouteValidation.createRouteZodSchema),
  checkAuth([Role.ADMIN, Role.SUPER_ADMIN]),
  RouteManagementController.createRoute
);

// update route fee

router.patch(
  "/update-route",
  validateRequest(RouteValidation.updateRouteFeeZodSchema),
  checkAuth([Role.ADMIN, Role.SUPER_ADMIN]),
  RouteManagementController.updateRouteFee
);

router.post("/assign-route", checkAuth([Role.ADMIN, Role.SUPER_ADMIN]), RouteManagementController.assignRoute);

export const RouteManagementRoutes = router;
