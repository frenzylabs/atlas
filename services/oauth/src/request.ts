import Express from 'express';

interface Request extends Express.Request {
  oauth2?:any
}

export default Request;
