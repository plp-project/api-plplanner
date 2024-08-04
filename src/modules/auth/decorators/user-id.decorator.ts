import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadDTO } from '../interface/dto/jwt-payload';

export const UserId = createParamDecorator(
  (data: unknown, context: ExecutionContext): number => {
    const user = context.switchToHttp().getRequest().user as JwtPayloadDTO;
    return user.id;
  }
);
