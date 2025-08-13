/**
 * Admin Dashboard Header
 * Top navigation bar with user menu and mobile menu toggle
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Menu, Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { UserRole } from '@/types/auth';

interface AdminHeaderProps {
  onMenuClick: () => void;
  user?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick, user }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(0); // Will be dynamic later
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-purple-100 text-purple-800';
      case 'ADMIN':
        return 'bg-blue-100 text-blue-800';
      case 'MANAGER':
        return 'bg-green-100 text-green-800';
      case 'STAFF':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatRole = (role: UserRole) => {
    return role.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Left side - could add search bar here later */}
        <div className="flex flex-1 items-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Dashboard
          </h1>
        </div>

        {/* Right side - notifications and user menu */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              className="-m-1.5 flex items-center p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <div className="flex items-center gap-x-3">
                <div className="h-8 w-8 rounded-full bg-brand-forest-green flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div className="hidden lg:flex lg:flex-col lg:items-start">
                  <span className="text-sm font-semibold leading-6 text-gray-900">
                    {user?.name || 'Admin User'}
                  </span>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getRoleBadgeColor(user?.role || 'ADMIN' as UserRole)}`}>
                    {formatRole(user?.role || 'ADMIN' as UserRole)}
                  </span>
                </div>
                <ChevronDown className="hidden lg:block h-4 w-4 text-gray-400" />
              </div>
            </button>

            {/* User dropdown menu */}
            {userMenuOpen && (
              <div className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5">
                <div className="px-4 py-3 border-b border-gray-100 lg:hidden">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium mt-1 ${getRoleBadgeColor(user?.role || 'ADMIN' as UserRole)}`}>
                    {formatRole(user?.role || 'ADMIN' as UserRole)}
                  </span>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      router.push('/admin/profile');
                      setUserMenuOpen(false);
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="mr-3 h-4 w-4" />
                    Your Profile
                  </button>
                  
                  <button
                    onClick={() => {
                      router.push('/admin/settings');
                      setUserMenuOpen(false);
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </button>
                </div>
                
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;