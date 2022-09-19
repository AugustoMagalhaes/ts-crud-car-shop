import { Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }
  public async read(): Promise<T[]> {
    return this._model.find();
  }
  public async update(_id: string, obj: T): Promise<T | null> {
    const filter = { _id };
    const update = { ...obj, $unset: { __v: '' } };
    const condition = { new: true };

    const updated = await this._model.findOneAndUpdate(filter, update, condition);

    return updated;
  }
  public async delete(_id: string): Promise<T | null> {
    return this._model.findOneAndDelete({ _id });
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async readOne(_id: string): Promise<T | null> {
    return this._model.findOne({ _id });
  }
}

export default MongoModel;
