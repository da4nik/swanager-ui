import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from './index';

export const setCurrentUser = (data) => ({ type: SET_CURRENT_USER, data });
export const removeCurrentUser = () => ({ type: REMOVE_CURRENT_USER });
