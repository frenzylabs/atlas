import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

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
  console.log(id);
  
  done(null, id);
});

passport.serializeUser((id, done) => {
  try {
    const account = AccountProvider.get({id});

    if(!account) done(null, false);

    done(null, account);
  } catch (err) {
    done(err);
  }
});

export default strategy;