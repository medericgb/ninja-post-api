import { IsNotEmpty, IsString, MaxLength, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateGroupPostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  userIds: string[];
}
