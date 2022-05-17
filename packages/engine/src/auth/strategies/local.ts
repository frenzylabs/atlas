import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

import {
  Account
} from '../../entities';

import {
  AccountProvider
} from '../../providers';


const strategy = new LocalStrategy(
  {
    usernameField: 'login',
    passwordField: 'password'
  },  
  async (login, password, done) => {
    try {
      const account = await AccountProvider.verify({login, password});

      if(!account) {
        done(null, false);
      } else {
        done(null, account);
      }
    } catch(err) {
      done(err);
    }
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.serializeUser(async (entity:Account, done) => {

  done(null, {
    id: entity.id,
    username: entity.username,
  });
});

export default strategy;