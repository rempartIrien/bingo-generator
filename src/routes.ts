import { FC } from 'react';

import About from './about';
import Bingo from './bingo';
import Generator from './generator';

export interface RouteDescription {
  path: string;
  component: FC;
}

export const ABOUT_ROUTE: RouteDescription = {
  path: '/about',
  component: About
};

export const BINGO_ROUTE: RouteDescription = {
  path: '/bingo',
  component: Bingo
};

export const GENERATOR_ROUTE: RouteDescription = {
  path: '/generator',
  component: Generator
};
