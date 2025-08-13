/**
 * TypeScript types for Supabase database
 * Generated based on our database schema
 */

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          name: string;
          role: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'STAFF';
          is_active: boolean;
          created_at: string;
          updated_at: string;
          last_login: string | null;
          login_attempts: number;
          lockout_until: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          name: string;
          role?: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'STAFF';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
          login_attempts?: number;
          lockout_until?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          name?: string;
          role?: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'STAFF';
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
          login_attempts?: number;
          lockout_until?: string | null;
        };
      };
      restaurants: {
        Row: {
          id: string;
          name: string;
          tagline: string;
          tagline_es: string | null;
          description: string;
          description_es: string | null;
          phone: string;
          email: string;
          website: string | null;
          street: string;
          city: string;
          state: string;
          zip_code: string;
          country: string;
          latitude: number | null;
          longitude: number | null;
          business_hours: any; // JSON
          facebook_url: string | null;
          instagram_url: string | null;
          twitter_url: string | null;
          yelp_url: string | null;
          google_url: string | null;
          logo_url: string | null;
          logo_storage_path: string | null;
          hero_image_url: string | null;
          hero_image_storage_path: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          tagline: string;
          tagline_es?: string | null;
          description: string;
          description_es?: string | null;
          phone: string;
          email: string;
          website?: string | null;
          street: string;
          city: string;
          state: string;
          zip_code: string;
          country?: string;
          latitude?: number | null;
          longitude?: number | null;
          business_hours?: any;
          facebook_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          yelp_url?: string | null;
          google_url?: string | null;
          logo_url?: string | null;
          logo_storage_path?: string | null;
          hero_image_url?: string | null;
          hero_image_storage_path?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          tagline?: string;
          tagline_es?: string | null;
          description?: string;
          description_es?: string | null;
          phone?: string;
          email?: string;
          website?: string | null;
          street?: string;
          city?: string;
          state?: string;
          zip_code?: string;
          country?: string;
          latitude?: number | null;
          longitude?: number | null;
          business_hours?: any;
          facebook_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          yelp_url?: string | null;
          google_url?: string | null;
          logo_url?: string | null;
          logo_storage_path?: string | null;
          hero_image_url?: string | null;
          hero_image_storage_path?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      menu_categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          name_es: string | null;
          description: string | null;
          description_es: string | null;
          display_order: number;
          is_active: boolean;
          icon_emoji: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          name_es?: string | null;
          description?: string | null;
          description_es?: string | null;
          display_order?: number;
          is_active?: boolean;
          icon_emoji?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          name_es?: string | null;
          description?: string | null;
          description_es?: string | null;
          display_order?: number;
          is_active?: boolean;
          icon_emoji?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          name: string;
          name_es: string | null;
          description: string;
          description_es: string | null;
          price: number;
          category_id: string;
          image_url: string | null;
          image_storage_path: string | null;
          gallery_images: any; // JSON array
          is_available: boolean;
          is_popular: boolean;
          is_featured: boolean;
          spice_level: 'MILD' | 'MEDIUM' | 'HOT' | 'EXTRA_HOT' | null;
          dietary_tags: string[];
          allergens: string[];
          ingredients: string[];
          ingredients_es: string[];
          calories: number | null;
          protein: number | null;
          carbs: number | null;
          fat: number | null;
          customizations: any; // JSON array
          display_order: number;
          prep_time: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_es?: string | null;
          description: string;
          description_es?: string | null;
          price: number;
          category_id: string;
          image_url?: string | null;
          image_storage_path?: string | null;
          gallery_images?: any;
          is_available?: boolean;
          is_popular?: boolean;
          is_featured?: boolean;
          spice_level?: 'MILD' | 'MEDIUM' | 'HOT' | 'EXTRA_HOT' | null;
          dietary_tags?: string[];
          allergens?: string[];
          ingredients?: string[];
          ingredients_es?: string[];
          calories?: number | null;
          protein?: number | null;
          carbs?: number | null;
          fat?: number | null;
          customizations?: any;
          display_order?: number;
          prep_time?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_es?: string | null;
          description?: string;
          description_es?: string | null;
          price?: number;
          category_id?: string;
          image_url?: string | null;
          image_storage_path?: string | null;
          gallery_images?: any;
          is_available?: boolean;
          is_popular?: boolean;
          is_featured?: boolean;
          spice_level?: 'MILD' | 'MEDIUM' | 'HOT' | 'EXTRA_HOT' | null;
          dietary_tags?: string[];
          allergens?: string[];
          ingredients?: string[];
          ingredients_es?: string[];
          calories?: number | null;
          protein?: number | null;
          carbs?: number | null;
          fat?: number | null;
          customizations?: any;
          display_order?: number;
          prep_time?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      homepage_sections: {
        Row: {
          id: string;
          section_key: string;
          title: string;
          title_es: string | null;
          subtitle: string | null;
          subtitle_es: string | null;
          content: any; // JSON
          image_url: string | null;
          image_storage_path: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_key: string;
          title: string;
          title_es?: string | null;
          subtitle?: string | null;
          subtitle_es?: string | null;
          content?: any;
          image_url?: string | null;
          image_storage_path?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_key?: string;
          title?: string;
          title_es?: string | null;
          subtitle?: string | null;
          subtitle_es?: string | null;
          content?: any;
          image_url?: string | null;
          image_storage_path?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      restaurant_highlights: {
        Row: {
          id: string;
          title: string;
          title_es: string | null;
          description: string;
          description_es: string | null;
          icon_emoji: string;
          image_url: string | null;
          image_storage_path: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          title_es?: string | null;
          description: string;
          description_es?: string | null;
          icon_emoji: string;
          image_url?: string | null;
          image_storage_path?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          title_es?: string | null;
          description?: string;
          description_es?: string | null;
          icon_emoji?: string;
          image_url?: string | null;
          image_storage_path?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      seo_settings: {
        Row: {
          id: string;
          page_key: string;
          title: string;
          description: string;
          keywords: string[];
          og_title: string | null;
          og_description: string | null;
          og_image_url: string | null;
          og_image_storage_path: string | null;
          twitter_title: string | null;
          twitter_description: string | null;
          twitter_image_url: string | null;
          twitter_image_storage_path: string | null;
          structured_data: any | null; // JSON
          custom_meta_tags: any; // JSON array
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          page_key: string;
          title: string;
          description: string;
          keywords?: string[];
          og_title?: string | null;
          og_description?: string | null;
          og_image_url?: string | null;
          og_image_storage_path?: string | null;
          twitter_title?: string | null;
          twitter_description?: string | null;
          twitter_image_url?: string | null;
          twitter_image_storage_path?: string | null;
          structured_data?: any | null;
          custom_meta_tags?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          page_key?: string;
          title?: string;
          description?: string;
          keywords?: string[];
          og_title?: string | null;
          og_description?: string | null;
          og_image_url?: string | null;
          og_image_storage_path?: string | null;
          twitter_title?: string | null;
          twitter_description?: string | null;
          twitter_image_url?: string | null;
          twitter_image_storage_path?: string | null;
          structured_data?: any | null;
          custom_meta_tags?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: string;
          value_type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
          description: string | null;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: string;
          value_type?: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
          description?: string | null;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string;
          value_type?: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
          description?: string | null;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      media_assets: {
        Row: {
          id: string;
          filename: string;
          original_name: string;
          mime_type: string;
          size_bytes: number;
          width: number | null;
          height: number | null;
          storage_path: string;
          public_url: string;
          alt_text: string | null;
          caption: string | null;
          tags: string[];
          category: 'GENERAL' | 'MENU_ITEMS' | 'RESTAURANT_PHOTOS' | 'HERO_IMAGES' | 'SOCIAL_MEDIA' | 'LOGOS';
          usage_count: number;
          last_used: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          filename: string;
          original_name: string;
          mime_type: string;
          size_bytes: number;
          width?: number | null;
          height?: number | null;
          storage_path: string;
          public_url: string;
          alt_text?: string | null;
          caption?: string | null;
          tags?: string[];
          category?: 'GENERAL' | 'MENU_ITEMS' | 'RESTAURANT_PHOTOS' | 'HERO_IMAGES' | 'SOCIAL_MEDIA' | 'LOGOS';
          usage_count?: number;
          last_used?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          filename?: string;
          original_name?: string;
          mime_type?: string;
          size_bytes?: number;
          width?: number | null;
          height?: number | null;
          storage_path?: string;
          public_url?: string;
          alt_text?: string | null;
          caption?: string | null;
          tags?: string[];
          category?: 'GENERAL' | 'MENU_ITEMS' | 'RESTAURANT_PHOTOS' | 'HERO_IMAGES' | 'SOCIAL_MEDIA' | 'LOGOS';
          usage_count?: number;
          last_used?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      catering_requests: {
        Row: {
          id: string;
          customer_name: string;
          email: string;
          phone: string;
          event_date: string;
          guest_count: number;
          event_type: string;
          message: string | null;
          status: 'PENDING' | 'REVIEWED' | 'QUOTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
          admin_notes: string | null;
          estimated_cost: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          email: string;
          phone: string;
          event_date: string;
          guest_count: number;
          event_type: string;
          message?: string | null;
          status?: 'PENDING' | 'REVIEWED' | 'QUOTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
          admin_notes?: string | null;
          estimated_cost?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_name?: string;
          email?: string;
          phone?: string;
          event_date?: string;
          guest_count?: number;
          event_type?: string;
          message?: string | null;
          status?: 'PENDING' | 'REVIEWED' | 'QUOTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
          admin_notes?: string | null;
          estimated_cost?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          source: string;
          status: 'NEW' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED';
          admin_notes: string | null;
          responded_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          source?: string;
          status?: 'NEW' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED';
          admin_notes?: string | null;
          responded_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          source?: string;
          status?: 'NEW' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED';
          admin_notes?: string | null;
          responded_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      page_views: {
        Row: {
          id: string;
          page: string;
          user_agent: string | null;
          ip_address: string | null;
          referrer: string | null;
          timestamp: string;
        };
        Insert: {
          id?: string;
          page: string;
          user_agent?: string | null;
          ip_address?: string | null;
          referrer?: string | null;
          timestamp?: string;
        };
        Update: {
          id?: string;
          page?: string;
          user_agent?: string | null;
          ip_address?: string | null;
          referrer?: string | null;
          timestamp?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}