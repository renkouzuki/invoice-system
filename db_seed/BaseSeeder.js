import getPrismaClient from "../utils/prisma.js";

class BaseSeeder {
  constructor() {
    this.prisma = getPrismaClient();
  }

  async run() {
    throw new Error("Method `run()` must be implemeted");
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}

export default BaseSeeder;
