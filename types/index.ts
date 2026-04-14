export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
  image?: string;
  featured: boolean;
  stats?: {
    stars: number;
    forks: number;
  };
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  type: 'work' | 'education' | 'achievement';
  description: string[];
  details?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date?: string;
  link?: string;
}
