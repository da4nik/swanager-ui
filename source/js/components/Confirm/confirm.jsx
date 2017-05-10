import confirmModal from './confirmModal';
import { createConfirmation } from 'react-confirm';

const ConfirmPopUp = createConfirmation(confirmModal);

export default confirm = (confirmation, options = {}) => {
    return ConfirmPopUp({ confirmation, options });
}