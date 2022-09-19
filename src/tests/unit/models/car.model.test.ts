import chai from 'chai';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ICar } from '../../../interfaces/ICar';
import CarModel from '../../../models/Car';
import MongoModel from '../../../models/MongoModel';
import { carMockBody, createdMockedCar, successDelete, successRead, updatedMockedCar, wrongCarMockBody, zodIssues } from '../../mocks/carMock';

const { expect } = chai;

describe('model create', () => {
  const carModel = new CarModel() as MongoModel<ICar>;

  before(async () => {
    sinon
      .stub(Model, 'create')
      .onCall(0).resolves(createdMockedCar)
      .onCall(1).throws(new ZodError(zodIssues as any));
  });

  after(()=>{
    sinon.restore();
  })

  it('cria carro com sucesso', async () => {
    const createdCar = await carModel.create(carMockBody);

    expect(createdCar).to.deep.equal(createdMockedCar);
  });

  it('retorna erro quando falta chave do body', async () => {
    try {
      await carModel.create(wrongCarMockBody as any);
    } catch (err: any) {
      expect(err).to.be.instanceOf(ZodError);
      err instanceof ZodError && expect(err.issues).to.have.lengthOf(1);
    }

  })

});

describe('model read', () => {
  const carModel = new CarModel() as MongoModel<ICar>;

  before(async () => {
    sinon
      .stub(Model, 'find')
      .onCall(0).resolves([successRead])
  });

  after(()=>{
    sinon.restore();
  })

  it('retorna lista de carros', async () => {
    const allCars = await carModel.read();

    expect(allCars).to.deep.equal([successRead]);
    expect(allCars).to.have.lengthOf(1)
  });
});

describe('model readOne', () => {
  const carModel = new CarModel() as MongoModel<ICar>;

  before(async () => {
    sinon
      .stub(Model, 'findOne')
      .onCall(0).resolves(successRead)
      .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  it('retorna carro especifico', async () => {
    const oneCar = await carModel.readOne('63289ba352e43c5297a0f70e');

    expect(oneCar).to.deep.equal(successRead);
  });

  it('retorna erro quando não encontra o id', async () => {
    try {
      await carModel.readOne('123456789012345678901234')
    } catch (err: any) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal('EntityNotFound');
    }
  })
});

describe('model delete', () => {
  const carModel = new CarModel() as MongoModel<ICar>;

  before(async () => {
    sinon
      .stub(Model, 'findOneAndDelete')
      .onCall(0).resolves(successDelete)
  });

  after(()=>{
    sinon.restore();
  })

  it('retorna carro deletado', async () => {
    const deletedCar = await carModel.delete('63289ba352e43c5297a0f70e');

    expect(deletedCar).to.deep.equal(successRead);
  });
});

describe('model update', () => {
  const carModel = new CarModel() as MongoModel<ICar>;

  before(async () => {
    sinon
      .stub(Model, 'findOneAndUpdate')
      .onCall(0).resolves(updatedMockedCar)
  });

  after(()=>{
    sinon.restore();
  })

  it('retorna carro atualizado', async () => {
    const updatedCar = await carModel.update('63289ba352e43c5297a0f70e', updatedMockedCar);

    expect(updatedCar).to.deep.equal(updatedMockedCar);
  });
});

