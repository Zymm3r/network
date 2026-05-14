import { supabase } from '../supabase';

export type ApiError = {
  message: string;
  code?: string;
};

export async function handleSupabaseResponse<T>(
  response: { data: T | null; error: Error | null },
  operation: string
): Promise<T> {
  if (response.error) {
    console.error(`API Error during ${operation}:`, response.error);
    throw new Error(response.error.message);
  }

  if (!response.data) {
    throw new Error(`No data returned from ${operation}`);
  }

  return response.data;
}

export function createApiError(error: unknown, fallbackMessage: string): Error {
  if (error instanceof Error) return error;
  return new Error(fallbackMessage);
}

export { supabase };