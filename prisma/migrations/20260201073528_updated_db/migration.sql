/*
  Warnings:

  - You are about to drop the `PickupPoint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PickupPoint" DROP CONSTRAINT "PickupPoint_routeId_fkey";

-- DropForeignKey
ALTER TABLE "studentTransportAssignments" DROP CONSTRAINT "studentTransportAssignments_pickupPointId_fkey";

-- DropTable
DROP TABLE "PickupPoint";

-- CreateTable
CREATE TABLE "pickupPoint" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pickupPoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "studentTransportAssignments" ADD CONSTRAINT "studentTransportAssignments_pickupPointId_fkey" FOREIGN KEY ("pickupPointId") REFERENCES "pickupPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickupPoint" ADD CONSTRAINT "pickupPoint_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
