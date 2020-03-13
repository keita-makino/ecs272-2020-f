import { Record } from './Record';

export type RecordSet = {
  records: Record[];
  name: string;
  color: [number, number, number];
};
