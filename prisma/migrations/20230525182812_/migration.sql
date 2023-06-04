/*
  Warnings:

  - You are about to drop the column `fullName` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `name` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "fullName",
ADD COLUMN     "name" VARCHAR(150) NOT NULL;

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "fullName",
ADD COLUMN     "name" VARCHAR(150) NOT NULL;
