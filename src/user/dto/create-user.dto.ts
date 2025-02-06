/* eslint-disable prettier/prettier */
export class CreateUserDto {
  providerId: string;
  provider: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}
