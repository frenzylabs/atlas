import 'appendix';

import DataSource from '../source';
import argon2 from 'argon2';

import {Account} from '../entities';

import {
  DatabaseError
} from '../errors';

const repo = DataSource.manager.getRepository(Account);

const get = async (where:{[key:string]:any}) => 
  await repo.find({where})[0] || null;

const find = async (where:{[key:string]:any}) => 
  await repo.find({where}) || [];

const save = async ({email, username, password}) => {
  try {
    const account = new Account();
    account.email = email;
    account.username = username;
    account.password = await argon2.hash(password);
    
    const saved = await repo.save(account);

    console.log(saved);

    if(!saved) {
      throw new Error('Unable to save account');
    }

    return saved;
  } catch (e) {
    DatabaseError(e);
    return e;
  }
}

const verify = async ({login, password}) => {
  try {
    const accounts = await repo.find({
      where: [
        {email: login},
        {username: login},
      ]
    });

    const account = accounts.first();
    if(!account) {
      return null;
    }

    if(await argon2.verify(account.password, password)) {
      return account;
    }

    return null;

  } catch (e) {
    throw e;
  }
}

export default {
  get,
  find,
  save,
  verify
}