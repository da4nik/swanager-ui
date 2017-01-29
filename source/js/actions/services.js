import { services } from '../api';
import { SERVICES_LOADED } from './index';

export const servicesLoaded = (loadedServices) => ({
  type: SERVICES_LOADED,
  data: loadedServices,
});

export const loadServices = () => {
  let responseStatus;
  return dispatch => {
    services()
      .then(response => {
        responseStatus = response.status;
        return response.json();
      })
      .then(payload => {
        switch (responseStatus) {
          case 200:
            console.log('Load services: ', payload);
            dispatch(servicesLoaded(payload.services));
            break;
          default:
            console.log('something wrong');
        }
      });
  };
};
