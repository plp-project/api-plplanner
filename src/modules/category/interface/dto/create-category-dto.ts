import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../../infrastructure/model';
import { categories } from '../../infrastructure/model/interface';
import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsString,
  Length
} from 'class-validator';

export class CreateCategoryDTO implements Partial<CategoryEntity> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(categories)
  readonly type: categories;

  @ApiProperty()
  @IsNotEmpty()
  @IsHexColor()
  readonly color: string;
}
