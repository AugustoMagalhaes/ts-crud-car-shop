import chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CarController from '../../../controllers/Car';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import {
  allIssues, createdMockedCar,
  createdMockedCarBody,
  successDelete,
  successRead,
  updatedMockedCar,
  wrongCarMockBody
} from '../../mocks/carMock';
const { expect } = chai;

describe('controller create', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon
      .stub(carService, 'create')
      .onCall(0)
      .resolves(createdMockedCar)
/*       .onCall(1)
      .throws(new ZodError(zodIssues as any)); */
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

  });

  after(() => {
    sinon.restore();
  });

  it('cria carro com sucesso', async () => {
    req.body = createdMockedCarBody;
    await carController.create(req, res);

    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(createdMockedCar)).to.be.true;
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
    sinon.stub(carModel, 'read').onCall(0).resolves([successRead]);
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
      .stub(carModel, 'readOne')
      .onCall(0)
      .resolves(successRead)
      .onCall(1)
      .resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  it('retorna carro especifico', async () => {
    const oneCar = await carService.readOne('63289ba352e43c5297a0f70e');

    expect(oneCar).to.deep.equal(successRead);
  });

  it('retorna erro esperado', async () => {
    try {
      await carService.readOne('123456789012345678901234');
    } catch (err: any) {
      expect(err).to.be.instanceOf(Error);
      expect(err).to.have.property('message', 'EntityNotFound');
    }
  });
});

describe('service delete', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'delete')
      .onCall(0)
      .resolves(successDelete)
      .onCall(1)
      .resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  it('retorna carro deletado', async () => {
    const deletedCar = await carService.delete('63289ba352e43c5297a0f70e');

    expect(deletedCar).to.deep.equal(successRead);
  });

  it('retorna erro esperado quando não existe id a ser deletado', async () => {
    try {
      await carService.delete('12312313123213121111313131313');
    } catch (err: any) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal('EntityNotFound');
    }
  });
});

describe('service update', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'update')
      .onCall(0)
      .resolves(updatedMockedCar)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .throws(new ZodError(allIssues as any));
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
});
