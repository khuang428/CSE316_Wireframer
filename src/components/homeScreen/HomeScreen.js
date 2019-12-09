import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import DiagramLinks from './DiagramLinks';
import { getFirestore } from 'redux-firestore';


class HomeScreen extends Component {

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
        <div className="dashboard container">
            <div className="row">
                <div className="col s12 m4">
                    <DiagramLinks />
                </div>

                <div className="col s8">
                    <div className="banner">
                        Wireframer&trade;<br />
                    </div>
                    
                    <div className="center">
                            <button className="blue-grey white-text waves-effect waves-light btn-large">
                                Create New Wireframe Diagram
                            </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      {collection: 'diagrams'},
    ]),
)(HomeScreen);