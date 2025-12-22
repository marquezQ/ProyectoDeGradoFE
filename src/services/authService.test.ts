import { describe, it, expect, beforeEach, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstace } from './axiosInstace';
import { login, register, getUserData, getUser, getReviewsByUserId, updateUser } from './api';

// Crear mock de axios
const mock = new MockAdapter(axiosInstace);

describe('Auth Service', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    mock.reset();
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('debería hacer login exitosamente', async () => {
      const mockResponse = {
        token: 'fake-token-123',
        user: { id: 1, email: 'test@test.com' }
      };

      mock.onPost('/login').reply(200, mockResponse);

      const result = await login('test@test.com', 'password123');

      expect(result).toEqual(mockResponse);
      expect(mock.history.post[0].data).toBe(JSON.stringify({
        email: 'test@test.com',
        password: 'password123'
      }));
    });

    it('debería lanzar error cuando falla el login', async () => {
      mock.onPost('/login').reply(401, { message: 'Credenciales inválidas' });

      await expect(login('wrong@test.com', 'wrongpass')).rejects.toThrow();
    });
  });

  describe('register', () => {
    it('debería registrar un usuario exitosamente', async () => {
      const newUser = {
        nombre: 'Test User',
        email: 'test@test.com',
        password: 'password123'
      };

      const mockResponse = {
        message: 'Usuario registrado',
        user: { id: 1, ...newUser }
      };

      mock.onPost('/register').reply(201, mockResponse);

      const result = await register(newUser);

      expect(result).toEqual(mockResponse);
    });

    it('debería lanzar error cuando el registro falla', async () => {
      mock.onPost('/register').reply(400, { message: 'Email ya existe' });

      await expect(register({ email: 'existing@test.com' })).rejects.toThrow();
    });
  });

  describe('getUserData', () => {
    it('debería obtener datos del usuario autenticado', async () => {
      const mockUser = {
        id: 1,
        nombre: 'Test User',
        email: 'test@test.com'
      };

      mock.onGet('/user').reply(200, mockUser);

      const result = await getUserData();

      expect(result).toEqual(mockUser);
    });
  });

  describe('getUser', () => {
    it('debería obtener un usuario por ID', async () => {
      const mockUser = {
        id: '123',
        nombre: 'Test User',
        email: 'test@test.com'
      };

      mock.onGet('/user/123').reply(200, { datos: mockUser });

      const result = await getUser('123');

      expect(result).toEqual(mockUser);
    });

    it('debería lanzar error cuando no encuentra el usuario', async () => {
      mock.onGet('/user/999').reply(404, { message: 'Usuario no encontrado' });

      await expect(getUser('999')).rejects.toThrow();
    });
  });

  describe('getReviewsByUserId', () => {
    it('debería obtener reseñas de un usuario', async () => {
      const mockReviews = [
        { id: 1, comentario: 'Excelente trabajo', calificacion: 5 },
        { id: 2, comentario: 'Muy bueno', calificacion: 4 }
      ];

      mock.onGet('/resenia/user/123').reply(200, { reseñas: mockReviews });

      const result = await getReviewsByUserId('123');

      expect(result).toEqual(mockReviews);
    });

    it('debería retornar undefined cuando hay un mensaje de error', async () => {
      mock.onGet('/resenia/user/123').reply(200, { message: 'Sin reseñas' });

      const result = await getReviewsByUserId('123');

      expect(result).toBeUndefined();
    });
  });

  describe('updateUser', () => {
    it('debería actualizar un usuario exitosamente', async () => {
      const updatedUser = {
        nombre: 'Updated Name',
        email: 'updated@test.com'
      };

      const mockResponse = {
        user: { id: '123', ...updatedUser }
      };

      mock.onPost('/user/123').reply(200, mockResponse);

      const result = await updateUser(updatedUser, '123');

      expect(result).toEqual(mockResponse.user);
    });
  });
});