import { combineReducers } from 'redux';
import apps from 'reducers/apps';
import auth from 'reducers/auth';
import services from 'reducers/services';


export default combineReducers({
  auth, apps, services,
});
