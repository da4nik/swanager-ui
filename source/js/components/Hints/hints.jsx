import React from 'react';

class Hints extends React.Component {
  static propTypes = {
    Hintskey: React.PropTypes.string,
    showHints: React.PropTypes.boolean,
    nsNames: React.PropTypes.array,
    onShowHints: React.PropTypes.func,
    onHintSelect: React.PropTypes.func,
  }

  render() {
    const { Hintskey, showHints, nsNames, onShowHints, onHintSelect } = this.props;
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
