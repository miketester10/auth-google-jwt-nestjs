/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async createUser(): Promise<void> {
    // TO DO
    console.log('User created');
  }
}
