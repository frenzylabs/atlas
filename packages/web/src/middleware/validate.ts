import {object} from 'yup';
import {Request} from '../types';

const middleware = (schema) => {
  let validator = object(schema);

  return async (req:Request, res, next) => {
    try {
      await validator.validate(req.body);

      req.errors = null;
    } catch(err) {
      req.errors = err.errors;
    }

    next();
  }
}

export default middleware;