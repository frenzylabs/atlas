import Express from 'express';

interface Request extends Express.Request {
  logout:Function
  user:any
  errors?:any
}

export default Request;
