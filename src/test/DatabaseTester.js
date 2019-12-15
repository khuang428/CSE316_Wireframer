import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import testJson from './TestDiagramsData.json';
import { getFirestore } from 'redux-firestore';
import { compose } from 'redux';
import { firebaseConnect, firestoreConnect} from 'react-redux-firebase';
import { registerHandler } from '../store/database/asynchHandler';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('diagrams').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('diagrams').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        testJson.diagrams.forEach(diagramJson => {
            fireStore.collection('diagrams').add({
                    name: diagramJson.name,
                    owner: diagramJson.owner,
                    height: diagramJson.height,
                    width: diagramJson.width,
                    timeUpdated: new Date().getTime(),
                    controls: diagramJson.controls,      
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });

    }

    render() {
        if(this.props.users){
            const currUserId = this.props.auth.uid;
            const currUser = this.props.users.find(function(user){return user.id == currUserId});
            if(!currUser.admin){
            
                return <Redirect to="/" />;
            }
        }
        
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        users: state.firestore.ordered.users
    };
}

const mapDispatchToProps = dispatch => ({
    register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
  });

export default compose(firebaseConnect(), connect(mapStateToProps, mapDispatchToProps),firestoreConnect([{collection: "users"}]))(DatabaseTester);