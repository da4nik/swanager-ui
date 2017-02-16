import API from '../api';
import { SERVICES_LOADED, SERVICE_LOADED, SERVICE_REMOVED } from './index';
import { signout } from './signin';
import { addAutohidedNotification } from './notifications';

export const serviceLoaded = (loadedService) => ({ type: SERVICE_LOADED, data: loadedService });
// removeService - drops service from store
export const removeService = (removedService) => ({ type: SERVICE_REMOVED, data: removedService });
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
            dispatch(addAutohidedNotification('API', 'Services loaded'));
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

// Drops service via API
export const deleteService = (service) => {
  let responseStatus;
  return dispatch => {
    API.removeService(service)
    .then(response => {
      responseStatus = response.status;
      return response.json();
    })
    .then(payload => {
      switch (responseStatus) {
        case 200:
          dispatch(removeService(payload.service));
          break;
        case 401:
          dispatch(signout());
          break;
        default:
          console.log(`[removeService] Unknown response status: (${ responseStatus }) ${ payload }`);
      }
    })
    .catch(response => {
      console.log('[removeService] Something went wrong. ', response);
    });
  };
};

export const applyServiceAction = (service, action) => {
  let responseStatus;
  return dispatch => {
    API.serviceAction(service, action)
    .then(response => {
      responseStatus = response.status;
      return response.json();
    })
    .then(payload => {

    })
    .catch(response => {
      console.log('[applyServiceAction] Something went wrong.', response);
    });
  };
};
