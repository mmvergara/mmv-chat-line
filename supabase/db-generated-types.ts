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
          id: number
          message: string
          room_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          room_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          room_id?: string
          user_id?: string
        }
      }
      room_participants: {
        Row: {
          created_at: string
          id: number
          room_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          room_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          room_id?: string
          user_id?: string
        }
      }
      rooms: {
        Row: {
          created_at: string
          id: string
          name: string
          room_owner: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          room_owner: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          room_owner?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_room_participant: {
        Args: { cur_user_id: string; cur_room_id: string }
        Returns: boolean
      }
      room_exist: {
        Args: { roomid: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
