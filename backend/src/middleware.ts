import { Request, Response } from 'express';
import Joi from 'joi';
import { HttpException } from './error';

const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: any
) => {
  if (!error.status) {
    error.status = 500;
  }
  res.status(error.status).json({ error: error.message });
};

const validate =
  (schema: Joi.ObjectSchema<any>) =>
  (req: Request, res: Response, next: any) => {
    const { value, error } = schema.validate(req.body, {
      stripUnknown: true,
    });

    if (error) {
      errorHandler(new HttpException(400, error.message), req, res, next);
    }

    req.body = value;
    next();
  };

export { errorHandler, validate };
