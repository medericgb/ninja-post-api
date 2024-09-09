import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // Posts
  create(userId: string, data: Prisma.PostCreateWithoutUserInput) {
    return this.prisma.post.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: any) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  // Group posts
  createGroupPost(
    userIds: string[],
    data: Prisma.GroupPostCreateWithoutUsersInput,
  ) {
    return this.prisma.groupPost.create({
      data: {
        ...data,
        users: {
          create: userIds.map((userId) => ({ userId })),
        },
      },
    });
  }

  findAllGroupPosts() {
    return this.prisma.groupPost.findMany({
      include: {
        users: {
          select: {
            user: true,
          },
        },
      },
    });
  }
}
