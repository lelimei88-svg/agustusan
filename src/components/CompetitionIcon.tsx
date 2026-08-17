import React from 'react';
import {
  ShieldAlert,
  Utensils,
  Users,
  Trophy,
  Sparkles,
  Brain,
  Bike,
  ChefHat,
  Smile,
  Mic,
  Flag,
  Award,
  CircleDot,
  Droplets,
  Cookie,
  Banana,
  GlassWater,
  Target,
  Crown,
  Eye
} from 'lucide-react';

interface CompetitionIconProps {
  name: string;
  className?: string;
}

export const CompetitionIcon: React.FC<CompetitionIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'ShieldAlert':
      return <ShieldAlert className={className} />;
    case 'Utensils':
      return <Utensils className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Trophy':
      return <Trophy className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Brain':
      return <Brain className={className} />;
    case 'Bike':
      return <Bike className={className} />;
    case 'ChefHat':
      return <ChefHat className={className} />;
    case 'Smile':
      return <Smile className={className} />;
    case 'Mic':
      return <Mic className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'CircleDot':
      return <CircleDot className={className} />;
    case 'Droplets':
      return <Droplets className={className} />;
    case 'Cookie':
      return <Cookie className={className} />;
    case 'Banana':
      return <Banana className={className} />;
    case 'GlassWater':
      return <GlassWater className={className} />;
    case 'Target':
      return <Target className={className} />;
    case 'Crown':
      return <Crown className={className} />;
    case 'Eye':
      return <Eye className={className} />;
    default:
      return <Flag className={className} />;
  }
};
