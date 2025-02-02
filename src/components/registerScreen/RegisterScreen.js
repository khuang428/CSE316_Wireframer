import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../store/database/asynchHandler';

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
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
    const { props, state } = this;
    const { firebase } = props;
    const newUser = { ...state };

    if(this.state.email == '' || this.state.password == '' || this.state.firstName == '' || this.state.lastName == ''){
      alert("Please fill out all the fields.");
      return;
    }

    if(!this.state.email.includes("@") || !this.state.email.includes(".")){
      alert("Please enter a valid email.")
    }

    if(this.state.password.length < 6){
      alert("Your password should be at least 6 characters long.");
      return;
    }

    

    props.register(newUser, firebase);
  }

  render() {
    const { auth} = this.props;
    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className = "row">
          <form onSubmit={this.handleSubmit} className = "col s5">
            <h5 className="grey-text text-darken-3">Register</h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" id="firstName" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" id="lastName" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <button type="submit" className="btn blue-grey darken-1 z-depth-1">Sign Up</button>
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
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
  register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps))(RegisterScreen);