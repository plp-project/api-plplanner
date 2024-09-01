import { Module } from '@nestjs/common';
import { BcryptHelper } from './bcrypt/bcrypt-helper.module';
import { MathHelper } from './math/math-helper.module';

@Module({
  providers: [BcryptHelper, MathHelper],
  exports: [BcryptHelper, MathHelper]
})
export class HelpersModule {}
