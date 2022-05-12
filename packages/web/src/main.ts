import 'reflect-metadata';
import 'appendix';

import path from 'path';
import express from 'express';
import env from 'env';
import nunjucks from 'nunjucks';

import {
  User
} from './routes';

(async () => {
  const app = express();


  // Configure
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
  
  // DEBUG

  app.listen(env.web.port, () => {
    console.log('Web is running on port ' + env.web.port);
  });
})();