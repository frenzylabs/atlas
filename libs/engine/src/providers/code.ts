import DataSource from '../source';

import {
  Account,
  AuthCode,
  AuthClient
} from '../entities';

import ClientProvider from './client';
import AccountProvider from './account';

type Unsaved = {
  key:string,
  redirectUri: string,
  client: AuthClient | string,
  account: Account | string
}

const repo = DataSource.manager.getRepository(AuthCode);

const get = async (where:{[key:string]:any}) => 
  await repo.find({where})[0] || null;

const find = async (where:{[key:string]:any}) => 
  await repo.find({where}) || [];

const save = async (data:Unsaved) => {
  try {
    const client:AuthClient = typeof data.client == 'string' ? await ClientProvider.get({id: data.client}) : data.client;
    const account:Account = typeof data.account == 'string' ? await AccountProvider.get({id: data.account}) : data.account;

    const code = new AuthCode();
    code.key = data.key;
    code.redirectUri = data.redirectUri;
    code.client = client
    code.account = account;
  
    return await repo.save(code);
  } catch (e) {
    return e;
  }
}

const revoke = async (code) => 
  await repo.delete({key: code});

export default {
  get,
  find,
  save,
  revoke,
}