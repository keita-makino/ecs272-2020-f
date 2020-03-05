import { ShapeSetBase } from './ShapeSet';

export type BubbleRenderer = {
  sets: ShapeSetBase[];
  getBoundaries: () => void;
};
