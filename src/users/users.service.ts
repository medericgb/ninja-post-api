import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        userSetting: {
          create: {
            smsEnabled: true,
            notificationsOn: false,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        userSetting: {
          select: {
            smsEnabled: true,
            notificationsOn: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userSetting: {
          select: {
            smsEnabled: true,
            notificationsOn: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const findUser = await this.findOne(id);
    if (!findUser) throw new HttpException('User not found.', 404);

    if (data.username) {
      const findUser = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });
      if (findUser) throw new HttpException('Username already taken', 405);
    }

    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: string) {
    const findUser = await this.findOne(id);
    if (!findUser) throw new HttpException('User not found.', 404);
    return this.prisma.user.delete({ where: { id } });
  }

  async updateUserSettings(
    userId: string,
    data: Prisma.UserSettingUpdateInput,
  ) {
    const findUser = await this.findOne(userId);
    if (!findUser) throw new HttpException('User not found.', 404);
    if (!findUser.userSetting) throw new HttpException('No settings.', 400);

    return this.prisma.userSetting.update({
      where: { userId },
      data,
    });
  }
}
