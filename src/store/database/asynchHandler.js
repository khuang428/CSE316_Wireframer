import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).catch(function(error){
      if(error.code == "auth/email-already-in-use"){
        alert("An account with this email already exists. Please use a different email.");
      }
    }).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
        diagrams: []
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};
