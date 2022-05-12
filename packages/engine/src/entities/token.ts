import {
  Entity, 
  Column,
  ManyToOne,
} from 'typeorm';

import Base from './base';
import Client from './client';
import Account from './account';

abstract class Token extends Base {
  @Column()
  key: string;

  @Column()
  expires: Date;
  
}

@Entity({name: 'auth_access_token'})
export class AccessToken extends Token {
  @ManyToOne(type => Client, client => client.accessTokens)
  client: Client;

  @ManyToOne(type => Account, account => account.accessTokens)
  account: Account;
}

@Entity({name: 'auth_refresh_token'})
export class RefreshToken extends Token {
  @ManyToOne(type => Client, client => client.refreshTokens)
  client: Client;

  @ManyToOne(type => Account, account => account.accessTokens)
  account: Account;
}
