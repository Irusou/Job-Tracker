/*
  Warnings:

  - Added the required column `location` to the `JobEntry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobLocation" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');

-- AlterTable
ALTER TABLE "JobEntry" ADD COLUMN     "location" "JobLocation" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'APPLIED';
