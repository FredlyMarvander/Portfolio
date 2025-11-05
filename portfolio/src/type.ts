export type Owner = {
  email: string;
  password: string;
};

export type Experience = {
  _id?: string;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
};

export type Project = {
  _id?: string;
  title: string;
  description: string;
  skills: string[];
  link: string;
  image: string;
  collaborators?: string[];
};

export type Skill = {
  id?: string;
  title: string;
  items: string[];
};

export type About = {
  id?: string;
  openToWork: boolean;
  sentence: string;
};

export type Certificate = {
  _id?: string;
  title: string;
  issuer: string;
  month: string;
  year: string;
  credentialUrl: string;
  description: string;
};

export type LinkedIn = {
  url: string;
  content: string;
  urls: string;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  name: string;
  avatarUrl: string;
};
