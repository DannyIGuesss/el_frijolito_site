/**
 * Database connection and utilities for El Frijolito
 * Handles Prisma client initialization and connection management
 */

import { PrismaClient } from '../generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

/**
 * Graceful database connection handling
 */
export async function connectToDatabase() {
  try {
    await db.$connect();
    console.log('✅ Connected to database successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    return false;
  }
}

/**
 * Disconnect from database
 */
export async function disconnectFromDatabase() {
  try {
    await db.$disconnect();
    console.log('✅ Disconnected from database successfully');
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error);
  }
}

/**
 * Database health check
 */
export async function checkDatabaseHealth() {
  try {
    await db.$queryRaw`SELECT 1`;
    return { status: 'healthy', timestamp: new Date() };
  } catch (error) {
    return { 
      status: 'unhealthy', 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date() 
    };
  }
}

/**
 * Transaction helper for complex operations
 */
export const transaction = db.$transaction;

export default db;