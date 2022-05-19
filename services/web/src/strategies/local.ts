import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

import {
  Account
} from 'data';

import {
  AccountProvider
} from 'data';


const strategy = new LocalStrategy(
  {
    usernameField: 'login',
    passwordField: 'password'
  },  
  async (login, password, done) => {
    try {
      const account = await AccountProvider.verify({login, password});

      if(!account) {
        return done(null, false);
      } 
      const {id, username} = account;

      return done(null, {id, username,});
      
    } catch(err) {
      return done(err);
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