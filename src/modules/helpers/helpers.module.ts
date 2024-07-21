import { Module } from '@nestjs/common';
import { JwtHelperModule } from './jwt/jwt-helper.module';

@Module({
  imports: [JwtHelperModule]
})
export class HelpersModule {}
