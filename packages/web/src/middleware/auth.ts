import {Request} from '../types';

const middleware = (req:Request, res, next) => {
  next();
}

export default middleware;