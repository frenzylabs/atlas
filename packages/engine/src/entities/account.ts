import {
  Entity, 
  Column,
  Index,
  OneToMany,
} from 'typeorm';

import Base from './base';

import Code from './code';

import {
  AccessToken,
  RefreshToken,
} from './token';

@Entity({name: 'accounts'})
class Model extends Base {
  @Column({unique: true})
  email:string;

  @Column({unique: true})
  username:string;

  @Column()
  password:string;

  @OneToMany(type => Code, code => code.account)
  codes: Code[];

  @OneToMany(type => AccessToken, code => code.account)
  accessTokens:AccessToken[];

  @OneToMany(type => RefreshToken, code => code.account)
  refreshTokens:RefreshToken[];
}

export default Model;