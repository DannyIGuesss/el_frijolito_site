/**
 * Admin Dashboard Overview Page
 * Main dashboard with statistics and quick actions
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Store,
  Menu,
  Image,
  Calendar,
  MessageSquare,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Edit,
} from 'lucide-react';

// Mock data - will be replaced with real API calls
interface DashboardStats {
  totalMenuItems: number;
  totalCategories: number;
  mediaAssets: number;
  pendingInquiries: number;
  cateringRequests: number;
  pageViews: number;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalMenuItems: 0,
    totalCategories: 0,
    mediaAssets: 0,
    pendingInquiries: 0,
    cateringRequests: 0,
    pageViews: 0,
  });

  const [recentActivity] = useState([
    { action: 'Menu item added', item: 'Tacos al Pastor', time: '2 hours ago' },
    { action: 'Contact inquiry', item: 'Wedding catering request', time: '4 hours ago' },
    { action: 'Image uploaded', item: 'Burrito photo', time: '6 hours ago' },
  ]);

  // Quick action cards
  const quickActions = [
    {
      title: 'Add Menu Item',
      description: 'Create a new dish for your menu',
      href: '/admin/menu/items/new',
      icon: Plus,
      color: 'bg-brand-forest-green',
    },
    {
      title: 'Update Restaurant Info',
      description: 'Edit contact details and hours',
      href: '/admin/restaurant',
      icon: Store,
      color: 'bg-brand-warm-orange',
    },
    {
      title: 'Manage Homepage',
      description: 'Customize your homepage content',
      href: '/admin/homepage',
      icon: Edit,
      color: 'bg-brand-chili-red',
    },
    {
      title: 'View Website',
      description: 'See your live website',
      href: '/',
      icon: Eye,
      color: 'bg-brand-golden-yellow',
      external: true,
    },
  ];

  const statCards = [
    {
      title: 'Menu Items',
      value: stats.totalMenuItems,
      href: '/admin/menu/items',
      icon: Menu,
      color: 'text-brand-forest-green',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      href: '/admin/menu/categories',
      icon: Menu,
      color: 'text-brand-warm-orange',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Media Files',
      value: stats.mediaAssets,
      href: '/admin/media',
      icon: Image,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Pending Inquiries',
      value: stats.pendingInquiries,
      href: '/admin/inquiries',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Catering Requests',
      value: stats.cateringRequests,
      href: '/admin/catering',
      icon: Calendar,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Page Views (Today)',
      value: stats.pageViews,
      href: '/admin/analytics',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session?.user?.name}! 👋
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here's what's happening with El Frijolito today.
        </p>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="group relative overflow-hidden rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow"
          >
            <div>
              <div className={`inline-flex p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-brand-forest-green transition-colors">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
            <div className="absolute top-6 right-6">
              <div className="text-gray-400 group-hover:text-brand-forest-green transition-colors">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              target={action.external ? '_blank' : '_self'}
              className="group relative rounded-lg p-6 bg-white shadow hover:shadow-md transition-shadow"
            >
              <div>
                <div className={`inline-flex p-3 rounded-lg ${action.color} text-white`}>
                  <action.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-base font-medium text-gray-900 group-hover:text-brand-forest-green transition-colors">
                  {action.title}
                  {action.external && (
                    <span className="ml-1 text-gray-400">↗</span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity and system status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-forest-green rounded-full mt-2" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/admin/activity"
              className="text-sm font-medium text-brand-forest-green hover:text-primary-600"
            >
              View all activity →
            </Link>
          </div>
        </div>

        {/* System status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Website Status</span>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Image Storage</span>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Ready
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Backup</span>
              <span className="text-sm text-gray-600">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}