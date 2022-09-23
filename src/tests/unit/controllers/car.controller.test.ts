import chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CarController from '../../../controllers/Car';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import {
  createdMockedCar,
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
    sinon.stub(carService, 'create').onCall(0).resolves(createdMockedCar);
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

describe('controller read', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(carService, 'read').onCall(0).resolves([successRead]);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  it('lê carro com sucesso', async () => {
    await carController.read(req, res);
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith([successRead])).to.be.true;
  });
});

describe('controller readOne', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  req.params = { id: successRead._id };

  before(async () => {
    sinon.stub(carService, 'readOne').onCall(0).resolves(successRead);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  it('lê carro específico com sucesso', async () => {
    await carController.readOne(req, res);
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(successRead)).to.be.true;
  });
});

describe('controller update', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  req.params = { id: updatedMockedCar._id };

  before(async () => {
    sinon.stub(carService, 'update').onCall(0).resolves(updatedMockedCar);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  it('atualiza carro com sucesso', async () => {
    await carController.update(req, res);
    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(updatedMockedCar)).to.be.true;
  });
});

describe('controller delete', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  req.params = { id: updatedMockedCar._id };

  before(async () => {
    sinon.stub(carService, 'delete').onCall(0).resolves(successDelete);
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  it('deleta carro com sucesso', async () => {
    await carController.delete(req, res);
    expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    expect((res.send as sinon.SinonStub).calledWith()).to.be.true;
  });
});
