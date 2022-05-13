import 'dotenv/config';


export default {
  current: process.env.NODE_ENV || 'dev',
  security: {
    session_secret: process.env['SESSION_SECRET'] || 'this-is-not-safe',
  },
  http: {
    host: process.env['HTTP_HOST'] || 'http://localhost',
    port: process.env['HTTP_PORT'] || 3000,
  },
  cdn: {
    port: process.env['CDN_PORT'] || 3001,
    path: process.env['CDN_PATH'] || '/static',
    buildDir: process.env['CDN_BUILD_DIR'] || '.build',
  },
  api: {
    port: process.env['API_PORT'] || 3002,
    path: process.env['API_PATH'] || '/api',
    buildDir: process.env['API_BUILD_DIR'] || '.build',
  },
  web: {
    port: process.env['WEB_PORT'] || 3003,
  },
  db: {
    host: process.env['DB_NAME'] || 'localhost',
    port: parseInt(process.env['DB_NAME'] || '5432'),
    user: process.env['DB_NAME'] || 'postgres',
    password: process.env['DB_NAME'] || 'postgres',
    name: process.env['DB_NAME'] || 'atlas',
  }
}