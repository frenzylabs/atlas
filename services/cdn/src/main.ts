import 'reflect-metadata';
import 'appendix';

import fs, {promises as fsp} from 'fs';
import path from 'path';
import http from 'http';
import express from 'express';
import env from 'env';
import sass from 'node-sass';
import {Server as socket} from 'socket.io';
import {transpile} from 'typescript';

const STYLE_DIR = path.join(__dirname, 'styles');
const IMAGE_DIR = path.join(__dirname, 'images');
const SCRIPT_DIR = path.join(__dirname, 'scripts');
const BUILD_DIR = path.join(__dirname, env.cdn.buildDir);


if(!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR);
} else if(env.current === 'dev') {
  fs.rmSync(BUILD_DIR, {recursive: true});
  fs.mkdirSync(BUILD_DIR);
}

(async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/styles/:name', async (req, res) => {
    const {name} = req.params;
    const out = path.join(BUILD_DIR, name);

    if(env.current != 'dev' && fs.existsSync(out)) {
      res.sendFile(out);

      return;
    }

    const source = name.replace('.css', '.scss');
    
    const result = sass.renderSync({
      file: path.join(STYLE_DIR, source),
      includePaths: [
        path.resolve(__dirname, '../../../node_modules/thimblecss/scss'),
      ]
    });

    await fsp.writeFile(out, result.css.toString());

    
    res.sendFile(out);
  });

  app.get('/images/:name', async (req, res) => {
    const {name} = req.params;
    res.sendFile(path.join(IMAGE_DIR, name));
  });

  app.get('/scripts/:name', async (req, res) => {
    const {name} = req.params;
    const source = name.replace('.js', '.ts');
    const out = path.join(BUILD_DIR, name);
    const context = await fsp.readFile(path.join(SCRIPT_DIR, source), 'utf8');
    const compiled = transpile(context);

    await fsp.writeFile(out, compiled);
    
    res.sendFile(out);
  });


  app.get('/', async (req, res) => res.send("ok"));

  const server = http.createServer(app);

  server.listen(env.cdn.port, () => {
    console.log('CDN is running on port ' + env.cdn.port);
  });
})();