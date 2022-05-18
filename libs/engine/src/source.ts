import {DataSource} from 'typeorm';
import env from 'env';
import {entities} from './entities';

const dataSource =  new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  synchronize: true,
  logging: false,
  entities: entities,
  subscribers: [],
  migrations: [],
});

export default dataSource;