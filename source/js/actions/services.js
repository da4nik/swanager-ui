import API from '../api';
import { SERVICES_LOADED, SERVICE_LOADED } from './index';
import { signout } from './signin';

export const serviceLoaded = (loadedService) => ({ type: SERVICE_LOADED, data: loadedService });
export const servicesLoaded = (loadedServices) => ({
  type: SERVICES_LOADED,
  data: loadedServices,
});

export const loadServices = () => {
  let responseStatus;
  return dispatch => {
    API.services()
      .then(response => {
        responseStatus = response.status;
        return response.json();
      })
      .then(payload => {
        switch (responseStatus) {
          case 200:
            dispatch(servicesLoaded(payload.services));
            break;
          case 401:
            dispatch(signout());
            break;
          default:
            console.log('Something went wrong.');
        }
      })
      .catch(response => {
        console.log('[loadServices] Something went wrong. ', response);
      });
  };
};

export const saveService = (service) => {
  let responseStatus;
  return dispatch => {
    API.saveService(service)
    .then(response => {
      responseStatus = response.status;
      return response.json();
    })
    .then(payload => {
      switch (responseStatus) {
        case 200:
        case 201:
          dispatch(serviceLoaded(payload.service));
          break;
        case 401:
          dispatch(signout());
          break;
        default:
          console.log('Something went wrong.');
      }
    })
    .catch(response => {
      console.log('[saveServ] Something went wrong. ', response);
    });
  };
};
