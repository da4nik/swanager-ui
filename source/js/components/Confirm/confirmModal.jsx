import React from 'react';

import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import { confirmable } from 'react-confirm';



class confirmModal extends React.Component {
  static propTypes = { 
    okLabbel: React.PropTypes.string,
    cancelLabel: React.PropTypes.string,
    title: React.PropTypes.string,
    confirmation: React.PropTypes.string,
    show: React.PropTypes.bool,
    proceed: React.PropTypes.func,
    cancel: React.PropTypes.func,
    dismiss: React.PropTypes.func,
    enableEscape: React.PropTypes.bool,
  }

  render() {
    const { okLabbel = 'OK', cancelLabel = 'Cancel', title, confirmation, show, proceed, dismiss, cancel, enableEscape = true } = this.props;
    return (
      <div className="static-modal">
        <Modal show={show} onHide={dismiss} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {confirmation}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={cancel}>{cancelLabel}</Button>
            <Button className='button-l' bsStyle="primary" onClick={proceed}>{okLabbel}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}



export default confirmable(confirmModal);