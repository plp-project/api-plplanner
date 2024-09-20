import { Module } from '@nestjs/common';
import { BcryptHelper } from './bcrypt/bcrypt-helper';
import { DateHelper } from './date/date-helper';
import { MathHelper } from './math/math-helper.module';

@Module({
  providers: [BcryptHelper, MathHelper, DateHelper],
  exports: [BcryptHelper, MathHelper, DateHelper]
})
export class HelpersModule {}
