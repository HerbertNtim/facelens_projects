import { BrickWallShield } from 'lucide-react';
import { createElement, ReactElement } from 'react';

type ProjectTypes = {
  title: string,
  description: string,
  icon: ReactElement
}

export const projects: Array<ProjectTypes> = [
  {
    title: 'Gender Prediction',
    description: 'A project that predicts the gender of a person based on their facial features using machine learning algorithms.',
    icon: createElement(BrickWallShield)
  }
];
