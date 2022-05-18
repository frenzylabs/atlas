import DataSource from '../source';

import {
  AccessToken,
  AuthClient,
  Account
} from '../entities';

import ClientProvider from './client';
import AccountProvider from './account';

const repo = DataSource.manager.getRepository(AccessToken);

type Unsaved = {
  key: string,
  client: AuthClient | string,
  account: Account | string,
  expires?: Date,
}

const get = async (where:{[key:string]:any}) => 
  await repo.find({where})[0] || null;

const find = async (where:{[key:string]:any}) => 
  await repo.find({where}) || [];

const save = async (data:Unsaved) => {
  try {
    const client:AuthClient = typeof data.client == 'string' ? await ClientProvider.get({id: data.client}) : data.client;
    const account:Account = typeof data.account == 'string' ? await AccountProvider.get({id: data.account}) : data.account;
    const expiry = data.expires || new Date(new Date().getFullYear() + 100);

    const token = new AccessToken();
    token.key = data.key;
    token.client = client;
    token.account = account;
    token.expires = expiry
  
    return await repo.save(token);
  } catch (e) {
    return e;
  }
}

export default {
  get,
  find,
  save,
}