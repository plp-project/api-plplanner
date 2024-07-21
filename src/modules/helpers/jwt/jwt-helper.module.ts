import { Module } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export class JwtHelper {
  encrypt(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  compare(password: string, passwordDb: string) {
    return compareSync(password, passwordDb);
  }
}

@Module({
  providers: [JwtHelper],
  exports: [JwtHelper],
})
export class JwtHelperModule {}
