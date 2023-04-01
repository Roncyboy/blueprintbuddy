/*
  Warnings:

  - You are about to drop the column `code` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `totalComments` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `totalLikes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "code",
DROP COLUMN "language",
DROP COLUMN "totalComments",
DROP COLUMN "totalLikes",
DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "content" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
