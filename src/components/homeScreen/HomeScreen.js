import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import DiagramLinks from './DiagramLinks';
import { getFirestore } from 'redux-firestore';
import Button from 'react-materialize/lib/Button';

class HomeScreen extends Component {
    handleNewDiagram = () =>{
        //default name "New Diagram"
        //default size 700x500
        const fireStore = getFirestore();
        fireStore.collection('diagrams').add({
            name : 'New Diagram',
            owner: this.props.auth.uid,
            timeUpdated: new Date().getTime(),
            height: 500,
            width: 700,
            controls:[]
        }).then(ref => {
            this.props.history.push('/edit/'+ref.id);
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
        <div className="dashboard container">
            <div className="row">
                <div className="col s12 m4">
                    <br></br>
                    <span className = "home-header">Recent Work</span>
                    <DiagramLinks />
                </div>

                <div className="col s8">
                    <div className="banner">
                        Wireframer&trade;<br />
                    </div>
                    
                    <div className="center">
                            <Button className="blue-grey white-text waves-effect waves-light btn-large create-btn" onClick ={this.handleNewDiagram}>
                                Create New Wireframe Diagram
                            </Button>
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
      {collection: 'diagrams', orderBy: ['timeUpdated', 'desc']},
    ]),
)(HomeScreen);