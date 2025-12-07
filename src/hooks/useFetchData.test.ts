import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useFetchData from './useFetchData';

describe('useFetchData Hook', () => {
  it('debería cargar datos exitosamente', async () => {
    const mockData = { id: 1, nombre: 'Test' };
    const mockApiFunction = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => 
      useFetchData({ apiFunction: mockApiFunction })
    );

    // Estado inicial
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);

    // Esperar a que termine de cargar
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(mockApiFunction).toHaveBeenCalledTimes(1);
  });

  it('debería manejar errores correctamente', async () => {
    const mockError = new Error('API Error');
    const mockApiFunction = vi.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() =>
      useFetchData({ apiFunction: mockApiFunction })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBe(null);
  });

  it('debería poder refetch los datos', async () => {
    const mockData1 = { id: 1, nombre: 'Test 1' };
    const mockData2 = { id: 2, nombre: 'Test 2' };
    const mockApiFunction = vi
      .fn()
      .mockResolvedValueOnce(mockData1)
      .mockResolvedValueOnce(mockData2);

    const { result } = renderHook(() =>
      useFetchData({ apiFunction: mockApiFunction })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData1);

    // Llamar a fetchData de nuevo
    result.current.fetchData();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData2);
    expect(mockApiFunction).toHaveBeenCalledTimes(2);
  });

  it('debería iniciar con loading en true', () => {
    const mockApiFunction = vi.fn().mockResolvedValue({});

    const { result } = renderHook(() =>
      useFetchData({ apiFunction: mockApiFunction })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });
});