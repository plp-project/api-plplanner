import { UserEntity } from 'src/modules/user/infrastructure/model';

export class JwtPayloadDTO {
  readonly id: number;
  readonly iat?: number;
  readonly exp?: number;

  constructor(user: UserEntity) {
    this.id = user.id;
  }
}
