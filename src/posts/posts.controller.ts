import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateGroupPostDto } from './dto/create-group-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) { userId, ...createPostDto }: CreatePostDto,
  ) {
    return this.postsService.create(userId, createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Post('group')
  @UsePipes(new ValidationPipe())
  createGroupPost(
    @Body() { userIds, ...createGroupPostDto }: CreateGroupPostDto,
  ) {
    return this.postsService.createGroupPost(userIds, createGroupPostDto);
  }

  @Get('group')
  findAllGroupPosts() {
    return this.postsService.findAllGroupPosts();
  }
}
