import express from 'express';
import 'express-async-errors';
import carRoute from './routes/Car.route';

const app = express();

app.use(express.json());

app.use('/cars', carRoute);

export default app;
