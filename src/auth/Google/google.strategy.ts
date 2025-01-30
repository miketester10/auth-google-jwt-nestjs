/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './auth.service';
import { Token } from 'src/common/interfaces/token.interface';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    protected readonly configService: ConfigService,
    private readonly appService: AppService,
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
  ): Promise<Token> {
    const { name, emails, photos } = profile;

    const user = {
      email: emails && emails[0].value,
      firstName: name?.givenName,
      lastName: name?.familyName,
      picture: photos && photos[0].value,
    };

    console.log(user);
    // recuperare user dal db (mediante email),se non esiste lo creo
    await this.appService.createUser();
    // creare jwt token e restituirlo anziche restituire l'utente
    const jwt = 'token'; // TO DO
    return { jwt };
  }
}
