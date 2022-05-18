import 'reflect-metadata';
import 'appendix';

import path from 'path';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import env from 'env';
import nunjucks from 'nunjucks';
import { ensureLoggedIn } from 'connect-ensure-login';

import {
  LocalStrategy,
} from 'engine';

import {
  User,
  App
} from './routes';

(async () => {
  const app = express();


  // Configure
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  

  // Session & Auth
  app.use(session({
    secret: env.security.session_secret,
    resave: false,
    saveUninitialized: false,
  }));

  
  app
  .use(cookieParser())
  .use(passport.initialize())
  .use(passport.session());
  
  passport.use(LocalStrategy);

  // Views
  nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
    watch: true,
  });

  app.engine('html', nunjucks.render);
  app.set('view engine', 'html');

  // Routes
  
  app.get('/', async (req, res) => res.redirect('/users/register'));
  app.use('/users', User);
  app.use('/app', ensureLoggedIn('/users/login'), App);
  
  app.use(express.static(path.resolve(__dirname, '../public')));
  // DEBUG

  app.listen(env.web.port, () => {
    console.log('Web is running on port ' + env.web.port);
  });
})();