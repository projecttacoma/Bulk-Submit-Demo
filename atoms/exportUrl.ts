import { atom } from 'recoil';

/**
 * Atom tracking and controlling the value of export URL
 * entered for bulk submit by the user
 */
export const exportUrlState = atom({
  key: 'exportUrlState',
  default: ''
});
