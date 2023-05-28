-- CreateTable
CREATE TABLE "TicketManager" (
    "wallet" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isPending" BOOLEAN NOT NULL DEFAULT true,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TicketManager_pkey" PRIMARY KEY ("wallet")
);

-- CreateIndex
CREATE UNIQUE INDEX "TicketManager_wallet_key" ON "TicketManager"("wallet");
