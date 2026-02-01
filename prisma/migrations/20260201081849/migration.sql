/*
  Warnings:

  - You are about to drop the column `routeId` on the `pickupPoint` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vehicleNo]` on the table `vehicle` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `monthlyFee` on the `route` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "pickupPoint" DROP CONSTRAINT "pickupPoint_routeId_fkey";

-- AlterTable
ALTER TABLE "pickupPoint" DROP COLUMN "routeId";

-- AlterTable
ALTER TABLE "route" DROP COLUMN "monthlyFee",
ADD COLUMN     "monthlyFee" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "vehicle" ALTER COLUMN "vehicleNo" DROP DEFAULT,
ALTER COLUMN "vehicleNo" SET DATA TYPE TEXT;
DROP SEQUENCE "vehicle_vehicleNo_seq";

-- CreateTable
CREATE TABLE "routePickupPoint" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "pickupPointId" TEXT NOT NULL,
    "stopOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "routePickupPoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "routePickupPoint_routeId_pickupPointId_key" ON "routePickupPoint"("routeId", "pickupPointId");

-- CreateIndex
CREATE UNIQUE INDEX "routePickupPoint_routeId_stopOrder_key" ON "routePickupPoint"("routeId", "stopOrder");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_vehicleNo_key" ON "vehicle"("vehicleNo");

-- AddForeignKey
ALTER TABLE "routePickupPoint" ADD CONSTRAINT "routePickupPoint_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routePickupPoint" ADD CONSTRAINT "routePickupPoint_pickupPointId_fkey" FOREIGN KEY ("pickupPointId") REFERENCES "pickupPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
