/*
  Warnings:

  - A unique constraint covering the columns `[wallet]` on the table `TicketManager` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TicketManager_wallet_key" ON "TicketManager"("wallet");
