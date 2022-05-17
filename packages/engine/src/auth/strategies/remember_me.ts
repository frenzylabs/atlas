import {v4 as uuid} from 'uuid';
import passport from 'passport';
import {
  Strategy,
  Token
} from 'passport-remember-me';

const strategy = new Strategy(
  async (token:Token, done) => {
    Token.consume(token, (err, account) => {
      if(err) {
        return done(err);
      }

      if(!account) {
        return done(null, false);
      }

      return done(null, account);
    });
  },
  async (account, done) => {
    const token = uuid();

    Token.save(token, {accountId: account.id}, async (err) => {
      if(err) {
        return done(err);
      }

      return done(null, token);
    });
  }
);

export default strategy;