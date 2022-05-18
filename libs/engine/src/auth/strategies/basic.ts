import {BasicStrategy} from "passport-http";

import {
  AccountProvider,
  AuthClientProvider
} from '../../providers';

export const Basic = new BasicStrategy(async (login, password, done) => {
  try {
    const account = await AccountProvider.verify({login, password});

    if (!account) return done(null, false);

    return done(null, account);
  } catch(err) {
    return done(err);
  }
});

export const ClientBasic = new BasicStrategy(async (username, password, done) => {
  try {
    const client = await AuthClientProvider.get({id: username, secret: password});

    if (!client) return done(null, false);


    return done(null, client);
  } catch(err) {
    return done(err);
  }
});
