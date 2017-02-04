import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { hideNotification } from '../../actions/notifications';

const mapStoreToProps = ({ notifications }) => ({
  notifications,
});

const mapDispatchToProps = dispatch => ({
  hideNotif: (notif) => { dispatch(hideNotification(notif)); },
});

@connect(mapStoreToProps, mapDispatchToProps)
class Notifications extends React.Component {
  static propTypes = {
    notifications: PropTypes.instanceOf(Immutable.Map),
    hideNotif: PropTypes.func,
  }

  onNotificationClose(notification) {
    this.props.hideNotif(notification);
  }

  renderNotifications() {
    const { notifications } = this.props;

    return notifications.valueSeq().map((notification) => {
      return (
        <div
          className='notifications__notification'
          key={ notification.id }
        >
          <div className='notifications__notification-title'>{ notification.title }</div>
          <p className='notifications__notification-text'>{ notification.text }</p>
          <button
            className='notifications__notification-close'
            onClick={ () => { this.onNotificationClose(notification); } }
          >&times;</button>
        </div>);
    });
  }

  render() {
    return (
      <div className='notifications'>
        { this.renderNotifications() }
      </div>
    );
  }
}

export default Notifications;
