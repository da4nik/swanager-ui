import { services, saveService } from '../api';
import { SERVICES_LOADED, SERVICE_LOADED } from './index';

export const serviceLoaded = (loadedService) => ({ type: SERVICE_LOADED, data: loadedService });
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

export const saveServ = (service) => {
  let responseStatus;
  return dispatch => {
    saveService(service)
    .then(response => {
      responseStatus = response.status;
      return response.json();
    })
    .then(payload => {
      switch (responseStatus) {
        case 200:
        case 201:
          console.log('saveServ payload: ', payload);
          dispatch(serviceLoaded(payload.service));
          break;
        default:
      }
    })
    .catch(() => {});
  };
};
