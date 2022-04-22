import { atom } from 'recoil';

/**
 * Atom tracking and controlling the measure selected for
 * bulk submit by the user
 */
export const selectedMeasureState = atom({
  key: 'selectedMeasureState',
  default: null as string | null
});
