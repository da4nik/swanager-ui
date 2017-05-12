import API from '../api';
import { UPDATE_NSNAMES  } from './index';

export const nsNamesUpdated = (updateNsNames) => ({ type: UPDATE_NSNAMES, data: updateNsNames });

export const updateNsNames = () => {
  console.log('nsNamesUpdated');
};