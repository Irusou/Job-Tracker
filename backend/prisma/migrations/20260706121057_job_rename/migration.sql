/*
  Warnings:

  - You are about to drop the `JobEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPLIED', 'REJECTED', 'GHOSTED', 'WAITFORREPLY', 'NOANSWER', 'ACCEPTED', 'INTERVIEWING');

-- CreateEnum
CREATE TYPE "ApplicationLocation" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');

-- DropForeignKey
ALTER TABLE "JobEntry" DROP CONSTRAINT "JobEntry_userId_fkey";

-- DropTable
DROP TABLE "JobEntry";

-- DropEnum
DROP TYPE "JobLocation";

-- DropEnum
DROP TYPE "JobStatus";

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" "ApplicationLocation" NOT NULL,
    "hours" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL,
    "lastReply" TIMESTAMP(3),
    "status" "ApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
