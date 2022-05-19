import DataSource from '../source';
import {AuthClient} from '../entities';

const repo = DataSource.manager.getRepository(AuthClient);

const get = async (where:{[key:string]:any}) => 
  await repo.find({where})[0] || null;

const find = async (where:{[key:string]:any}) => 
  await repo.find({where}) || [];

const save = async ({name, secret, trusted}) => {
  try {
    const client = new AuthClient();
    client.name = name;
    client.secret = secret;
    client.trusted = trusted;
    client.codes = [];
    client.accessTokens = [];
    client.refreshTokens = [];
  
    return await repo.save(client);
  } catch (e) {
    return e;
  }
}

export default {
  get,
  find,
  save,
}