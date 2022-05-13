import {DataSource} from 'typeorm';
import Env from 'env';
import {entities} from './entities';

const dataSource =  new DataSource({
  type: "postgres",
  host: Env.db.host,
  port: Env.db.port,
  username: Env.db.user,
  password: Env.db.password,
  database: Env.db.name,
  synchronize: true,
  logging: false,
  entities: entities,
  subscribers: [],
  migrations: [],
});

export default dataSource;