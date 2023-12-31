import { isValidObjectId } from 'mongoose';
import { ErrorTypes } from '../errors/catalog';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    return this._car.create(parsed.data);
  }

  public async delete(_id: string): Promise<ICar> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);

    const car = await this._car.delete(_id);

    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(_id: string): Promise<ICar> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);

    const car = await this._car.readOne(_id);

    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);

    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const car = await this._car.update(_id, parsed.data);
    
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }
}

export default CarService;
