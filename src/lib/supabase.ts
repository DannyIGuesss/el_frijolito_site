/**
 * Supabase client configuration for El Frijolito
 * Handles database operations and authentication
 */

import { createClient } from '@supabase/supabase-js';
import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client-side Supabase client
export const createClientComponentClient = () => {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
};

// Server-side Supabase client for Server Components
export const createServerComponentClient = () => {
  const cookieStore = cookies();
  
  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
};

// Server-side Supabase client for Route Handlers
export const createRouteHandlerClient = (request: Request) => {
  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          const cookies = request.headers.get('cookie');
          if (!cookies) return undefined;
          
          const cookie = cookies
            .split(';')
            .find(c => c.trim().startsWith(`${name}=`));
          
          return cookie ? cookie.split('=')[1] : undefined;
        },
        set(name: string, value: string, options: any) {
          // This will be handled by the response
        },
        remove(name: string, options: any) {
          // This will be handled by the response
        },
      },
    }
  );
};

// Simple client for server-side operations (without auth)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Database connection health check
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('id')
      .limit(1);
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist yet
      throw error;
    }
    
    return { status: 'healthy', timestamp: new Date() };
  } catch (error) {
    return { 
      status: 'unhealthy', 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date() 
    };
  }
}