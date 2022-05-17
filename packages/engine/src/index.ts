export {
  Account,
  AuthClient,
  AuthCode,
  AccessToken,
  RefreshToken  
} from './entities';

import DataSource from './source';

const {manager} = DataSource;

export {
  DataSource,
  manager
};

export {
  AccessProvider,
  RefreshProvider,
  AuthCodeProvider,
  AccountProvider,
  AuthClientProvider
} from './providers';

export {
  LocalStrategy,
  RememberStrategy
} from './auth';

(async () => {
  await DataSource.initialize();
})();
