import 'reflect-metadata';
import 'appendix';

import express from 'express';
import env from 'env';

(async () => {
  const app = express();


  // Configure
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  
  app.get('/', async (req, res) => res.send('hello world'));
  
  // DEBUG

  app.listen(env.api.port, () => {
    console.log('Api is running on port ' + env.api.port);
  });
})();