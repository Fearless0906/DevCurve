export type Language = {
  id: string;
  name: string;
};

export interface CurveCardProps {
  id: string;
  thumbnail?: string;
  title: string;
  description: string;
  views: number;
  react?: boolean;
  className?: string;
}

export interface ContentCardProps {
  id: string;
  title: string;
  description: string;
}

export type Guide = {
  id: string;
  project: string[];
  topic: string;
  content: string;
  commands?: string | null;
  image?: string | null;
};

export interface ComponentResponse {
  id: string;
  thumbnail?: string;
  title: string;
  description: string;
  views: number;
  react: boolean;
  guides: Guide[];
}
