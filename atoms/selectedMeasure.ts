import { atom } from 'recoil';

export const selectedMeasureState = atom({
  key: 'selectedMeasureState',
  default: null as string | null
});
