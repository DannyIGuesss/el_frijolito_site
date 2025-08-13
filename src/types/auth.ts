/**
 * Authentication and authorization types
 * Extends NextAuth types for El Frijolito admin system
 */

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'STAFF';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole;
  }
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
}