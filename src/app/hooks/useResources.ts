import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Resource, ResourceType } from '../types';

interface UseResourcesOptions {
  type?: ResourceType;
  limit?: number;
}

interface UseResourcesResult {
  resources: Resource[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useResources(options: UseResourcesOptions = {}): UseResourcesResult {
  const { type, limit = 50 } = options;

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchResources = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (type) {
        query = query.eq('resource_type', type);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.debug('[useResources] Permission denied or table not available');
        setResources([]);
      } else {
        setResources(data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch resources'));
      setResources([]);
    } finally {
      setLoading(false);
    }
  }, [type, limit]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return { resources, loading, error, refetch: fetchResources };
}

export function useResource(id: string) {
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchResource = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('resources')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;
        setResource(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch resource'));
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  return { resource, loading, error };
}