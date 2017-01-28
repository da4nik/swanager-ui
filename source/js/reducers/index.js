import { combineReducers } from 'redux';
import apps from 'reducers/apps';
import auth from 'reducers/auth';

export default combineReducers({
  auth, apps,
});
