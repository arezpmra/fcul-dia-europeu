export interface Talk {
  id: string;
  title: string;
  speaker: string;
  affiliation?: string;
  description: string;
  time: string;
  room?: string;
}

export interface Panel {
  id: string;
  title: string;
  moderator?: string;
  speakers?: { name: string; org?: string }[];
  time: string;
}

export interface Curiosity {
  id: string;
  title: string;
  category: string;
  description: string;
  explanation: string;
}

export interface Project {
  reference: string;
  agency: string;
  name: string;
}
