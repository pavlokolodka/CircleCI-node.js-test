import { PrismaService } from "src/services/prisma.service";

export default abstract class Repository {
  constructor(protected readonly prismaService: PrismaService) {}
}