import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase/supabaseClient';

const BUCKET_NAME = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export function useImageUrl(path: string) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    let retryTimeoutId: NodeJS.Timeout;

    const getPublicUrl = async (retryAttempt = 0) => {
      try {
        const { data } = await supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(path);

        if (mounted) {
          setImageUrl(data.publicUrl);
          setError(null);
          setRetryCount(0); // Reset retry count on success
        }
      } catch (err) {
        // If we get an error and haven't exceeded max retries, try again
        if (retryAttempt < MAX_RETRIES) {
          if (mounted) {
            setRetryCount(prev => prev + 1);
            retryTimeoutId = setTimeout(() => {
              getPublicUrl(retryAttempt + 1);
            }, RETRY_DELAY);
          }
          return;
        }

        if (mounted) {
          setError(err as Error);
          setImageUrl('');
        }
      }
    };

    getPublicUrl();

    return () => {
      mounted = false;
      if (retryTimeoutId) clearTimeout(retryTimeoutId);
    };
  }, [path]);

  return { imageUrl, error, retryCount };
} 