import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserEntity } from './interface';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'User' })
export class UserEntity implements IUserEntity {
  @ApiProperty({
    description: 'Id',
    type: Number,
    nullable: false,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name',
    type: String,
    nullable: false,
  })
  @Column({ type: String, nullable: false, length: 255 })
  name: string;

  @ApiProperty({
    description: 'Email',
    type: String,
    nullable: false,
  })
  @Column({ type: String, nullable: false, length: 255 })
  email: string;

  @ApiProperty({
    description: 'Password',
    type: String,
    nullable: false,
  })
  @Column({ type: String, nullable: false, length: 255 })
  password: string;
}
