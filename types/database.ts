export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          id: string;
          checksum: string;
          finished_at: string | null;
          migration_name: string;
          logs: string | null;
          rolled_back_at: string | null;
          started_at: string;
          applied_steps_count: number;
        };
        Insert: {
          id: string;
          checksum: string;
          finished_at?: string | null;
          migration_name: string;
          logs?: string | null;
          rolled_back_at?: string | null;
          started_at?: string;
          applied_steps_count?: number;
        };
        Update: {
          id?: string;
          checksum?: string;
          finished_at?: string | null;
          migration_name?: string;
          logs?: string | null;
          rolled_back_at?: string | null;
          started_at?: string;
          applied_steps_count?: number;
        };
      };
      users: {
        Row: {
          email: string;
          role: "ADMIN" | "EMPLOYEE";
          ownedCompanyId: string;
          companyId: string;
          id: string;
          name: string;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          email: string;
          role: "ADMIN" | "EMPLOYEE";
          ownedCompanyId: string;
          companyId: string;
          id?: string;
          name?: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          email?: string;
          role?: "ADMIN" | "EMPLOYEE";
          ownedCompanyId?: string;
          companyId?: string;
          id?: string;
          name?: string;
          createdAt?: string;
          updatedAt?: string;
        };
      };
      companies: {
        Row: {
          name: string;
          location: string;
          isActive: boolean;
          userId: string;
          id: string;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          name: string;
          location: string;
          isActive: boolean;
          userId: string;
          id?: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          name?: string;
          location?: string;
          isActive?: boolean;
          userId?: string;
          id?: string;
          createdAt?: string;
          updatedAt?: string;
        };
      };
    };
    Functions: {};
  };
}

