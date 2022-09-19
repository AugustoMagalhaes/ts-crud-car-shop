import chai from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CarModel from '../../../models/Car';
import { carMockBody, createdMockedCar, successRead, wrongCarMockBody, zodIssues } from '../../mocks/carMock';
const { expect } = chai;

describe('model create', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon
      .stub(carModel, 'create')
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
  const carModel = new CarModel();

  before(async () => {
    sinon
      .stub(carModel, 'read')
      .onCall(0).resolves(successRead)
  });

  after(()=>{
    sinon.restore();
  })

  it('retorna lista de carros', async () => {
    const allCars = await carModel.read();

    expect(allCars).to.deep.equal(successRead);
    expect(allCars).to.have.lengthOf(1)
  });


});