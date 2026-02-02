import { Router } from "express";
import { UserRoutes } from "../app/modules/user/user.route";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { RouteManagementRoutes } from "../app/modules/RouteManagement/routeManagement.route";
import { VehicleRoute } from "../app/modules/vehicle/vehicle.route";
import { PickupPointRoutes } from "../app/modules/pickupPoint/pickupPoint.route";

const router = Router();

const moduleRoutes = [
  { path: "/user", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/route", route: RouteManagementRoutes },
  { path: "/vehicle", route: VehicleRoute },
  { path: "/pickup-point", route: PickupPointRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
