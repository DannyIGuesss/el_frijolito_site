/**
 * Admin Dashboard Sidebar Navigation
 * Role-based navigation menu for different admin functions
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/types/auth';
import {
  Home,
  Menu,
  Settings,
  Image,
  Users,
  BarChart3,
  Store,
  Search,
  Calendar,
  MessageSquare,
  Globe,
  Shield,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: UserRole;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredRole?: UserRole;
  children?: NavItem[];
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose, userRole }) => {
  const pathname = usePathname();

  const navigation: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: Home,
    },
    {
      name: 'Restaurant Info',
      href: '/admin/restaurant',
      icon: Store,
    },
    {
      name: 'Menu Management',
      href: '/admin/menu',
      icon: Menu,
      children: [
        { name: 'Categories', href: '/admin/menu/categories', icon: Menu },
        { name: 'Menu Items', href: '/admin/menu/items', icon: Menu },
      ],
    },
    {
      name: 'Homepage Content',
      href: '/admin/homepage',
      icon: Globe,
    },
    {
      name: 'Media Library',
      href: '/admin/media',
      icon: Image,
    },
    {
      name: 'SEO Settings',
      href: '/admin/seo',
      icon: Search,
      requiredRole: 'ADMIN' as UserRole,
    },
    {
      name: 'Catering Requests',
      href: '/admin/catering',
      icon: Calendar,
    },
    {
      name: 'Contact Inquiries',
      href: '/admin/inquiries',
      icon: MessageSquare,
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      requiredRole: 'ADMIN' as UserRole,
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: Users,
      requiredRole: 'SUPER_ADMIN' as UserRole,
    },
    {
      name: 'Site Settings',
      href: '/admin/settings',
      icon: Settings,
      children: [
        { name: 'General', href: '/admin/settings/general', icon: Settings },
        { name: 'Security', href: '/admin/settings/security', icon: Shield, requiredRole: UserRole.SUPER_ADMIN },
      ],
    },
  ];

  const hasPermission = (requiredRole?: UserRole): boolean => {
    if (!requiredRole || !userRole) return true;
    
    const roleHierarchy = {
      'STAFF': 1,
      'MANAGER': 2,
      'ADMIN': 3,
      'SUPER_ADMIN': 4,
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  };

  const isActive = (href: string): boolean => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const renderNavItem = (item: NavItem, isChild = false) => {
    if (!hasPermission(item.requiredRole)) {
      return null;
    }

    const active = isActive(item.href);
    const baseClasses = `
      group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
      ${isChild ? 'pl-11' : ''}
    `;
    
    const activeClasses = active
      ? 'bg-brand-forest-green text-white'
      : 'text-gray-700 hover:text-brand-forest-green hover:bg-gray-100';

    return (
      <div key={item.href}>
        <Link
          href={item.href}
          className={`${baseClasses} ${activeClasses}`}
          onClick={onClose}
        >
          <item.icon
            className={`mr-3 h-5 w-5 flex-shrink-0 ${
              active ? 'text-white' : 'text-gray-400 group-hover:text-brand-forest-green'
            }`}
          />
          {item.name}
        </Link>
        
        {/* Render children if they exist and parent is active */}
        {item.children && isActive(item.href) && (
          <div className="mt-1 space-y-1">
            {item.children.map((child) => renderNavItem(child, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-forest-green rounded-full flex items-center justify-center text-white font-bold">
                🌱
              </div>
              <div>
                <h1 className="text-lg font-bold text-brand-forest-green">El Frijolito</h1>
                <p className="text-xs text-brand-warm-orange">Admin Panel</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>{renderNavItem(item)}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`lg:hidden ${isOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
            {/* Mobile header with close button */}
            <div className="flex h-16 shrink-0 items-center justify-between">
              <Link href="/admin" className="flex items-center space-x-2" onClick={onClose}>
                <div className="w-8 h-8 bg-brand-forest-green rounded-full flex items-center justify-center text-white font-bold">
                  🌱
                </div>
                <div>
                  <h1 className="text-lg font-bold text-brand-forest-green">El Frijolito</h1>
                  <p className="text-xs text-brand-warm-orange">Admin Panel</p>
                </div>
              </Link>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile navigation */}
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>{renderNavItem(item)}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;