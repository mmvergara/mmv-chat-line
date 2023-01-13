export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          id: string
          role: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          role: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          username?: string | null
        }
      }
      room_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          room_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at: string
          id: string
          message: string
          room_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          room_id?: string | null
          user_id?: string | null
        }
      }
      room_participants: {
        Row: {
          created_at: string
          id: string
          room_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at: string
          id: string
          room_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          room_id?: string | null
          user_id?: string | null
        }
      }
      rooms: {
        Row: {
          created_at: string
          id: string
          name: string
          password: string
        }
        Insert: {
          created_at: string
          id: string
          name: string
          password: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          password?: string
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
