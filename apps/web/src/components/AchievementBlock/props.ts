type Badges = {
  total: number;
  achivements?: {
    title: string;
    description: string;
  }[];
};

export type AchievementBlockProps = {
  titles: string[];
  badges: Badges[];
  showMore?: boolean;
};
