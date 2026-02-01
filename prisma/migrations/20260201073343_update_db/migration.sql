/*
  Warnings:

  - You are about to drop the column `monthlyFee` on the `PickupPoint` table. All the data in the column will be lost.
  - Added the required column `monthlyFee` to the `route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PickupPoint" DROP COLUMN "monthlyFee";

-- AlterTable
ALTER TABLE "route" ADD COLUMN     "monthlyFee" TEXT NOT NULL;
