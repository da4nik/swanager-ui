import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { saveApp } from '../../actions/apps';

const mapDispatchToProps = dispatch => ({
  saveApplication: (application) => { dispatch(saveApp(application)); },
});

@connect(null, mapDispatchToProps)
class ApplicationForm extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    saveApplication: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: props.app.name || '',
    };
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onSave() {
    this.props.saveApplication(
      Object.assign({}, this.props.app, { name: this.state.name })
    );
  }

  render() {
    const { name } = this.state;
    return (
      <section className='app-form'>
        <h1>Form</h1>
        <label htmlFor='name'>
          {' Application name: '}
          <input type='text' value={ name } onChange={ (event) => { this.onNameChange(event); } } />
        </label>

        <button className='app-form_submit' onClick={ () => { this.onSave(); } }>Save</button>
      </section>
    );
  }
}

export default ApplicationForm;
