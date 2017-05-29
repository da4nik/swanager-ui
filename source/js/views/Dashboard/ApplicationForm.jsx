import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { saveApplication } from '../../actions/apps';

const mapDispatchToProps = dispatch => ({
  saveApp: (application) => { dispatch(saveApplication(application)); },
});

@connect(null, mapDispatchToProps)
class ApplicationForm extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    saveApp: PropTypes.func,
    closeForm: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: props.app.name || '',
      appHasChanges: false,
    };
  }

  onNameChange(event) {
    this.setState({ name: event.target.value, appHasChanges: (this.props.app.name !== event.target.value) });
  }

  onSave() {
    const { closeForm, saveApp } = this.props;
    saveApp(
      Object.assign({}, this.props.app, { name: this.state.name })
    );
    closeForm();
  }

  render() {
    const { name } = this.state;
    return (
      <section className='app-form'>
        <div className='app-form__title'>Form</div>
        <label htmlFor='name' className='app-form__input'>
          {' Application name: '}
          <input
            type='text'
            value={ name }
            onChange={ (event) => { this.onNameChange(event); } }
          />
        </label>

        <button className='app-form__submit' disabled={!this.state.appHasChanges} onClick={ () => { this.onSave(); } }>Save</button>
      </section>
    );
  }
}

export default ApplicationForm;
