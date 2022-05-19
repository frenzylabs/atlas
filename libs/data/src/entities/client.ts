import {
  Entity, 
  Column,
  OneToMany,
} from 'typeorm';

import Base from './base';
import Code from './code';
import {
  AccessToken,
  RefreshToken,
} from './token';

@Entity({name: 'auth_client'})
class Model extends Base {
  @Column({unique: true})
  name: string;
  
  @Column({unique: true})
  secret: string;
  
  @Column()
  trusted: boolean;

  @OneToMany(type => Code, code => code.client)
  codes: Code[];

  @OneToMany(type => AccessToken, code => code.client)
  accessTokens: AccessToken[];

  @OneToMany(type => RefreshToken, code => code.client)
  refreshTokens: RefreshToken[];
}

export default Model;