import 'reflect-metadata';
import 'appendix';

import express from 'express';
import proxy from 'express-http-proxy';
import env from 'env';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

const CDN_HOST = [env.http.host, env.cdn.port].join(':');
const API_HOST = [env.http.host, env.api.port].join(':');
const OAUTH_HOST = [env.http.host, env.oauth.port].join(':');
const WEB_HOST = [env.http.host, env.web.port].join(':');

(async () => {
  const app = express();

  const reloadServer = livereload.createServer();
  reloadServer.server.once("connection", () => {
    setTimeout(() => {
      reloadServer.refresh("/");
    }, 60);
  });

  app.use(connectLivereload());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use('/' + env.cdn.path, proxy(CDN_HOST));
  app.use('/' + env.api.path, proxy(API_HOST));
  app.use('/' + env.oauth.path, proxy(OAUTH_HOST));
  app.use('/', proxy(WEB_HOST));

  app.listen(env.http.port, () => {
    const url = [env.http.host, env.http.port].join(':');

    console.log('Server is running at: ' + url);
    console.log('Web is at path: /');
    console.log('CDN is at path: /' + env.cdn.path);
    console.log('OAuth Provider is at path: /' + env.oauth.path);
    console.log('API is at path: /' + env.api.path);
  });
})();