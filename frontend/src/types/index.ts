export interface Word {
  id: number;
  english: string;
  spanish: string;
  category_id: number;
  description?: string;
  times_practiced: number;
  times_correct: number;
  last_practiced_at: string | null;
  status: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}
