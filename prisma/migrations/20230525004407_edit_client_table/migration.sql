/*
  Warnings:

  - You are about to alter the column `fullName` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `email` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(254)`.
  - You are about to alter the column `phone` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(12)`.

*/
-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "fullName" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(254),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(12);

-- AlterTable
ALTER TABLE "contacts" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(12);
