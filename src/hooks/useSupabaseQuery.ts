import { useState } from 'react';
import { SupabaseResponse } from "@/types/supabase";
import useToast from './useToast';

export const useSupabaseQuery = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const executeQuery = async (query: () => Promise<SupabaseResponse<T>>) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: responseData, error: responseError } = await query();

      if (responseError) throw responseError;
      
      setData(responseData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      useToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    executeQuery
  };
};