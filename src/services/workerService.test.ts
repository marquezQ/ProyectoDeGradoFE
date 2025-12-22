import { describe, it, expect, beforeEach, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { axiosInstace } from './axiosInstace';
import {
  getWorkers,
  registerWorker,
  updateInfoWorker,
  isWorker,
  getWorkerData,
  addressWorker,
  getWorkerProducts,
  createProduct,
  deleteProduct,
  getReviewsByWorkerId,
  createReview,
  getContractsByWorkerId,
  createContract,
  deleteContract
} from './workerApi'

const mock = new MockAdapter(axiosInstace);
const axiosMock = new MockAdapter(axios);

describe('Worker Service', () => {
  beforeEach(() => {
    mock.reset();
    axiosMock.reset();
    vi.clearAllMocks();
  });

  describe('getWorkers', () => {
    it('debería obtener la lista de trabajadores', async () => {
      const mockWorkers = [
        { id: 1, nombre: 'Juan Perez', oficio: 'Carpintero' },
        { id: 2, nombre: 'Maria Garcia', oficio: 'Electricista' }
      ];

      mock.onGet('/trabajador').reply(200, { trabajadors: mockWorkers });

      const result = await getWorkers();

      expect(result).toEqual(mockWorkers);
    });

    it('debería lanzar error cuando falla la petición', async () => {
      mock.onGet('/trabajador').reply(500);

      await expect(getWorkers()).rejects.toThrow();
    });
  });

  describe('registerWorker', () => {
    it('debería registrar un trabajador exitosamente', async () => {
      const newWorker = {
        nombre: 'Pedro Lopez',
        oficio: 'Plomero',
        experiencia: 5
      };

      const mockResponse = {
        message: 'Trabajador registrado',
        trabajador: { id: 1, ...newWorker }
      };

      mock.onPost('/trabajador').reply(201, mockResponse);

      const result = await registerWorker(newWorker);

      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateInfoWorker', () => {
    it('debería actualizar información del trabajador', async () => {
      const updatedInfo = { experiencia: 7 };
      const mockResponse = { message: 'Actualizado', trabajador: updatedInfo };

      mock.onPatch('/trabajador/1/info').reply(200, mockResponse);

      const result = await updateInfoWorker(updatedInfo, '1');

      expect(result).toEqual(mockResponse);
    });
  });

  describe('isWorker', () => {
    it('debería verificar si un usuario es trabajador', async () => {
      const mockData = { esTrabajador: true, trabajadorId: 5 };

      mock.onGet('/userTrabajador/1').reply(200, mockData);

      const result = await isWorker(1);

      expect(result).toEqual(mockData);
    });

    it('debería retornar undefined si hay mensaje de error', async () => {
      mock.onGet('/userTrabajador/1').reply(200, { message: 'No es trabajador' });

      const result = await isWorker(1);

      expect(result).toBeUndefined();
    });
  });

  describe('getWorkerData', () => {
    it('debería obtener datos de un trabajador específico', async () => {
      const mockWorker = { id: '1', nombre: 'Juan', oficio: 'Carpintero' };

      mock.onGet('/trabajador/1').reply(200, { trabajador: mockWorker });

      const result = await getWorkerData('1');

      expect(result).toEqual(mockWorker);
    });
  });

  describe('addressWorker', () => {
    it('debería obtener dirección desde coordenadas', async () => {
      const mockAddress = {
        city: 'Cochabamba',
        country: 'Bolivia',
        road: 'Av. Heroinas'
      };

      axiosMock
        .onGet(/nominatim.openstreetmap.org/)
        .reply(200, { address: mockAddress });

      const result = await addressWorker('-17.3935', '-66.1570');

      expect(result).toEqual(mockAddress);
    });

    it('debería lanzar error cuando falla la geocodificación', async () => {
      axiosMock.onGet(/nominatim.openstreetmap.org/).reply(200, { error: 'No encontrado' });

      const result = await addressWorker('0', '0');

      expect(result).toBeUndefined();
    });
  });

  describe('getWorkerProducts', () => {
    it('debería obtener productos de un trabajador', async () => {
      const mockProducts = [
        { id: 1, nombre: 'Mesa', precio: 500 },
        { id: 2, nombre: 'Silla', precio: 200 }
      ];

      mock.onGet('/productos/1').reply(200, { products: mockProducts });

      const result = await getWorkerProducts('1');

      expect(result).toEqual(mockProducts);
    });
  });

  describe('createProduct', () => {
    it('debería crear un producto exitosamente', async () => {
      const newProduct = { nombre: 'Estante', precio: 800 };
      const mockResponse = { product: { id: 1, ...newProduct } };

      mock.onPost('/productos').reply(201, mockResponse);

      const result = await createProduct(newProduct);

      expect(result).toEqual(mockResponse.product);
    });
  });

  describe('deleteProduct', () => {
    it('debería eliminar un producto exitosamente', async () => {
      mock.onDelete('/productos/1').reply(200, { status: 200 });

      const result = await deleteProduct('1');

      expect(result).toBe(true);
    });

    it('debería retornar undefined si el status no es 200', async () => {
      mock.onDelete('/productos/1').reply(200, { status: 400 });

      const result = await deleteProduct('1');

      expect(result).toBeUndefined();
    });
  });

  describe('getReviewsByWorkerId', () => {
    it('debería obtener reseñas de un trabajador', async () => {
      const mockReviews = [
        { id: 1, comentario: 'Excelente', calificacion: 5 }
      ];

      mock.onGet('/resenia/trabajador/1').reply(200, { reseñas: mockReviews });

      const result = await getReviewsByWorkerId('1');

      expect(result).toEqual(mockReviews);
    });
  });

  describe('createReview', () => {
    it('debería crear una reseña exitosamente', async () => {
      const newReview = {
        trabajadorId: 1,
        comentario: 'Buen trabajo',
        calificacion: 4
      };
      const mockResponse = { reseña: { id: 1, ...newReview } };

      mock.onPost('/resenia').reply(201, mockResponse);

      const result = await createReview(newReview);

      expect(result).toEqual(mockResponse.reseña);
    });
  });

  describe('getContractsByWorkerId', () => {
    it('debería obtener contratos de un trabajador', async () => {
      const mockContracts = [
        { id: 1, descripcion: 'Hacer muebles', estado: 'pendiente' }
      ];

      mock.onGet('/contrato/1').reply(200, { contratos: mockContracts });

      const result = await getContractsByWorkerId('1');

      expect(result).toEqual(mockContracts);
    });
  });

  describe('createContract', () => {
    it('debería crear un contrato exitosamente', async () => {
      const newContract = {
        trabajadorId: 1,
        clienteId: 2,
        descripcion: 'Reparar puerta'
      };
      const mockResponse = {
        message: 'Contrato creado',
        contrato: { id: 1, ...newContract }
      };

      mock.onPost('/contrato').reply(201, mockResponse);

      const result = await createContract(newContract);

      expect(result).toEqual(mockResponse.contrato);
    });
  });

  describe('deleteContract', () => {
    it('debería eliminar un contrato exitosamente', async () => {
      mock.onDelete('/contrato/1').reply(200, { status: 200 });

      const result = await deleteContract('1');

      expect(result).toBe(true);
    });
  });
});