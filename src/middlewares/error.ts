import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErrorTypes } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (err: Error | ZodError, _req, res, _next) => {
  if (err instanceof ZodError) {
    // console.log('zodError:', err);
    return res.status(400).json({ message: err.issues });
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, error } = mappedError;
    // console.error('mapedError:', err);
    return res.status(httpStatus).json({ error });
  }

  // console.error('uncaught Error:', err);
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;