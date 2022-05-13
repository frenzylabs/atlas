import Express from 'express';

interface Request extends Express.Request {
  user:any
  errors?:any
}

export default Request;
