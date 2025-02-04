/* eslint-disable prettier/prettier */
export class CreateUserDto {
  providerId: string;
  provider: string;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  picture: string | undefined;
}
