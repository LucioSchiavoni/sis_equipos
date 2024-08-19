-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rol" TEXT[] DEFAULT ARRAY['user']::TEXT[];
