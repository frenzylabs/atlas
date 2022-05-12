import DataSource from '../source';
import argon2 from 'argon2';
import {Account} from '../entities';

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
  
    return await repo.save(account);
  } catch (e) {
    return e;
  }
}

const verify = async ({login, password}) => {
  try {
    const account = await find({
      where: [
        {email: login},
        {username: login},
      ]
    })[0];

    if(!account) {
      return false;
    }

    return await argon2.verify(account.password, password);

  } catch (e) {
    console.log('account verifty error: ', e);

    return false;
  }
}

export default {
  get,
  find,
  save,
  verify
}