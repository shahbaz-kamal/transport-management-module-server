import z from "zod";

const pickupPointSchema = z.object({
  name: z.string().min(1, "Pickup point name is required"),
  address: z.string().min(1, "Pickup point address is required"),
  stopOrder: z.coerce.number().int().min(1, "stopOrder must start from 1"),
});

const createRouteZodSchema = z
  .object({
    name: z.string().min(1, "Route name is required"),
    startPoint: z.string().min(1, "Start point is required"),
    endPoint: z.string().min(1, "End point is required"),
    monthlyFee: z.coerce.number().int().min(0, "Monthly fee cannot be negative"),

    pickupPoints: z.array(pickupPointSchema).min(1, "At least one pickup point is required"),
  })

  .refine((data) => new Set(data.pickupPoints.map((p) => p.stopOrder)).size === data.pickupPoints.length, {
    message: "stopOrder must be unique within a route",
    path: ["pickupPoints"],
  });

export const RouteValidation = { createRouteZodSchema };
