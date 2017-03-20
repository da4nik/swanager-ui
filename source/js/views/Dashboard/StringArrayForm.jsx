import React, { Component, PropTypes } from 'react';

class StringArrayForm extends Component {
  static propTypes = {
    entities: PropTypes.array.isRequired,
    saveEntities: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = { entities: this.props.entities };
  }

  setEntity(index, value) {
    this.state.entities[index] = value;
    this.setState({ entities: this.state.entities });
    this.props.saveEntities(this.state.entities);
  }

  addNewEntity() {
    this.setState({ entities: ['', ...this.state.entities] });
    this.props.saveEntities(this.state.entities);
  }

  renderEntities() {
    const { entities } = this.state;
    const result = entities.map((entity, index) => {
      return (<input
        key={ index }
        value={ entity }
        onChange={ (event) => { this.setEntity(index, event.target.value); } }
        type='text'
      />);
    });

    return result.length > 0 ? result : (<div>{'Nothing'}</div>);
  }

  render() {
    return (<div>
      {' String array form '}
      <button
        onClick={ () => { this.addNewEntity(); } }
      >Add one</button>
      { this.renderEntities() }
    </div>);
  }

}

export default StringArrayForm;
