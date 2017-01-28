import React from 'react';
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

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    const { router, saveRedirectBackPath } = this.props;
    if (!this.props.isLoggedIn) {
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

EnsureLoggedInContainer.propTypes = {
  router: React.PropTypes.object,
  saveRedirectBackPath: React.PropTypes.func,
  isLoggedIn: React.PropTypes.bool,
  children: React.PropTypes.node,
};


export default connect(mapStateToProps, mapDispatchToProps)(EnsureLoggedInContainer);
