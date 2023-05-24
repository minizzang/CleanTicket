-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TicketManager" (
    "wallet" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isPending" BOOLEAN NOT NULL DEFAULT true,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_TicketManager" ("company", "name", "phone", "wallet") SELECT "company", "name", "phone", "wallet" FROM "TicketManager";
DROP TABLE "TicketManager";
ALTER TABLE "new_TicketManager" RENAME TO "TicketManager";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
