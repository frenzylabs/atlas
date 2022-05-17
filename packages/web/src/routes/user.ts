import express from 'express';
import passport from 'passport';

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
  username: string().required().min(4).max(20),
}), async (req:Request, res) => {
  const {
    password_verify,
    password,
    email,
    username,
  } = req.body;

  let errors = req.errors || [];
  if (password !== password_verify) {
    errors.push('Passwords do not match');
  }

  if(errors.length === 0) {
    try {
      const account = await AccountProvider.save({
        password,
        email,
        username
      });

      if(!account) {
        errors.push("Unable to register account");
      }

    } catch(err) {
      errors.push(err.message);
    }
  }
  
  if(errors.length > 0) {
    res.render('register.html', {errors});
  } else {
    res.redirect('/users/login');
  }
});

router.get('/login', async (req, res) => {
  let errors = req.session['messages'] || null;

  res.render('login.html', {errors});
});

router.post(
  '/login', 
  passport.authenticate('local', {failureRedirect: '/users/login', failureMessage: 'Invalid login and/or password'}),
  async (req:Request, res) => {
    res.redirect('/app');
  }
);

export default router;