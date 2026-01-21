export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string
          id: string
          marketing_consent: boolean
          name: string
          profile_id: string
          updated_at: string
          ci: string | null
          verified_at: string | null
          subscription_status: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email: string
          id?: string
          marketing_consent?: boolean
          name: string
          profile_id: string
          updated_at?: string
          ci?: string | null
          verified_at?: string | null
          subscription_status?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          marketing_consent?: boolean
          name?: string
          profile_id?: string
          updated_at?: string
          ci?: string | null
          verified_at?: string | null
          subscription_status?: string | null
        }
      }
      health_checkups: {
        Row: {
          id: string
          user_id: string
          checkup_date: string
          raw_data: Json | null
          parsed_data: Json | null
          analysis_result: Json | null
          protocols: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          checkup_date: string
          raw_data?: Json | null
          parsed_data?: Json | null
          analysis_result?: Json | null
          protocols?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          checkup_date?: string
          raw_data?: Json | null
          parsed_data?: Json | null
          analysis_result?: Json | null
          protocols?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
