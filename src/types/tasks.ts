export interface TODO {
  title:string;
  created_at: string;
  deleted_at: string | null;
  description: string;
  id: number;
}

export interface UPDATED_TODO {
  title: string;
  description?: string;
}