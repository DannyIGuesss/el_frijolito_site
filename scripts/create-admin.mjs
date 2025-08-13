/**
 * Simple script to create admin user for El Frijolito
 * Run this after setting up database tables
 */

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function createAdmin() {
  console.log('🌱 Creating El Frijolito Admin User\n');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase configuration in .env file');
    process.exit(1);
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  try {
    // Test database connection
    const { data: test, error: testError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (testError) {
      console.error('❌ Database connection failed:', testError.message);
      console.log('\n📝 Please set up your database first:');
      console.log('1. Go to: https://supabase.com/dashboard/project/jpiaelizvevkrprikplh');
      console.log('2. Navigate to SQL Editor');
      console.log('3. Copy/paste the content from supabase/schema.sql');
      console.log('4. Run the SQL to create tables');
      process.exit(1);
    }
    
    // Default admin credentials
    const adminData = {
      name: 'Admin User',
      email: 'admin@elfrijolito.com',
      password: 'admin123',
      role: 'SUPER_ADMIN'
    };
    
    // Hash password
    const passwordHash = await bcrypt.hash(adminData.password, 12);
    
    // Create admin user
    const { data: admin, error: insertError } = await supabase
      .from('users')
      .insert({
        name: adminData.name,
        email: adminData.email,
        password_hash: passwordHash,
        role: adminData.role,
        is_active: true,
      })
      .select()
      .single();
    
    if (insertError) {
      if (insertError.message.includes('duplicate key')) {
        console.log('✅ Admin user already exists!');
        console.log('📧 Email: admin@elfrijolito.com');
        console.log('🔐 Password: admin123');
      } else {
        console.error('❌ Failed to create admin user:', insertError.message);
        process.exit(1);
      }
    } else {
      console.log('✅ Admin user created successfully!');
      console.log(`📧 Email: ${adminData.email}`);
      console.log(`🔐 Password: ${adminData.password}`);
      console.log(`👑 Role: ${adminData.role}`);
    }
    
    // Create default restaurant info
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('id')
      .limit(1);
    
    if (!restaurant || restaurant.length === 0) {
      const { error: insertRestaurantError } = await supabase
        .from('restaurants')
        .insert({
          name: 'El Frijolito',
          tagline: 'Authentic Mexican Cuisine',
          tagline_es: 'Auténtica Comida Mexicana',
          description: 'Experience authentic Mexican flavors with fresh ingredients, traditional family recipes, and warm hospitality that makes every meal special.',
          description_es: 'Experimenta los sabores auténticos de México con ingredientes frescos, recetas familiares tradicionales y hospitalidad cálida que hace que cada comida sea especial.',
          phone: '(123) 456-7890',
          email: 'info@elfrijolito.com',
          street: '123 Main Street',
          city: 'Anytown',
          state: 'ST',
          zip_code: '12345',
          country: 'US',
          business_hours: {
            monday: '11:00 AM - 9:00 PM',
            tuesday: '11:00 AM - 9:00 PM',
            wednesday: '11:00 AM - 9:00 PM',
            thursday: '11:00 AM - 9:00 PM',
            friday: '11:00 AM - 10:00 PM',
            saturday: '11:00 AM - 10:00 PM',
            sunday: '12:00 PM - 8:00 PM'
          }
        });
      
      if (!insertRestaurantError) {
        console.log('✅ Default restaurant info created');
      }
    }
    
    // Create default highlights
    const { data: highlights, error: highlightsSelectError } = await supabase
      .from('restaurant_highlights')
      .select('id')
      .limit(1);
    
    if (!highlights || highlights.length === 0) {
      const { error: highlightsError } = await supabase
        .from('restaurant_highlights')
        .insert([
          {
            title: 'Fresh Ingredients',
            description: 'We source the freshest local ingredients daily to ensure every dish is bursting with authentic Mexican flavors.',
            icon_emoji: '🥑',
            display_order: 1
          },
          {
            title: 'Family Traditions',
            description: 'Our recipes have been passed down through generations, bringing you the authentic taste of traditional Mexican cuisine.',
            icon_emoji: '👨‍👩‍👧‍👦',
            display_order: 2
          },
          {
            title: 'Warm Hospitality',
            description: 'Experience the warmth of Mexican hospitality in our family-friendly atmosphere where everyone is treated like familia.',
            icon_emoji: '❤️',
            display_order: 3
          }
        ]);
      
      if (!highlightsError) {
        console.log('✅ Default restaurant highlights created');
      }
    }
    
    console.log('\n🎉 Setup complete!');
    console.log('🌐 Admin Login: http://localhost:3000/admin/login');
    console.log('🏠 Website: http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

createAdmin();