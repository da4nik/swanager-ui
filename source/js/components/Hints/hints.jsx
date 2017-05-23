import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

const mapStoreToProps = ({ services }) => ({ services });

@connect(mapStoreToProps, {})
class Hints extends React.Component {
  static propTypes = {
    appID: PropTypes.string,
    services: PropTypes.instanceOf(Immutable.Map),
    Hintskey: PropTypes.string,
    showHints: PropTypes.bool,
    onShowHints: PropTypes.func,
    onCloseHints: PropTypes.func,
    onHintSelect: PropTypes.func,
  }

  componentDidMount() {
    document.addEventListener('click', () => { this.onClickOutside(event); });
  }

  onClickOutside(event) {
    const { onCloseHints } = this.props;

    event.stopPropagation();
    if (event.target.className !== 'showHints__circle') {
      onCloseHints();
    } else {
      return false;
    }
  }

  render() {
    const { appID, services, Hintskey, showHints, onShowHints, onHintSelect } = this.props;

    const nsNames = [];

    services.filter(service => service.application_id === appID).map((service) => {
      nsNames.push(service.ns_name);
      return service.ns_name;
    });

    return (
      <div className='showHints'>
        <span className='showHints__circle' onClick={ () => { onShowHints(Hintskey); } }></span>
        <div className='hintsWrap' style={ { display: showHints ? 'block' : 'none' } }>
          {
            showHints ?
              nsNames.map((nsName) => {
                return (
                  <div key={ nsName } className='hintsWrap__hint' onClick={ () => { onHintSelect(nsName, Hintskey); } }>{ nsName }</div>
                );
              })
            :
              null
          }
        </div>
      </div>
    );
  }
}

export default Hints;
