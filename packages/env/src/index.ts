import 'dotenv/config';


export default {
  current: process.env.NODE_ENV || 'dev',
  http: {
    host: process.env['HTTP_HOST'] || 'http://localhost',
    port: process.env['HTTP_PORT'] || 3000,
  },
  cdn: {
    port: process.env['CDN_PORT'] || 3001,
    path: process.env['CDN_PATH'] || '/static',
    buildDir: process.env['CDN_BUILD_DIR'] || '.build',
  },
  web: {
    port: process.env['WEB_PORT'] || 3002,
  }
}