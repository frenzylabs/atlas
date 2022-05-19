import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import errorHandler from 'errorhandler';
import session from 'express-session';
import passport from 'passport';
import nunjucks from 'nunjucks';
import env from 'env';

import {
  BasicStrategy,
  BearerStrategy,
  ClientBasicStrategy,
} from './strategies';

import {databaseInitialize} from 'data';

import {
  Authorize,
  ClientAuthenticated,
} from './middleware';

import OAuth from './route';

(async() => {;
  await databaseInitialize();
  
  const app = express();

  app
  .disable('x-powered-by')
  .disable('X-Powered-By')
  .use(morgan(env.current == 'dev' ? 'combined' : 'dev'))
  .use(cors())
  .use(express.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(errorHandler())
  .use(session({
    secret: env.security.session_secret,
    resave: false,
    saveUninitialized: false,
  }));

  app
  .use(passport.initialize())
  .use(passport.session());
  
  passport.use(BasicStrategy);
  passport.use("client-basic", ClientBasicStrategy);
  passport.use(BearerStrategy);


  //Templating
  nunjucks.configure(
    path.join(__dirname, 'views'), {
      autoescape: true,
      express: app,
    }
  );

  app.engine('html', nunjucks.render);
  app.set('view engine', 'html');


  const {authorization, decision, token} = await OAuth(app);

  app
  .route('/authorize')
  .get(Authorize, authorization)
  .post(Authorize, decision);

  app
  .route('/token')
  .post(ClientAuthenticated, token);

  app.get('/', async (_, res) => res.redirect('/authorize'));
  
  app.listen(env.oauth.port, () => {
    console.log('OAuth provider is running on port ' + env.oauth.port);
  });

})();