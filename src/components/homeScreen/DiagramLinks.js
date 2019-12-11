import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DiagramCard from './DiagramCard';

class DiagramLinks extends Component {

    render() {
        const diagrams = this.props.diagrams;
        return (
            <div className="section">
                {diagrams && diagrams.map(diagram => diagram.owner == this.props.auth.uid?(
                    <DiagramCard diagram={diagram} key ={diagram.id} auth = {this.props.auth}/>
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