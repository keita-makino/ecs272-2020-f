import { Record } from './Record';

export type RecordSet = {
  record: Record[];
  name: string;
  color: [number, number, number];
};
