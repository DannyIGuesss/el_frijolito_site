/**
 * Setup script to create initial admin user for El Frijolito
 * Uses Supabase database
 */

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import readline from 'readline';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupAdmin() {
  console.log('🌱 El Frijolito Admin Setup\n');
  
  // Get Supabase configuration
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase configuration. Please check your .env file.');
    console.log('Required variables:');
    console.log('  NEXT_PUBLIC_SUPABASE_URL=' + (supabaseUrl ? '✅' : '❌'));
    console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY=' + (supabaseAnonKey ? '✅' : '❌'));
    process.exit(1);
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  try {
    // Check if any users exist
    const { data: existingUsers, error: userError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (userError && !userError.message.includes('relation "users" does not exist')) {
      console.error('❌ Database error:', userError.message);
      console.log('\n📝 Please run the database setup first:');
      console.log('npm run db:setup');
      process.exit(1);
    }
    
    if (existingUsers && existingUsers.length > 0) {
      console.log('⚠️  Admin users already exist in the database.');
      const overwrite = await question('Do you want to create another admin user? (y/N): ');
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('Setup cancelled.');
        process.exit(0);
      }
    }
    
    // Get admin details
    console.log('\nEnter details for the admin user:');
    const name = await question('Full Name: ');
    const email = await question('Email: ');
    const password = await question('Password (min 8 characters): ');
    
    if (password.length < 8) {
      console.log('❌ Password must be at least 8 characters long.');
      process.exit(1);
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Create admin user
    const { data: admin, error: insertError } = await supabase
      .from('users')
      .insert({
        name,
        email: email.toLowerCase(),
        password_hash: passwordHash,
        role: 'SUPER_ADMIN',
        is_active: true,
      })
      .select()
      .single();
    
    if (insertError) {
      console.error('❌ Failed to create admin user:', insertError.message);
      process.exit(1);
    }
    
    console.log('\n✅ Admin user created successfully!');
    console.log(`📧 Email: ${admin.email}`);
    console.log(`🔐 Password: ${password}`);
    console.log(`👑 Role: ${admin.role}\n`);
    
    // Create default restaurant info if it doesn't exist
    const { data: restaurantInfo, error: restaurantError } = await supabase
      .from('restaurants')
      .select('id')
      .limit(1);
    
    if (!restaurantInfo || restaurantInfo.length === 0) {
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
      
      if (insertRestaurantError) {
        console.warn('⚠️  Could not create default restaurant info:', insertRestaurantError.message);
      } else {
        console.log('✅ Default restaurant information created.');
      }
    }
    
    // Create default SEO settings
    const { data: seoSettings, error: seoError } = await supabase
      .from('seo_settings')
      .select('id')
      .limit(1);
    
    if (!seoSettings || seoSettings.length === 0) {
      const { error: insertSeoError } = await supabase
        .from('seo_settings')
        .insert([
          {
            page_key: 'home',
            title: 'El Frijolito - Authentic Mexican Restaurant',
            description: 'Experience authentic Mexican cuisine at El Frijolito. Fresh ingredients, traditional recipes, and warm hospitality in a family-friendly atmosphere.',
            keywords: ['Mexican restaurant', 'authentic Mexican food', 'tacos', 'burritos', 'family restaurant']
          },
          {
            page_key: 'menu',
            title: 'Menu - El Frijolito | Authentic Mexican Restaurant', 
            description: 'Explore our authentic Mexican menu featuring traditional tacos, burritos, enchiladas, and more. Fresh ingredients, family recipes, and bold flavors.',
            keywords: ['Mexican menu', 'tacos', 'burritos', 'enchiladas', 'quesadillas', 'authentic Mexican food']
          }
        ]);
      
      if (insertSeoError) {
        console.warn('⚠️  Could not create default SEO settings:', insertSeoError.message);
      } else {
        console.log('✅ Default SEO settings created.');
      }
    }
    
    // Create default restaurant highlights
    const { data: highlights, error: highlightsError } = await supabase
      .from('restaurant_highlights')
      .select('id')
      .limit(1);
    
    if (!highlights || highlights.length === 0) {
      const { error: insertHighlightsError } = await supabase
        .from('restaurant_highlights')
        .insert([
          {
            title: 'Fresh Ingredients',
            title_es: 'Ingredientes Frescos',
            description: 'We source the freshest local ingredients daily to ensure every dish is bursting with authentic Mexican flavors.',
            description_es: 'Obtenemos los ingredientes locales más frescos diariamente para asegurar que cada platillo esté lleno de sabores mexicanos auténticos.',
            icon_emoji: '🥑',
            display_order: 1
          },
          {
            title: 'Family Traditions',
            title_es: 'Tradiciones Familiares',
            description: 'Our recipes have been passed down through generations, bringing you the authentic taste of traditional Mexican cuisine.',
            description_es: 'Nuestras recetas han sido transmitidas por generaciones, trayéndote el sabor auténtico de la cocina tradicional mexicana.',
            icon_emoji: '👨‍👩‍👧‍👦',
            display_order: 2
          },
          {
            title: 'Warm Hospitality',
            title_es: 'Hospitalidad Cálida',
            description: 'Experience the warmth of Mexican hospitality in our family-friendly atmosphere where everyone is treated like familia.',
            description_es: 'Experimenta la calidez de la hospitalidad mexicana en nuestro ambiente familiar donde todos son tratados como familia.',
            icon_emoji: '❤️',
            display_order: 3
          }
        ]);
      
      if (insertHighlightsError) {
        console.warn('⚠️  Could not create default highlights:', insertHighlightsError.message);
      } else {
        console.log('✅ Default restaurant highlights created.');
      }
    }
    
    console.log('\n🎉 Setup complete! You can now sign in to the admin dashboard at:');
    console.log('   http://localhost:3000/admin/login\n');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

setupAdmin().catch(console.error);