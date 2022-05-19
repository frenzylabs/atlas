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
  AccessTokenProvider,
  RefreshTokenProvider,
  AuthCodeProvider,
  AccountProvider,
  AuthClientProvider
} from './providers';

(async () => {
  await DataSource.initialize();
})();
