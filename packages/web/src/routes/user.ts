import express from 'express';

import {
  AccessProvider,
  RefreshProvider,
  AuthCodeProvider,
  AccountProvider,
  AuthClientProvider
} from 'engine';

import {Request} from '../types';
import {validate} from '../middleware';

import {
  string,
} from 'yup';

const router = express.Router();

router.get('/register', async (req, res) => {
  res.render('register.html');
});

router.post('/register', validate({
  password_verify: string().required().min(8).max(20),
  password: string().required().min(8).max(20),
  email: string().required().email(),
}), async (req:Request, res) => {
  const {
    password_verify,
    password,
    email
  } = req.body;

  let errors = req.errors || [];
  if (password !== password_verify) {
    errors.push('Passwords do not match');
  }

  res.render('register.html', {errors: req.errors});
});

router.get('/login', async (req, res) => {
  res.render('login.html');
});

export default router;