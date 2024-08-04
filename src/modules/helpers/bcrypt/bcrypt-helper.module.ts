import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

@Injectable()
export class BcryptHelper {
  encrypt(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  compare(password: string, passwordDb: string) {
    if (!password || !passwordDb) return false;
    return compareSync(password, passwordDb);
  }
}
