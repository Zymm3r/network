export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          created_at: string | null
          id: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificate_number: string | null
          certificate_url: string | null
          course_id: string | null
          id: string
          issued_at: string | null
          learning_path_id: string | null
          user_id: string | null
        }
        Insert: {
          certificate_number?: string | null
          certificate_url?: string | null
          course_id?: string | null
          id?: string
          issued_at?: string | null
          learning_path_id?: string | null
          user_id?: string | null
        }
        Update: {
          certificate_number?: string | null
          certificate_url?: string | null
          course_id?: string | null
          id?: string
          issued_at?: string | null
          learning_path_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      chunks: {
        Row: {
          chunk_index: number
          content: string
          created_at: string | null
          document_id: string | null
          id: string
          token_count: number | null
        }
        Insert: {
          chunk_index: number
          content: string
          created_at?: string | null
          document_id?: string | null
          id?: string
          token_count?: number | null
        }
        Update: {
          chunk_index?: number
          content?: string
          created_at?: string | null
          document_id?: string | null
          id?: string
          token_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chunks_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      content_chunks: {
        Row: {
          chunk_index: number | null
          content: string
          created_at: string | null
          id: string
          source_id: string | null
          source_type: string
        }
        Insert: {
          chunk_index?: number | null
          content: string
          created_at?: string | null
          id?: string
          source_id?: string | null
          source_type: string
        }
        Update: {
          chunk_index?: number | null
          content?: string
          created_at?: string | null
          id?: string
          source_id?: string | null
          source_type?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          availability: string | null
          created_at: string | null
          description_en: string | null
          description_th: string | null
          estimated_hours: number | null
          highlights: string[] | null
          id: string
          image_url: string | null
          includes: string[] | null
          level: string | null
          min_modules: number | null
          minutes_per_lesson: number | null
          modules_left: number | null
          name_en: string
          name_th: string
          prerequisites: string[] | null
          rating: number | null
          review_count: number | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          availability?: string | null
          created_at?: string | null
          description_en?: string | null
          description_th?: string | null
          estimated_hours?: number | null
          highlights?: string[] | null
          id: string
          image_url?: string | null
          includes?: string[] | null
          level?: string | null
          min_modules?: number | null
          minutes_per_lesson?: number | null
          modules_left?: number | null
          name_en: string
          name_th: string
          prerequisites?: string[] | null
          rating?: number | null
          review_count?: number | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          availability?: string | null
          created_at?: string | null
          description_en?: string | null
          description_th?: string | null
          estimated_hours?: number | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          includes?: string[] | null
          level?: string | null
          min_modules?: number | null
          minutes_per_lesson?: number | null
          modules_left?: number | null
          name_en?: string
          name_th?: string
          prerequisites?: string[] | null
          rating?: number | null
          review_count?: number | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      crawled_pages: {
        Row: {
          crawl_status: string | null
          crawled_at: string | null
          html_content: string | null
          id: string
          markdown_content: string | null
          title: string | null
          url: string
        }
        Insert: {
          crawl_status?: string | null
          crawled_at?: string | null
          html_content?: string | null
          id?: string
          markdown_content?: string | null
          title?: string | null
          url: string
        }
        Update: {
          crawl_status?: string | null
          crawled_at?: string | null
          html_content?: string | null
          id?: string
          markdown_content?: string | null
          title?: string | null
          url?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string | null
          document_type: string | null
          extension: string | null
          file_url: string | null
          id: string
          language: string | null
          markdown_content: string | null
          mime_type: string | null
          product_id: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          document_type?: string | null
          extension?: string | null
          file_url?: string | null
          id?: string
          language?: string | null
          markdown_content?: string | null
          mime_type?: string | null
          product_id?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          document_type?: string | null
          extension?: string | null
          file_url?: string | null
          id?: string
          language?: string | null
          markdown_content?: string | null
          mime_type?: string | null
          product_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      embeddings: {
        Row: {
          chunk_id: string | null
          created_at: string | null
          embedding: string | null
          id: string
        }
        Insert: {
          chunk_id?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
        }
        Update: {
          chunk_id?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "embeddings_chunk_id_fkey"
            columns: ["chunk_id"]
            isOneToOne: false
            referencedRelation: "content_chunks"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          completed_at: string | null
          course_id: string | null
          created_at: string | null
          enrolled_at: string | null
          id: string
          last_accessed_at: string | null
          progress_percentage: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          enrolled_at?: string | null
          id?: string
          last_accessed_at?: string | null
          progress_percentage?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          enrolled_at?: string | null
          id?: string
          last_accessed_at?: string | null
          progress_percentage?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_attempts: {
        Row: {
          attempts_count: number
          client_attempt_id: string
          course_id: string
          created_at: string
          error_message: string | null
          execution_time: number | null
          execution_timestamp: string
          exercise_id: string
          id: string
          lesson_id: string | null
          passed: boolean
          passed_tests: number | null
          score: number | null
          status: string | null
          stdout: string | null
          submitted_code: string | null
          total_tests: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts_count?: number
          client_attempt_id?: string
          course_id: string
          created_at?: string
          error_message?: string | null
          execution_time?: number | null
          execution_timestamp: string
          exercise_id: string
          id?: string
          lesson_id?: string | null
          passed: boolean
          passed_tests?: number | null
          score?: number | null
          status?: string | null
          stdout?: string | null
          submitted_code?: string | null
          total_tests?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts_count?: number
          client_attempt_id?: string
          course_id?: string
          created_at?: string
          error_message?: string | null
          execution_time?: number | null
          execution_timestamp?: string
          exercise_id?: string
          id?: string
          lesson_id?: string | null
          passed?: boolean
          passed_tests?: number | null
          score?: number | null
          status?: string | null
          stdout?: string | null
          submitted_code?: string | null
          total_tests?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_attempts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_attempts_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_progress: {
        Row: {
          answers: Json
          attempts: number
          checkpoint_data: Json
          completed_at: string | null
          course_id: string | null
          created_at: string
          exercise_id: string
          id: string
          last_activity_at: string
          lesson_id: string | null
          progress_percentage: number
          score: number | null
          started_at: string | null
          status: string
          time_spent_seconds: number
          updated_at: string
          user_id: string
        }
        Insert: {
          answers?: Json
          attempts?: number
          checkpoint_data?: Json
          completed_at?: string | null
          course_id?: string | null
          created_at?: string
          exercise_id: string
          id?: string
          last_activity_at?: string
          lesson_id?: string | null
          progress_percentage?: number
          score?: number | null
          started_at?: string | null
          status?: string
          time_spent_seconds?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json
          attempts?: number
          checkpoint_data?: Json
          completed_at?: string | null
          course_id?: string | null
          created_at?: string
          exercise_id?: string
          id?: string
          last_activity_at?: string
          lesson_id?: string | null
          progress_percentage?: number
          score?: number | null
          started_at?: string | null
          status?: string
          time_spent_seconds?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          product_id: string | null
          question: string
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          product_id?: string | null
          question: string
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          product_id?: string | null
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "faqs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          availability: string | null
          created_at: string | null
          description_en: string | null
          description_th: string | null
          duration: string | null
          estimated_hours: number | null
          frequency: string | null
          from_level: string | null
          id: string
          modules: string[] | null
          name_en: string
          name_th: string
          operator: string | null
          path_type: string | null
          price: number | null
          seats_left: number | null
          to_level: string | null
          updated_at: string | null
        }
        Insert: {
          availability?: string | null
          created_at?: string | null
          description_en?: string | null
          description_th?: string | null
          duration?: string | null
          estimated_hours?: number | null
          frequency?: string | null
          from_level?: string | null
          id: string
          modules?: string[] | null
          name_en: string
          name_th: string
          operator?: string | null
          path_type?: string | null
          price?: number | null
          seats_left?: number | null
          to_level?: string | null
          updated_at?: string | null
        }
        Update: {
          availability?: string | null
          created_at?: string | null
          description_en?: string | null
          description_th?: string | null
          duration?: string | null
          estimated_hours?: number | null
          frequency?: string | null
          from_level?: string | null
          id?: string
          modules?: string[] | null
          name_en?: string
          name_th?: string
          operator?: string | null
          path_type?: string | null
          price?: number | null
          seats_left?: number | null
          to_level?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          content_en: string | null
          content_th: string | null
          course_id: string | null
          created_at: string | null
          difficulty: string | null
          duration_minutes: number | null
          exercise_data: Json | null
          id: string
          lesson_type: string | null
          order_index: number | null
          quiz_data: Json | null
          thumbnail_url: string | null
          title_en: string
          title_th: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          content_en?: string | null
          content_th?: string | null
          course_id?: string | null
          created_at?: string | null
          difficulty?: string | null
          duration_minutes?: number | null
          exercise_data?: Json | null
          id: string
          lesson_type?: string | null
          order_index?: number | null
          quiz_data?: Json | null
          thumbnail_url?: string | null
          title_en: string
          title_th: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          content_en?: string | null
          content_th?: string | null
          course_id?: string | null
          created_at?: string | null
          difficulty?: string | null
          duration_minutes?: number | null
          exercise_data?: Json | null
          id?: string
          lesson_type?: string | null
          order_index?: number | null
          quiz_data?: Json | null
          thumbnail_url?: string | null
          title_en?: string
          title_th?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_exercises: {
        Row: {
          availability: string | null
          best_time: string | null
          correct_index: number | null
          created_at: string | null
          description_en: string | null
          description_th: string | null
          difficulty: string | null
          duration: string | null
          exercise_type: string | null
          explanation_en: string | null
          explanation_th: string | null
          group_size: string | null
          highlights: string[] | null
          id: string
          image_url: string | null
          includes: string[] | null
          lesson_id: string | null
          location: string | null
          name_en: string | null
          name_th: string | null
          options: string[] | null
          price: number | null
          question_en: string | null
          question_th: string | null
          rating: number | null
          target_audience: string[] | null
          updated_at: string | null
        }
        Insert: {
          availability?: string | null
          best_time?: string | null
          correct_index?: number | null
          created_at?: string | null
          description_en?: string | null
          description_th?: string | null
          difficulty?: string | null
          duration?: string | null
          exercise_type?: string | null
          explanation_en?: string | null
          explanation_th?: string | null
          group_size?: string | null
          highlights?: string[] | null
          id: string
          image_url?: string | null
          includes?: string[] | null
          lesson_id?: string | null
          location?: string | null
          name_en?: string | null
          name_th?: string | null
          options?: string[] | null
          price?: number | null
          question_en?: string | null
          question_th?: string | null
          rating?: number | null
          target_audience?: string[] | null
          updated_at?: string | null
        }
        Update: {
          availability?: string | null
          best_time?: string | null
          correct_index?: number | null
          created_at?: string | null
          description_en?: string | null
          description_th?: string | null
          difficulty?: string | null
          duration?: string | null
          exercise_type?: string | null
          explanation_en?: string | null
          explanation_th?: string | null
          group_size?: string | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          includes?: string[] | null
          lesson_id?: string | null
          location?: string | null
          name_en?: string | null
          name_th?: string | null
          options?: string[] | null
          price?: number | null
          question_en?: string | null
          question_th?: string | null
          rating?: number | null
          target_audience?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "practice_exercises_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      product_translations: {
        Row: {
          content: string
          created_at: string
          id: string
          language: string
          product_id: string | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          language: string
          product_id?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          language?: string
          product_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_translations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          category_id: string | null
          content: string | null
          content_en: string | null
          content_source: string | null
          content_status: string | null
          content_th: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          last_verified_at: string | null
          model: string | null
          name: string
          slug: string
          source_url: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          brand?: string | null
          category_id?: string | null
          content?: string | null
          content_en?: string | null
          content_source?: string | null
          content_status?: string | null
          content_th?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          last_verified_at?: string | null
          model?: string | null
          name: string
          slug: string
          source_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          brand?: string | null
          category_id?: string | null
          content?: string | null
          content_en?: string | null
          content_source?: string | null
          content_status?: string | null
          content_th?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          last_verified_at?: string | null
          model?: string | null
          name?: string
          slug?: string
          source_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          category: string | null
          created_at: string | null
          description_en: string | null
          description_th: string | null
          distance: string | null
          hours: string | null
          id: string
          image_url: string | null
          location: string | null
          name_en: string
          name_th: string
          phone: string | null
          price_range: string | null
          rating: number | null
          resource_type: string | null
          tags: string[] | null
          updated_at: string | null
          walk_time: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description_en?: string | null
          description_th?: string | null
          distance?: string | null
          hours?: string | null
          id: string
          image_url?: string | null
          location?: string | null
          name_en: string
          name_th: string
          phone?: string | null
          price_range?: string | null
          rating?: number | null
          resource_type?: string | null
          tags?: string[] | null
          updated_at?: string | null
          walk_time?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description_en?: string | null
          description_th?: string | null
          distance?: string | null
          hours?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name_en?: string
          name_th?: string
          phone?: string | null
          price_range?: string | null
          rating?: number | null
          resource_type?: string | null
          tags?: string[] | null
          updated_at?: string | null
          walk_time?: string | null
        }
        Relationships: []
      }
      training_courses: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty: string | null
          id: string
          product_id: string | null
          title: string
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          product_id?: string | null
          title: string
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          product_id?: string | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_courses_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      training_lessons: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          lesson_order: number | null
          markdown_content: string | null
          title: string
          video_url: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_order?: number | null
          markdown_content?: string | null
          title: string
          video_url?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_order?: number | null
          markdown_content?: string | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "training_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      troubleshooting_guides: {
        Row: {
          created_at: string | null
          id: string
          issue: string
          product_id: string | null
          solution: string | null
          symptoms: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          issue: string
          product_id?: string | null
          solution?: string | null
          symptoms?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          issue?: string
          product_id?: string | null
          solution?: string | null
          symptoms?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "troubleshooting_guides_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_stats: {
        Row: {
          created_at: string
          total_active_seconds: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          total_active_seconds?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          total_active_seconds?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_bookmarks: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          lesson_id: string | null
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_bookmarks_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_bookmarks_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed_at: string | null
          course_id: string | null
          created_at: string | null
          exercise_id: string | null
          id: string
          last_accessed_at: string | null
          lesson_id: string | null
          notes: string | null
          path_id: string | null
          progress_percentage: number | null
          status: string | null
          study_time_seconds: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          exercise_id?: string | null
          id?: string
          last_accessed_at?: string | null
          lesson_id?: string | null
          notes?: string | null
          path_id?: string | null
          progress_percentage?: number | null
          status?: string | null
          study_time_seconds?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          exercise_id?: string | null
          id?: string
          last_accessed_at?: string | null
          lesson_id?: string | null
          notes?: string | null
          path_id?: string | null
          progress_percentage?: number | null
          status?: string | null
          study_time_seconds?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "practice_exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          created_at: string
          last_learning_date: string | null
          level: number
          monthly_study_seconds: number
          streak_days: number
          today_study_seconds: number
          total_learning_sessions: number
          total_study_seconds: number
          updated_at: string
          user_id: string
          weekly_study_seconds: number
          xp: number
        }
        Insert: {
          created_at?: string
          last_learning_date?: string | null
          level?: number
          monthly_study_seconds?: number
          streak_days?: number
          today_study_seconds?: number
          total_learning_sessions?: number
          total_study_seconds?: number
          updated_at?: string
          user_id: string
          weekly_study_seconds?: number
          xp?: number
        }
        Update: {
          created_at?: string
          last_learning_date?: string | null
          level?: number
          monthly_study_seconds?: number
          streak_days?: number
          today_study_seconds?: number
          total_learning_sessions?: number
          total_study_seconds?: number
          updated_at?: string
          user_id?: string
          weekly_study_seconds?: number
          xp?: number
        }
        Relationships: []
      }
    }
    Views: {
      v_enrollment_completion: {
        Row: {
          completed_at: string | null
          course_id: string | null
          enrolled_at: string | null
          last_accessed_at: string | null
          progress_percentage: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          enrolled_at?: string | null
          last_accessed_at?: string | null
          progress_percentage?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          enrolled_at?: string | null
          last_accessed_at?: string | null
          progress_percentage?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      course_completion_percentage: {
        Args: { p_course_id: string; p_user_id: string }
        Returns: number
      }
      evaluate_lesson_completion: {
        Args: { p_lesson_id: string; p_user_id: string }
        Returns: Json
      }
      get_active_students_count: { Args: never; Returns: number }
      get_admin_metrics: { Args: never; Returns: Json }
      get_hardest_exercises: { Args: { limit_count?: number }; Returns: Json }
      get_student_metrics: { Args: { target_user_id: string }; Returns: Json }
      increment_study_time: {
        Args: { increment_seconds: number }
        Returns: undefined
      }
      is_admin_or_instructor: { Args: never; Returns: boolean }
      mark_lesson_complete: {
        Args: {
          p_course_id?: string
          p_lesson_id: string
          p_notes?: string
          p_percentage?: number
          p_status?: string
          p_user_id: string
        }
        Returns: Json
      }
      record_learning_activity: {
        Args: {
          p_study_seconds: number
          p_user_id: string
          p_xp_gained: number
        }
        Returns: undefined
      }
      reset_my_learning_progress: { Args: never; Returns: undefined }
      save_exercise_progress: {
        Args: {
          p_answers?: Json
          p_attempts?: number
          p_checkpoint_data?: Json
          p_completed_at?: string
          p_course_id?: string
          p_exercise_id: string
          p_last_activity_at?: string
          p_lesson_id?: string
          p_progress_percentage?: number
          p_score?: number
          p_started_at?: string
          p_status?: string
          p_time_spent_seconds?: number
          p_user_id: string
        }
        Returns: {
          answers: Json
          attempts: number
          checkpoint_data: Json
          completed_at: string | null
          course_id: string | null
          created_at: string
          exercise_id: string
          id: string
          last_activity_at: string
          lesson_id: string | null
          progress_percentage: number
          score: number | null
          started_at: string | null
          status: string
          time_spent_seconds: number
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "exercise_progress"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      availability_status: "available" | "limited" | "full" | "coming_soon"
      course_level: "beginner" | "intermediate" | "advanced"
      exercise_difficulty: "easy" | "moderate" | "challenging"
      path_type: "sequential" | "optional" | "milestone"
      resource_type:
        | "tool"
        | "tutorial"
        | "documentation"
        | "video"
        | "external_link"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      availability_status: ["available", "limited", "full", "coming_soon"],
      course_level: ["beginner", "intermediate", "advanced"],
      exercise_difficulty: ["easy", "moderate", "challenging"],
      path_type: ["sequential", "optional", "milestone"],
      resource_type: [
        "tool",
        "tutorial",
        "documentation",
        "video",
        "external_link",
      ],
    },
  },
} as const
