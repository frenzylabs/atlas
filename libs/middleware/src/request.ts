import Express from 'express';

interface Request extends Express.Request {
  user:any
  errors?:any
  session:any
}

export default Request;
