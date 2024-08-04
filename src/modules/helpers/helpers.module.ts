import { Module } from '@nestjs/common';
import { BcryptHelper } from './bcrypt/bcrypt-helper.module';

@Module({
  providers: [BcryptHelper],
  exports: [BcryptHelper]
})
export class HelpersModule {}
