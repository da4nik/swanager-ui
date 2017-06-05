import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveCurrentPath } from '../../actions/signin';

function mapStateToProps({ auth }, { router }) {
  const authToken = auth.get('authToken');
  return {
    isLoggedIn: authToken != null && authToken.length > 0,
    router,
  };
}

const mapDispatchToProps = dispatch => ({
  saveRedirectBackPath: (path) => { dispatch(saveCurrentPath(path)); },
});

@connect(mapStateToProps, mapDispatchToProps)
class EnsureLoggedInContainer extends Component {
  static propTypes = {
    router: PropTypes.object,
    saveRedirectBackPath: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    children: PropTypes.node,
  }

  componentWillMount() {
    this.redirectUnauthenticated();
  }

  componentWillReceiveProps(nextProps) {
    this.redirectUnauthenticated(nextProps);
  }

  redirectUnauthenticated(props = this.props) {
    const { router, saveRedirectBackPath, isLoggedIn } = props;
    if (!isLoggedIn) {
      saveRedirectBackPath(router.location.pathname);
      router.replace('/signin');
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children;
    }
    return null;
  }
}

export default EnsureLoggedInContainer;
