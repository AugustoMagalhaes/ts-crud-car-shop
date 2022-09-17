import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  private _service: IService<ICar>;

  constructor(service: IService<ICar>) {
    this._service = service;
  }

  public async create(req: Request, res: Response<ICar>) {
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;
    const car = { model, year, color, status, buyValue, doorsQty, seatsQty };
    
    const created = await this._service.create(car);

    return res.status(201).json(created);
  }

  public async read(_req: Request, res:Response<ICar[]>) {
    const cars = await this._service.read();
    return res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const car = await this._service.readOne(id);
    
    return res.status(200).json(car);
  }

  public async update(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    console.log('id', id);
    const updatedCar = await this._service.update(id, req.body);
    
    return res.status(200).json(updatedCar);
  }
}

export default CarController;