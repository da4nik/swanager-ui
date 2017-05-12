import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import { updateNsNames } from '../../actions/nsNames';

const mapStoreToProps = ({ services }) => ({ services });

const mapDispatchToProps = dispatch => ({
  NsNamesUpdated: (nsNames) => { dispatch(destroyApplication(nsNames)); },
});

@connect(mapStoreToProps, mapDispatchToProps)
class Hints extends React.Component {
  static propTypes = {
    services: PropTypes.instanceOf(Immutable.Map),
    Hintskey: React.PropTypes.string,
    showHints: React.PropTypes.boolean,
    onShowHints: React.PropTypes.func,
    onHintSelect: React.PropTypes.func,
  }

  render() {
    const { services, Hintskey, showHints, onShowHints, onHintSelect } = this.props;

    const nsNames = new Array();

    services.map((service) => {
      nsNames.push(service.ns_name);
      return service.ns_name;
    });

    return (
      <div className="showHints" >
        <span className="showHints__circle" onClick={ (event) => { onShowHints(Hintskey); } }></span>
        <div className="hintsWrap">
          { 
            showHints ?
              nsNames.map((nsName) => {
                return (
                  <div key={ nsName } className="hintsWrap__hint" onClick={ (event) => { onHintSelect(nsName, Hintskey); } }>{ nsName }</div>
                )
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
