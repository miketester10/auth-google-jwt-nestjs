/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { GoogleUser } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: <string>configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: <string>configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: <string>configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<GoogleUser> {
    const { name, emails, photos } = profile;

    const createUserDto: CreateUserDto = {
      providerId: profile.id,
      provider: profile.provider,
      email: emails?.[0]?.value,
      firstName: name?.givenName,
      lastName: name?.familyName,
      picture: photos?.[0]?.value,
    };

    return this.userService.findOrCreateGoogleUser(createUserDto);
  }
}
