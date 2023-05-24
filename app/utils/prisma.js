// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global;

// export default prisma =
//   globalForPrisma.prisma ?? new PrismaClient({ log: ["query"] });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
////////////////////////////////////////
// import { PrismaClient } from "@prisma/client";

// let prisma;

// if (typeof window === "undefined") {
//   if (process.env.NODE_ENV === "production") {
//     prisma = new PrismaClient();
//   } else {
//     if (!global.prisma) {
//       global.prisma = new PrismaClient();
//     }
//     prisma = global.prisma;
//   }
// }

// export default prisma;

////////////////////////////////
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function checkIsManager() {
//   return await prisma.ticketManager.findUnique({
//     where: {
//       wallet: "test",
//     },
//   });
// }
