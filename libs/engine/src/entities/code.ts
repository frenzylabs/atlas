import {
  Entity, 
  Column,
  ManyToOne,
} from 'typeorm';

import Base from './base';
import Client from './client';
import Account from './account';

@Entity({name: 'auth_code'})
class Model extends Base {
  @Column({unique: true})
  key: string;
  
  @Column()
  redirectUri: string;
  
  @ManyToOne(type => Client, client => client.codes)
  client: Client;

  @ManyToOne(type => Account, account => account.codes)
  account: Account;
}

export default Model;