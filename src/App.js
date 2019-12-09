import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import Navbar from './components/navbar/Navbar';
import DatabaseTester from './test/DatabaseTester';
import LoginScreen from './components/loginScreen/LoginScreen';
import RegisterScreen from './components/registerScreen/RegisterScreen';
import HomeScreen from './components/homeScreen/HomeScreen';

class App extends Component {
  render() {
    const { auth } = this.props;

    if (auth.isLoaded) {
      return (
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/databaseTester" component={DatabaseTester} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);