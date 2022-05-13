import express from 'express';
import ReactDOMServer from 'react-dom/server';
import App from '../../app';

const router = express.Router();

router.get('/', async (req, res) => {
  const app = ReactDOMServer.renderToString(App());

  res.render('app/index.html', {app});
})

export default router;