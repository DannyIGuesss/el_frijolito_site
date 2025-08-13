# 🚀 Quick Start with Supabase

You're all set up with Supabase! Here's how to get your admin dashboard running:

## Step 1: Set up Database Tables

Go to your Supabase dashboard and run the schema:

1. **Visit**: https://supabase.com/dashboard/project/jpiaelizvevkrprikplh
2. **Go to**: SQL Editor (left sidebar)
3. **Copy & Paste** the entire content from `supabase/schema.sql`
4. **Click**: Run

This creates all the database tables you need.

## Step 2: Create Your Admin User

```bash
# Install dependencies if not done already
npm install

# Create admin account with default credentials
npm run setup:admin
```

This creates an admin user with:
- **Email**: `admin@elfrijolito.com`
- **Password**: `admin123`
- **Role**: Super Admin

## Step 3: Start the Application

```bash
npm run dev
```

## Step 4: Sign In

- **Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login

Use the email and password you created in Step 2!

---

## ✅ What's Working Now:

- ✅ **Supabase Database**: All tables created with proper relationships
- ✅ **Admin Authentication**: Secure login with roles and lockout protection  
- ✅ **Admin Dashboard**: Navigation, layout, and user management
- ✅ **Type Safety**: Full TypeScript support for database operations
- ✅ **Security**: Row Level Security (RLS) enabled on all tables

## 🎯 Next: Build Management Features

Once you're logged in, we can build:
1. **Restaurant Info Management** - Edit business details
2. **Menu Management** - Add categories and items
3. **Image Upload System** - Supabase Storage integration
4. **Homepage Customization** - Edit all website content

The foundation is solid - everything is now customizable through the admin dashboard!

## 🔧 Environment Variables

Your `.env` is configured with:
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public API key
- ✅ `DATABASE_URL` - PostgreSQL connection (not needed with Supabase client)
- ✅ `NEXTAUTH_SECRET` - For secure sessions

## 📊 View Your Data

**Supabase Dashboard**: https://supabase.com/dashboard/project/jpiaelizvevkrprikplh/editor

You can view all your restaurant data, users, menu items, etc. directly in the Supabase interface.