import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import { loginHandler } from '../../store/database/asynchHandler'

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // As we use react-redux-firebas-v3 we need to pass firebase object to
    // authActions to be authorized by using firebse.auth method
    const { props, state } = this;
    const { firebase } = props;
    const credentials = { ...state };
    const authData = {
      firebase,
      credentials,
    };

    props.login(authData);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.handleSubmit} className="col s5">
            <h5 className="grey-text text-darken-3">Login</h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input className="active" type="email" name="email" id="email" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input className="active" type="password" name="password" id="password" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <button type="submit" className="btn blue-grey darken-1 z-depth-1">Login</button>
              {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
            </div>
          </form>

          <div className="col s7 banner">
            Wireframer&trade;<br />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authError: state.auth.authError,
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
  login: authData => dispatch(loginHandler(authData)),
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(LoginScreen);