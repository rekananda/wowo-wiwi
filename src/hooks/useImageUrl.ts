import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase/supabaseClient';

const BUCKET_NAME = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function to check if image exists in public folder
const checkPublicImage = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(`/${path}`, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

export function useImageUrl(path: string) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    let retryTimeoutId: NodeJS.Timeout;

    const getImageUrl = async (retryAttempt = 0) => {
      try {
        setIsLoading(true);

        // First check if image exists in public folder
        const existsInPublic = await checkPublicImage(path);
        if (existsInPublic) {
          if (mounted) {
            setImageUrl(`/${path}`);
            setError(null);
            setRetryCount(0);
            setIsLoading(false);
          }
          return;
        }

        // If not in public, try Supabase storage
        const { data } = await supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(path);

        if (mounted) {
          setImageUrl(data.publicUrl);
          setError(null);
          setRetryCount(0);
        }
      } catch (err) {
        // If we get an error and haven't exceeded max retries, try again
        if (retryAttempt < MAX_RETRIES) {
          if (mounted) {
            setRetryCount(prev => prev + 1);
            retryTimeoutId = setTimeout(() => {
              getImageUrl(retryAttempt + 1);
            }, RETRY_DELAY);
          }
          return;
        }

        if (mounted) {
          setError(err as Error);
          setImageUrl('');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    getImageUrl();

    return () => {
      mounted = false;
      if (retryTimeoutId) clearTimeout(retryTimeoutId);
    };
  }, [path]);

  return { imageUrl, error, retryCount, isLoading };
} 