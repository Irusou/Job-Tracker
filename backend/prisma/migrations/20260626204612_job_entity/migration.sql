-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('APPLIED', 'REJECTED', 'GHOSTED', 'WAITFORREPLY', 'NOANSWER', 'ACCEPTED', 'INTERVIEWING');

-- CreateTable
CREATE TABLE "JobEntry" (
    "id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL,
    "lastReply" TIMESTAMP(3),
    "status" "JobStatus" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "JobEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobEntry" ADD CONSTRAINT "JobEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
