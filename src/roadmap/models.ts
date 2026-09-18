export type ExperienceLevel = 'none' | 'basic' | 'intermediate';
export type Objective = 'frontend' | 'backend' | 'fullstack';
export type Timeframe = '6months' | '1year' | '2years';
export type BadgeType = 'now' | 'ai' | 'hot' | 'base';
export type ColorTheme = 'teal' | 'blue' | 'purple' | 'amber' | 'coral' | 'gray';

export interface RoadmapParams {
  experienceLevel: ExperienceLevel;
  language: string;
  objective: Objective;
  timeframe: Timeframe;
}

export interface SkillItem {
  text: string;
  badge?: BadgeType;
}

export interface RoadmapCard {
  title: string;
  icon: string;
  color: ColorTheme;
  items: SkillItem[];
  note?: string;
  fullWidth?: boolean;
}

export interface RoadmapPhase {
  label: string;
  title: string;
  description: string;
  timelineLabel: string;
  cards: RoadmapCard[];
}

export interface RoadmapResponse {
  phases: RoadmapPhase[];
}