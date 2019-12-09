import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DiagramCard from './DiagramCard';
import { getFirestore } from 'redux-firestore';

class DiagramLinks extends React.Component {
    updateTime(id){
        const fireStore = getFirestore();
        fireStore.collection('diagrams').doc(id).update({timeUpdated:new Date().getTime()});
    }

    render() {
        const diagrams = this.props.diagrams;
        return (
            <div className="diagrams section">
                {diagrams && diagrams.map(diagram => diagram.owner == this.props.auth.uid?(
                    <Link to={'/edit/' + diagram.id} key ={diagram.id} onClick={()=> this.updateTime(diagram.id)}> 
                        <DiagramCard diagram={diagram} />
                    </Link>
                ):<></>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        diagrams: state.firestore.ordered.diagrams,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(DiagramLinks);