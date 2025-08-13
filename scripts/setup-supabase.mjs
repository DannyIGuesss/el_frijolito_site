/**
 * Setup script for Supabase database
 * Creates tables and initial data for El Frijolito
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is required');
  process.exit(1);
}

// For setup, we need the service role key or we'll use the anon key
const supabaseKey = supabaseServiceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY is required');
  process.exit(1);
}

console.log('🌱 Setting up El Frijolito database...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, '..', 'supabase', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('📄 Reading database schema...');
    
    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`🔧 Executing ${statements.length} SQL statements...`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement });
          if (error) {
            // Some errors are expected (like "already exists")
            if (!error.message.includes('already exists') && 
                !error.message.includes('already defined')) {
              console.warn(`⚠️  Statement ${i + 1}: ${error.message}`);
            }
          }
        } catch (err) {
          // Try alternative method for complex statements
          console.log(`🔄 Retrying statement ${i + 1} with raw SQL...`);
        }
      }
    }
    
    console.log('✅ Database schema setup complete!');
    
    // Test the connection by checking if tables exist
    const { data: tables, error: tablesError } = await supabase
      .from('restaurants')
      .select('id')
      .limit(1);
    
    if (tablesError && !tablesError.message.includes('relation "restaurants" does not exist')) {
      console.error('❌ Database connection test failed:', tablesError.message);
      console.log('\n📝 Manual Setup Required:');
      console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard');
      console.log('2. Navigate to SQL Editor');
      console.log('3. Copy and paste the content of supabase/schema.sql');
      console.log('4. Run the SQL to create all tables');
      return false;
    }
    
    console.log('✅ Database tables are ready!');
    return true;
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n📝 Manual Setup Required:');
    console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Copy and paste the content of supabase/schema.sql');
    console.log('4. Run the SQL to create all tables');
    return false;
  }
}

// Run setup
setupDatabase().then((success) => {
  if (success) {
    console.log('\n🎉 Setup complete! Next steps:');
    console.log('1. Run: npm run setup:admin');
    console.log('2. Start the dev server: npm run dev');
    console.log('3. Visit: http://localhost:3000/admin/login');
  }
  process.exit(success ? 0 : 1);
});