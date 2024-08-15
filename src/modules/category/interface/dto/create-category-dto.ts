import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../../infrastructure/model';
import { IsHexColor, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDTO implements Partial<CategoryEntity> {
  @ApiProperty({ minLength: 3, maxLength: 30 })
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsHexColor()
  readonly color: string;
}
