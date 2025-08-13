/**
 * Admin Login Page
 * Secure authentication for restaurant admin access
 */

'use client';

import React, { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, AlertCircle, Lock } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (session) {
        router.push(from);
      }
    };
    checkAuth();
  }, [router, from]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password. Please try again.');
      } else if (result?.ok) {
        router.push(from);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-20 lg:py-12 bg-gradient-to-br from-brand-forest-green to-primary-700">
        <div className="text-white">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-brand-warm-orange rounded-full flex items-center justify-center text-white font-bold text-xl">
              🌱
            </div>
            <div>
              <h1 className="text-3xl font-bold">El Frijolito</h1>
              <p className="text-brand-golden-yellow">Restaurant Management</p>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold mb-6">
            Welcome Back
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Manage your restaurant with our comprehensive admin dashboard. 
            Control every aspect of your online presence.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-warm-orange rounded-full flex items-center justify-center">
                ✓
              </div>
              <span>Menu Management</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-warm-orange rounded-full flex items-center justify-center">
                ✓
              </div>
              <span>Content Customization</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-warm-orange rounded-full flex items-center justify-center">
                ✓
              </div>
              <span>Order Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-brand-forest-green rounded-full flex items-center justify-center text-white font-bold">
              🌱
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-forest-green">El Frijolito</h1>
              <p className="text-sm text-brand-warm-orange">Admin Panel</p>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Lock className="h-6 w-6 text-brand-forest-green" />
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Admin Sign In
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-8">
              Enter your credentials to access the admin dashboard
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Error message */}
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Authentication Error
                    </h3>
                    <p className="mt-1 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-forest-green sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-forest-green sm:text-sm sm:leading-6"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-brand-forest-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-forest-green disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Security note */}
          <div className="mt-8 p-4 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-600">
              <strong>Security Notice:</strong> This is a secure admin area. 
              All login attempts are logged and monitored. 
              If you're not authorized to access this system, please leave immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}