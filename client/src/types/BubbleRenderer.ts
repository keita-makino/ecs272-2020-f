import { ShapeSet } from './ShapeSet';

export type BubbleRenderer = {
  sets: ShapeSet[];
  getBoundaries: () => void;
};
