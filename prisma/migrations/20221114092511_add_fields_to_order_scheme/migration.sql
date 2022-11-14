/*
  Warnings:

  - Added the required column `finished_at` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal_amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_info` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sum` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "finished_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "goal_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "short_info" TEXT NOT NULL,
ADD COLUMN     "sum" DOUBLE PRECISION NOT NULL;

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('open', 'closed');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'open';