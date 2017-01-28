import React from 'react';
import { connect } from 'react-redux';

import { saveCurrentPath } from '../../actions/signin';

function mapStateToProps({ auth }, { location, router }) {
  const authToken = auth.get('authToken')
  return {
    isLoggedIn: authToken != null && authToken.length > 0,
    currentURL: location.pathname,
    router
  };
}

const mapDispatchToProps = dispatch => ({
  saveCurrentPath: (path) => { dispatch(saveCurrentPath(path)) }
})

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    const { dispatch, currentURL, router, saveCurrentPath } = this.props;
    if (!this.props.isLoggedIn) {
      saveCurrentPath(router.location.pathname)
      router.replace('/signin');
    }
  }

  render () {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EnsureLoggedInContainer);
