import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  getAdminByEmail(email: string) {
    return this.prismaService.admin.findFirst({
      where: { email },
    });
  }
}
