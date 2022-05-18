import passport from "passport";
import {Strategy} from "passport-http-bearer";

import {
  AccountProvider,
  AccessTokenProvider,
} from '../../providers';

const bearer = new Strategy(async (accessToken, done) => {
  try {
    const token = await AccessTokenProvider.get({
      key: accessToken,
      relations: {
        account: true,
      }
    });

    if(!token) return done(null, false);

    const user = await AccountProvider.find({id: token.account.id});

    if(!user) return done(null, false);

    return done(null, user, {scope: "*"});
  } catch(err) {
    return done(err);
  }
});

export default bearer;