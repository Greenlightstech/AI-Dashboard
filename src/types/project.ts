export interface Project {
  id: string;
  title: string;
  status?: string;
  date?: string;
  tags?: string[];
  description?: string;
  images?: string[];
  video?: string;
  isPlaceholder: boolean;
}
