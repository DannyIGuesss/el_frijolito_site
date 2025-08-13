/**
 * NextAuth.js configuration for El Frijolito admin authentication
 * Secure admin login with role-based access control using Supabase
 */

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'STAFF';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find user in Supabase database
          const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email.toLowerCase())
            .single();

          if (userError || !user) {
            return null;
          }

          // Check if user is active
          if (!user.is_active) {
            throw new Error('Account is deactivated');
          }

          // Check for account lockout
          if (user.lockout_until && new Date(user.lockout_until) > new Date()) {
            const remainingTime = Math.ceil((new Date(user.lockout_until).getTime() - Date.now()) / 60000);
            throw new Error(`Account locked. Try again in ${remainingTime} minutes.`);
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash);

          if (!isPasswordValid) {
            // Increment login attempts
            const attempts = user.login_attempts + 1;
            const lockoutUntil = attempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : null;

            await supabase
              .from('users')
              .update({
                login_attempts: attempts,
                lockout_until: lockoutUntil
              })
              .eq('id', user.id);

            return null;
          }

          // Reset login attempts and update last login
          await supabase
            .from('users')
            .update({
              login_attempts: 0,
              lockout_until: null,
              last_login: new Date().toISOString()
            })
            .eq('id', user.id);

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as UserRole,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours
  },
  jwt: {
    maxAge: 8 * 60 * 60, // 8 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Permission checking utilities
 */
export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roleHierarchy = {
    [UserRole.STAFF]: 1,
    [UserRole.MANAGER]: 2,
    [UserRole.ADMIN]: 3,
    [UserRole.SUPER_ADMIN]: 4,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

/**
 * Admin role checking
 */
export const isAdmin = (userRole: UserRole): boolean => {
  return userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN;
};

/**
 * Super admin checking
 */
export const isSuperAdmin = (userRole: UserRole): boolean => {
  return userRole === UserRole.SUPER_ADMIN;
};