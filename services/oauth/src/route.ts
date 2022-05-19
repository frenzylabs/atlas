import express from 'express';
import oauth2orize from 'oauth2orize';
import {v4 as uuid} from 'uuid';
import Request from './request';


import {
  AuthClientProvider,
  AuthCodeProvider,
  AccessTokenProvider,
} from 'data';


const init = async (app:express.Application) => {
  const server = oauth2orize.createServer();

  server.serializeClient((client, done) => {
    return done(null, client.id);
  });

  server.deserializeClient(async (id, done) => {
    try {
      const result = await AuthClientProvider.get({id});
      
      return done(null, result);
    } catch(err) {
      return done(err);
    }
  });

  server.grant(oauth2orize.grant.code(async (client, redirect, account, _ares, done) => {

    const code = {
      account: account,
      client: client,
      redirectUri: redirect,
      key: uuid(),
    }

    try {
      const result = await AuthCodeProvider.save(code);

      return done(null, code.key);
    } catch(err) {
      return done(err);
    }
  }));


  server.exchange(oauth2orize.exchange.code(async (client, code, redirectUri, done) => {

    try {
      const authCode = await AuthCodeProvider.get({
        code,
        relation: {
          client: true,
          account: true,
        }
      });

      if (
        authCode === undefined
        || authCode.client.id !== client.id
        || authCode.redirectUri !== redirectUri
      ) { return done(null, false); }

      await AuthCodeProvider.revoke(code);

      const token = await AccessTokenProvider.save({
        key: uuid(),
        account: authCode.account,
        client: authCode.client,  
      });

      return done(null, token);

    } catch(err) {
      return done(err);
    }
  }));

  const authorization = [
    server.authorization(async (clientId, redirectUri, done) => {
      try {
        const client = await AuthClientProvider.find({id: clientId});

        if (client === undefined) { return done(null, false); }

        return done(null, client, redirectUri);
      } catch(err) {
        return done(err);
      }
    }),
    (req:Request, res) => 
      res.render("dialog.html",  {title: "Your App Name", transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client })
  ];

  return {
    authorization,
    decision: server.decision(),
    token: [
      server.token(),
      server.errorHandler(),
    ]
  }
}

export default init