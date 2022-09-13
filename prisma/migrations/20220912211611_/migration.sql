/*
  Warnings:

  - You are about to drop the column `ownerUserId` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `ownedBusinessId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[businessId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `businesses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "businesses" DROP CONSTRAINT "businesses_ownerUserId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_businessId_fkey";

-- DropIndex
DROP INDEX "businesses_ownerUserId_key";

-- DropIndex
DROP INDEX "users_ownedBusinessId_key";

-- AlterTable
ALTER TABLE "businesses" DROP COLUMN "ownerUserId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "ownedBusinessId",
ALTER COLUMN "role" DROP DEFAULT,
ALTER COLUMN "businessId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "businesses_userId_key" ON "businesses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_businessId_key" ON "users"("businessId");

-- AddForeignKey
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
