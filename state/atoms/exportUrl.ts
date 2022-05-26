import { atom } from 'recoil';

/**
 * Atom tracking and controlling the value of export URL
 * entered for bulk submit by the user
 */
export const exportUrlState = atom<{ url: string; valid: boolean }>({
  key: 'exportUrlState',
  default: {
    url: '',
    valid: true
  }
});
