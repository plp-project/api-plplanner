import { Module } from '@nestjs/common';
import { BcryptHelper } from './bcrypt/bcrypt-helper';
import { MathHelper } from './math/math-helper';

@Module({
  providers: [BcryptHelper, MathHelper],
  exports: [BcryptHelper, MathHelper]
})
export class HelpersModule {}
