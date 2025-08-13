# El Frijolito Setup Instructions

Follow these steps to set up the admin dashboard and sign in for the first time.

## Prerequisites

1. **Node.js** (v18 or higher)
2. **PostgreSQL** database running locally or remotely
3. **Git** (for cloning the repository)

## Step 1: Database Setup

### Option A: Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a new database:
   ```sql
   CREATE DATABASE el_frijolito_db;
   ```

### Option B: Cloud Database (Recommended)
- Use **Neon**, **Supabase**, or **Railway** for a free PostgreSQL database
- Copy the connection string they provide

## Step 2: Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and update these values:
   ```bash
   # Replace with your actual database URL
   DATABASE_URL="postgresql://username:password@localhost:5432/el_frijolito_db?schema=public"
   
   # Generate a random secret (use: openssl rand -base64 32)
   NEXTAUTH_SECRET="your-super-secret-key-here"
   
   # Your domain (use localhost:3000 for development)
   NEXTAUTH_URL=http://localhost:3000
   ```

## Step 3: Install Dependencies & Generate Database

```bash
# Install all dependencies
npm install

# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Optional: Open Prisma Studio to view your database
npx prisma studio
```

## Step 4: Create Admin User

Run the interactive setup script:

```bash
npm run setup:admin
```

This will prompt you for:
- **Full Name**: Your display name
- **Email**: Your login email
- **Password**: Secure password (min 8 characters)

The script will create:
- ✅ Super Admin user account
- ✅ Default restaurant information
- ✅ Default SEO settings

## Step 5: Start the Application

```bash
npm run dev
```

The application will be available at:
- **Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login

## Step 6: Sign In to Admin Dashboard

1. Go to http://localhost:3000/admin/login
2. Enter the email and password you created in Step 4
3. You'll be redirected to the admin dashboard

## Default Admin Credentials (if you need them)

If you want to create a quick test admin, you can run this in Prisma Studio or directly in your database:

```sql
-- Password is "admin123" (hashed)
INSERT INTO users (id, email, password, name, role, "isActive", "createdAt", "updatedAt") 
VALUES (
  'cltest123', 
  'admin@elfrijolito.com', 
  '$2a$12$LQv3c1yqBFP/oVdxFxNgQOKqf1.5vvQLyWPeKmvh2+ZrYmJ4Zx.lO', 
  'Test Admin', 
  'SUPER_ADMIN', 
  true, 
  NOW(), 
  NOW()
);
```

## Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check firewall settings for remote databases

### Authentication Issues
- Make sure `NEXTAUTH_SECRET` is set in `.env`
- Verify `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

### Permission Errors
- Ensure your database user has CREATE privileges
- Run `npx prisma migrate reset` to reset the database if needed

## Next Steps

Once logged in, you can:
1. **Update Restaurant Info** - Edit contact details, hours, location
2. **Manage Menu** - Add categories and menu items
3. **Upload Images** - Add photos for menu items and branding
4. **Customize Homepage** - Edit all website content
5. **SEO Settings** - Optimize for search engines

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npx prisma generate     # Generate client after schema changes
npx prisma migrate dev  # Apply database migrations
npx prisma studio       # Open database GUI
npx prisma migrate reset # Reset database (careful!)

# Admin Setup
npm run setup:admin     # Create admin user (interactive)
```

## Security Notes

- **Change default passwords** in production
- **Use strong NEXTAUTH_SECRET** (32+ random characters)
- **Enable HTTPS** in production
- **Backup your database** regularly
- **Update dependencies** regularly for security patches

Need help? Check the documentation in `CLAUDE.md` or create an issue in the repository.