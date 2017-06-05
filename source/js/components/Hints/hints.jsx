import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';

const mapStoreToProps = ({ services }) => ({ services });

@connect(mapStoreToProps, {})
class Hints extends Component {
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
    if (event.target.className !== 'showHints__circle') { onCloseHints(); }

    return false;
  }

  render() {
    const { appID, services, Hintskey, showHints, onShowHints, onHintSelect } = this.props;

    const nsNames = services.filter(service => service.application_id === appID).map((service) => {
      return service.ns_name;
    }).toJS();

    return (
      <div className='showHints'>
        <button className='showHints__circle' onClick={ () => { onShowHints(Hintskey); } } type='button'>{' '}</button>
        <div className='hintsWrap' style={ { display: showHints ? 'block' : 'none' } }>
          {
            showHints ?
              Object.keys(nsNames).map((nsName) => {
                return (
                  <button key={ nsNames[nsName] } className='hintsWrap__hint' onClick={ () => { onHintSelect(nsNames[nsName], Hintskey); } } type='button'>{ nsNames[nsName] }</button>
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
