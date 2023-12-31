import { Router } from 'express';
import CarController from '../controllers/Car';
import errorHandler from '../middlewares/error';
import CarModel from '../models/Car';
import CarService from '../services/Car';

const carRoute = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRoute.post('/', (req, res) => carController.create(req, res));
carRoute.get('/', (_req, res) => carController.read(_req, res));
carRoute.get('/:id', (req, res) => carController.readOne(req, res));
carRoute.put('/:id', (req, res) => carController.update(req, res));
carRoute.delete('/:id', (req, res) => carController.delete(req, res));

carRoute.use(errorHandler);

export default carRoute;