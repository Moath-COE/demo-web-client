export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      agent_sessions: {
        Row: {
          chapter_id: string | null
          course_id: string | null
          created_at: string
          duration_secs: number | null
          ended_at: string | null
          feedback: Json | null
          id: string
          language: string | null
          room_name: string
          started_at: string
          status: string
          user_id: string
        }
        Insert: {
          chapter_id?: string | null
          course_id?: string | null
          created_at?: string
          duration_secs?: number | null
          ended_at?: string | null
          feedback?: Json | null
          id?: string
          language?: string | null
          room_name: string
          started_at?: string
          status?: string
          user_id: string
        }
        Update: {
          chapter_id?: string | null
          course_id?: string | null
          created_at?: string
          duration_secs?: number | null
          ended_at?: string | null
          feedback?: Json | null
          id?: string
          language?: string | null
          room_name?: string
          started_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_sessions_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_agent_sessions_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          course_id: string | null
          created_at: string
          description: string | null
          id: string
          order_index: number | null
          pdf_url: string | null
          status: string | null
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number | null
          pdf_url?: string | null
          status?: string | null
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number | null
          pdf_url?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_majors: {
        Row: {
          course_id: string
          major_id: number
        }
        Insert: {
          course_id: string
          major_id: number
        }
        Update: {
          course_id?: string
          major_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_majors_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_majors_major_id_fkey"
            columns: ["major_id"]
            isOneToOne: false
            referencedRelation: "majors"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          institution_id: number | null
          level: string | null
          slug: string | null
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          institution_id?: number | null
          level?: string | null
          slug?: string | null
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          institution_id?: number | null
          level?: string | null
          slug?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_agent_usage: {
        Row: {
          total_minutes: number
          total_sessions: number
          updated_at: string
          usage_date: string
          user_id: string
        }
        Insert: {
          total_minutes?: number
          total_sessions?: number
          updated_at?: string
          usage_date?: string
          user_id: string
        }
        Update: {
          total_minutes?: number
          total_sessions?: number
          updated_at?: string
          usage_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_daily_agent_usage_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          course_id: string
          created_at: string
          is_active: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          is_active?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          is_active?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          created_at: string
          id: number
          image_url: string | null
          name: string
          slug: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: never
          image_url?: string | null
          name: string
          slug?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: never
          image_url?: string | null
          name?: string
          slug?: string | null
          type?: string | null
        }
        Relationships: []
      }
      majors: {
        Row: {
          created_at: string
          id: number
          image_url: string | null
          institution_id: number | null
          name: string
          slug: string | null
        }
        Insert: {
          created_at?: string
          id?: never
          image_url?: string | null
          institution_id?: number | null
          name: string
          slug?: string | null
        }
        Update: {
          created_at?: string
          id?: never
          image_url?: string | null
          institution_id?: number | null
          name?: string
          slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "majors_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      processed_webhook_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          room_name: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id: string
          room_name?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          room_name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          institution_id: number | null
          level: number | null
          major_id: number | null
          quota_tier_id: number
          status: string | null
        }
        Insert: {
          created_at?: string
          id: string
          institution_id?: number | null
          level?: number | null
          major_id?: number | null
          quota_tier_id?: number
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          institution_id?: number | null
          level?: number | null
          major_id?: number | null
          quota_tier_id?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_major_id_fkey"
            columns: ["major_id"]
            isOneToOne: false
            referencedRelation: "majors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_quota_tier_id_fkey"
            columns: ["quota_tier_id"]
            isOneToOne: false
            referencedRelation: "quota_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      quota_tiers: {
        Row: {
          created_at: string
          id: number
          max_daily_minutes: number
          max_daily_sessions: number
          max_session_minutes: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          max_daily_minutes: number
          max_daily_sessions: number
          max_session_minutes: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          max_daily_minutes?: number
          max_daily_sessions?: number
          max_session_minutes?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_daily_quota: {
        Args: { p_user_id: string }
        Returns: {
          allowed: boolean
          max_minutes: number
          max_sessions: number
          remaining_minutes: number
          remaining_sessions: number
          tier_name: string
          used_minutes: number
          used_sessions: number
        }[]
      }
      cleanup_old_daily_usage: { Args: never; Returns: undefined }
      cleanup_old_webhook_events: { Args: never; Returns: undefined }
      get_my_daily_quota: {
        Args: never
        Returns: {
          allowed: boolean
          max_minutes: number
          max_sessions: number
          remaining_minutes: number
          remaining_sessions: number
          tier_name: string
          used_minutes: number
          used_sessions: number
        }[]
      }
      get_unenrolled_courses: {
        Args: { check_user_id: string }
        Returns: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          institution_id: number | null
          level: string | null
          slug: string | null
          status: string | null
          title: string
        }[]
        SetofOptions: {
          from: "*"
          to: "courses"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      record_session_end: {
        Args: {
          p_ended_at?: string
          p_room_name: string
          p_status?: string
          p_user_id: string
        }
        Returns: undefined
      }
      record_webhook_event: {
        Args: { p_event_id: string; p_event_type: string; p_room_name?: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
