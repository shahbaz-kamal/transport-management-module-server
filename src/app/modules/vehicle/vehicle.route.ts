import { Router } from "express";
import { VehicleController } from "./vehicle.controller";

const router = Router();

router.post("/create-vehicle", VehicleController.createVehicle);

export const VehicleRoute = router;
