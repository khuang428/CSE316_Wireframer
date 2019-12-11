import React, { Component } from 'react';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import Modal from 'react-materialize/lib/Modal';
import Button from 'react-materialize/lib/Button';
import { firestore } from 'firebase';

class DiagramCard extends Component {

    updateTime = (id) => {
        const fireStore = getFirestore();
        fireStore.collection('diagrams').doc(id).update({timeUpdated:new Date().getTime()});
    }

    handleDelete = () => {
        //remove diagram
        const fireStore = getFirestore();
        fireStore.collection('diagrams').doc(this.props.diagram.id).delete();
    }

    render() {
        const { diagram } = this.props;
        return (
            <div className = "row">
                <div className = "col s10">
                    <Link to={'/edit/' + diagram.id}  onClick={()=> this.updateTime(diagram.id)}> 
                        <div className="blue-grey card z-depth-1 diagram-link">
                            <div className="card-content white-text center">
                                <span className="card-title">{diagram.name}</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className = "col s2 delete-list">
                    <Modal header = "Delete Wireframe Diagram?" options={{dismissible: false}} trigger={<i className="material-icons medium right grey-text text-darken-2">clear</i>}
                        actions={[<Button className="blue-grey darken-1" onClick={this.handleDelete} modal="close">Yes</Button>,<Button className="blue-grey darken-1" modal="close">No</Button>]}>
                            <p>
                                Are you sure you want to delete this diagram?
                            </p>
                            <p className = "bold-text">
                                It will not be retrievable.
                            </p>

                    </Modal>
                </div>
            </div>
        );
    }
}
export default DiagramCard;