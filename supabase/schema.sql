-- El Frijolito Database Schema for Supabase
-- This script creates all necessary tables for the restaurant management system

-- Enable Row Level Security (RLS) by default
-- We'll configure specific policies for each table

-- ===== USERS TABLE (Admin Users) =====
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'ADMIN' CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Security fields
    last_login TIMESTAMP WITH TIME ZONE,
    login_attempts INTEGER DEFAULT 0,
    lockout_until TIMESTAMP WITH TIME ZONE
);

-- ===== RESTAURANTS TABLE (Restaurant Information) =====
CREATE TABLE IF NOT EXISTS restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    tagline_es TEXT,
    description TEXT NOT NULL,
    description_es TEXT,
    
    -- Contact Information
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    website TEXT,
    
    -- Address
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    country TEXT DEFAULT 'US',
    latitude DECIMAL,
    longitude DECIMAL,
    
    -- Business Hours (JSON)
    business_hours JSONB NOT NULL DEFAULT '{}',
    
    -- Social Media
    facebook_url TEXT,
    instagram_url TEXT,
    twitter_url TEXT,
    yelp_url TEXT,
    google_url TEXT,
    
    -- Brand Assets
    logo_url TEXT,
    logo_storage_path TEXT,
    hero_image_url TEXT,
    hero_image_storage_path TEXT,
    
    -- Settings
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===== MENU CATEGORIES TABLE =====
CREATE TABLE IF NOT EXISTS menu_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_es TEXT,
    description TEXT,
    description_es TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    icon_emoji TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===== MENU ITEMS TABLE =====
CREATE TABLE IF NOT EXISTS menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    name_es TEXT,
    description TEXT NOT NULL,
    description_es TEXT,
    price DECIMAL(10,2) NOT NULL,
    
    -- Category relationship
    category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
    
    -- Images
    image_url TEXT,
    image_storage_path TEXT,
    gallery_images JSONB DEFAULT '[]',
    
    -- Menu attributes
    is_available BOOLEAN DEFAULT true,
    is_popular BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    spice_level TEXT CHECK (spice_level IN ('MILD', 'MEDIUM', 'HOT', 'EXTRA_HOT')),
    
    -- Dietary information
    dietary_tags TEXT[] DEFAULT '{}',
    allergens TEXT[] DEFAULT '{}',
    ingredients TEXT[] DEFAULT '{}',
    ingredients_es TEXT[] DEFAULT '{}',
    
    -- Nutrition (optional)
    calories INTEGER,
    protein DECIMAL(5,2),
    carbs DECIMAL(5,2),
    fat DECIMAL(5,2),
    
    -- Customization options
    customizations JSONB DEFAULT '[]',
    
    -- Ordering
    display_order INTEGER DEFAULT 0,
    prep_time INTEGER, -- minutes
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===== HOMEPAGE SECTIONS TABLE =====
CREATE TABLE IF NOT EXISTS homepage_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    title_es TEXT,
    subtitle TEXT,
    subtitle_es TEXT,
    content JSONB NOT NULL DEFAULT '{}',
    
    -- Images
    image_url TEXT,
    image_storage_path TEXT,
    
    -- Display settings
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===== RESTAURANT HIGHLIGHTS TABLE =====
CREATE TABLE IF NOT EXISTS restaurant_highlights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    title_es TEXT,
    description TEXT NOT NULL,
    description_es TEXT,
    icon_emoji TEXT NOT NULL,
    image_url TEXT,
    image_storage_path TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===== SEO SETTINGS TABLE =====
CREATE TABLE IF NOT EXISTS seo_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    keywords TEXT[] DEFAULT '{}',
    og_title TEXT,
    og_description TEXT,
    og_image_url TEXT,
    og_image_storage_path TEXT,
    twitter_title TEXT,
    twitter_description TEXT,
    twitter_image_url TEXT,
    twitter_image_storage_path TEXT,
    
    -- Structured data
    structured_data JSONB,
    
    -- Custom meta tags
    custom_meta_tags JSONB DEFAULT '[]',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===== SITE SETTINGS TABLE =====
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    value_type TEXT DEFAULT 'STRING' CHECK (value_type IN ('STRING', 'NUMBER', 'BOOLEAN', 'JSON')),
    description TEXT,
    category TEXT DEFAULT 'general',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===== MEDIA ASSETS TABLE =====
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    width INTEGER,
    height INTEGER,
    
    -- Storage information
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    
    -- Metadata
    alt_text TEXT,
    caption TEXT,
    tags TEXT[] DEFAULT '{}',
    category TEXT DEFAULT 'GENERAL' CHECK (category IN ('GENERAL', 'MENU_ITEMS', 'RESTAURANT_PHOTOS', 'HERO_IMAGES', 'SOCIAL_MEDIA', 'LOGOS')),
    
    -- Usage tracking
    usage_count INTEGER DEFAULT 0,
    last_used TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===== CATERING REQUESTS TABLE =====
CREATE TABLE IF NOT EXISTS catering_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    guest_count INTEGER NOT NULL,
    event_type TEXT NOT NULL,
    message TEXT,
    
    -- Admin management
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'REVIEWED', 'QUOTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED')),
    admin_notes TEXT,
    estimated_cost DECIMAL(10,2),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===== CONTACT INQUIRIES TABLE =====
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    source TEXT DEFAULT 'contact_form',
    
    -- Admin management
    status TEXT DEFAULT 'NEW' CHECK (status IN ('NEW', 'IN_PROGRESS', 'RESPONDED', 'CLOSED')),
    admin_notes TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===== PAGE VIEWS TABLE (Analytics) =====
CREATE TABLE IF NOT EXISTS page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page TEXT NOT NULL,
    user_agent TEXT,
    ip_address INET,
    referrer TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===== INDEXES FOR PERFORMANCE =====
CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_is_available ON menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_is_popular ON menu_items(is_popular);
CREATE INDEX IF NOT EXISTS idx_menu_items_display_order ON menu_items(display_order);
CREATE INDEX IF NOT EXISTS idx_menu_categories_slug ON menu_categories(slug);
CREATE INDEX IF NOT EXISTS idx_menu_categories_display_order ON menu_categories(display_order);
CREATE INDEX IF NOT EXISTS idx_homepage_sections_section_key ON homepage_sections(section_key);
CREATE INDEX IF NOT EXISTS idx_seo_settings_page_key ON seo_settings(page_key);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_catering_requests_status ON catering_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views(page);
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);

-- ===== ROW LEVEL SECURITY POLICIES =====
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE catering_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations for authenticated users
-- In production, you'd want more granular policies based on user roles

-- Allow admin users to do everything
CREATE POLICY "Admin full access" ON users FOR ALL USING (true);
CREATE POLICY "Admin full access" ON restaurants FOR ALL USING (true);
CREATE POLICY "Admin full access" ON menu_categories FOR ALL USING (true);
CREATE POLICY "Admin full access" ON menu_items FOR ALL USING (true);
CREATE POLICY "Admin full access" ON homepage_sections FOR ALL USING (true);
CREATE POLICY "Admin full access" ON restaurant_highlights FOR ALL USING (true);
CREATE POLICY "Admin full access" ON seo_settings FOR ALL USING (true);
CREATE POLICY "Admin full access" ON site_settings FOR ALL USING (true);
CREATE POLICY "Admin full access" ON media_assets FOR ALL USING (true);
CREATE POLICY "Admin full access" ON catering_requests FOR ALL USING (true);
CREATE POLICY "Admin full access" ON contact_inquiries FOR ALL USING (true);
CREATE POLICY "Admin full access" ON page_views FOR ALL USING (true);

-- Allow public read access to restaurant data (for the website)
CREATE POLICY "Public read access" ON restaurants FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON menu_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON menu_items FOR SELECT USING (is_available = true);
CREATE POLICY "Public read access" ON homepage_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON restaurant_highlights FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON seo_settings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON media_assets FOR SELECT USING (true);

-- Allow public insert for contact forms and catering requests
CREATE POLICY "Public insert" ON catering_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert" ON page_views FOR INSERT WITH CHECK (true);

-- ===== FUNCTIONS =====
-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update updated_at automatically
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_menu_categories_updated_at BEFORE UPDATE ON menu_categories FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_homepage_sections_updated_at BEFORE UPDATE ON homepage_sections FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_restaurant_highlights_updated_at BEFORE UPDATE ON restaurant_highlights FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_seo_settings_updated_at BEFORE UPDATE ON seo_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_media_assets_updated_at BEFORE UPDATE ON media_assets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_catering_requests_updated_at BEFORE UPDATE ON catering_requests FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_contact_inquiries_updated_at BEFORE UPDATE ON contact_inquiries FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();