import chai from 'chai';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import {
  allIssues,
  carMockBody,
  createdMockedCar,
  successDelete,
  successRead,
  updatedMockedCar,
  wrongCarMockBody,
  zodIssues
} from '../../mocks/carMock';
const { expect } = chai;

describe('service create', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(Model, 'create')
      .onCall(0)
      .resolves(createdMockedCar)
      .onCall(1)
      .throws(new ZodError(zodIssues as any));
  });

  after(() => {
    sinon.restore();
  });

  it('cria carro com sucesso', async () => {
    const createdCar = await carService.create(carMockBody);

    expect(createdCar).to.deep.equal(createdMockedCar);
  });

  it('retorna erro quando falta chave do body', async () => {
    try {
      await carService.create(wrongCarMockBody as any);
    } catch (err: any) {
      expect(err).to.be.instanceOf(ZodError);
      err instanceof ZodError && expect(err.issues).to.have.lengthOf(1);
    }
  });
});

describe('service read', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(Model, 'find').onCall(0).resolves([successRead]);
  });

  after(() => {
    sinon.restore();
  });

  it('retorna lista de carros', async () => {
    const allCars = await carService.read();

    expect(allCars).to.deep.equal([successRead]);
    expect(allCars).to.have.lengthOf(1);
  });
});

describe('service readOne', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(Model, 'findOne')
      .onCall(0)
      .resolves(successRead)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .resolves(null)
  });

  after(() => {
    sinon.restore();
  });

  it('retorna carro especifico', async () => {
    const oneCar = await carService.readOne('63289ba352e43c5297a0f70e');

    expect(oneCar).to.deep.equal(successRead);
  });

  it('retorna erro esperado quando id não existe', async () => {
    try {
      await carService.readOne('123456789012345678901234');
    } catch (err: any) {
      expect(err).to.be.instanceOf(Error);
      expect(err).to.have.property('message', 'EntityNotFound');
    }
  });

    it('retorna erro esperado quando id é inválido de acordo com o mongo', async () => {
    try {
      await carService.readOne('123');
    } catch (err: any) {
      expect(err).to.be.instanceOf(Error);
      expect(err).to.have.property('message', 'InvalidMongoId');
    }
  });
});

describe('service delete', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(Model, 'findOneAndDelete')
      .onCall(0)
      .resolves(successDelete)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  it('retorna carro deletado', async () => {
    const deletedCar = await carService.delete('6328b6b0310efb1ae58bde72');

    expect(deletedCar).to.deep.equal(successRead);
  });

  it('retorna erro esperado quando não existe id a ser deletado', async () => {
    try {
      const deletedCar = await carService.delete('123456789012345678901234');
      return deletedCar;
    } catch (err: any) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal('EntityNotFound');
    }
  });

    it('retorna erro esperado quando id é inválido de acordo com o mongo', async () => {
    try {
      const deletedCar = await carService.delete('idNadaAVer');
      return deletedCar;
    } catch (err: any) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal('InvalidMongoId');
    }
  });
});

describe('service update', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(Model, 'findOneAndUpdate')
      .onCall(0)
      .resolves(updatedMockedCar)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .throws(new ZodError(allIssues as any))
      .onCall(3)
      .resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  it('retorna carro atualizado', async () => {
    const updatedCar = await carService.update('63289ba352e43c5297a0f70e', updatedMockedCar);

    expect(updatedCar).to.deep.equal(updatedMockedCar);
  });

  it('retorna o erro esperado ao tentar atualizar carro com id errado', async () => {
    try {
      await carService.update('123456789012345678901234', updatedMockedCar);
    } catch (err: any) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal('EntityNotFound');
    }
  });

  it('retorna o erro esperado ao tentar atualizar carro com objeto vazio', async () => {
    try {
      await carService.update('123456789012345678901234', {});
    } catch (err: any) {
      expect(err).to.be.instanceOf(ZodError);
      expect(err.issues).to.be.an('array');
      expect(err.issues).to.be.deep.equal(allIssues);
    }
  });

    it('retorna o erro esperado ao tentar atualizar carro com id mongo inválido', async () => {
    try {
      await carService.update('123', updatedMockedCar);
    } catch (err: any) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal('InvalidMongoId');
    }
  });
});
