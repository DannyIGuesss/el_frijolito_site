/**
 * NextAuth.js configuration for El Frijolito admin authentication
 * Secure admin login with role-based access control
 */

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from './db';
import { UserRole } from '../generated/prisma';

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
          // Find user in database
          const user = await db.user.findUnique({
            where: { email: credentials.email.toLowerCase() }
          });

          if (!user) {
            return null;
          }

          // Check if user is active
          if (!user.isActive) {
            throw new Error('Account is deactivated');
          }

          // Check for account lockout
          if (user.lockoutUntil && user.lockoutUntil > new Date()) {
            const remainingTime = Math.ceil((user.lockoutUntil.getTime() - Date.now()) / 60000);
            throw new Error(`Account locked. Try again in ${remainingTime} minutes.`);
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            // Increment login attempts
            const attempts = user.loginAttempts + 1;
            const lockoutUntil = attempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null; // 15 min lockout

            await db.user.update({
              where: { id: user.id },
              data: {
                loginAttempts: attempts,
                lockoutUntil
              }
            });

            return null;
          }

          // Reset login attempts and update last login
          await db.user.update({
            where: { id: user.id },
            data: {
              loginAttempts: 0,
              lockoutUntil: null,
              lastLogin: new Date()
            }
          });

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
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