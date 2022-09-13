-- DropIndex
DROP INDEX "users_businessId_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "belongsToBusinessId" UUID;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_belongsToBusinessId_fkey" FOREIGN KEY ("belongsToBusinessId") REFERENCES "businesses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
