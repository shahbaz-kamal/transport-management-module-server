import { Role } from "@prisma/client";
import { Router } from "express";
import { checkAuth } from "../../utils/checkAuth";

import { PickupPointController } from "./pickupPoint.controller";

const router = Router();

// get all routes
router.get("/", checkAuth([Role.ADMIN, Role.SUPER_ADMIN]), PickupPointController.getAllPickupPoint);

export const PickupPointRoutes = router;
