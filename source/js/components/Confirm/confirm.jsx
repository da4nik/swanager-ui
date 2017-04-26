import confirmModal from './confirmModal';
import { createConfirmation } from 'react-confirm';

const ConfirmPopUp = createConfirmation(confirmModal);

export function confirm(confirmation, options = {}) {
  return ConfirmPopUp({ confirmation, ...options });
}
