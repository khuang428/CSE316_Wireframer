import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import Button from 'react-materialize/lib/Button';

import Control from './Control';

class EditScreen extends Component{
  state = {
    name: this.props.diagram.name,
    zoom: 1,
    height: this.props.diagram.height,
    width: this.props.diagram.width,
    controls: this.props.diagram.controls,
    hasChanged: false
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value, hasChanged: true});
  }

  render(){
      const auth = this.props.auth;
      const diagram = this.props.diagram;
      if (!auth.uid) {
          return <Redirect to="/" />;
      }
      if(diagram == null){
        return <React.Fragment/>
      }
      return (
          <div className = "row">
            <div className = "col s3 left util-bar">
              <div className = "card diagram-controls">
                <Button><i className="material-icons zoom-btn">zoom_in</i></Button>&nbsp;
                <Button><i className="material-icons zoom-btn">zoom_out</i></Button>&nbsp;
                <Button>Save</Button>&nbsp;
                <Button>Close</Button>
              </div>
              <label htmlFor="diagram_name" className="active">Diagram Name</label>
              <input type = "text" id = "diagram_value" value = {this.state.name} onChange = {this.handleNameChange}></input>
              <div className = "control-select-container grey">
              
              </div>
            </div>
            <div className = "col s6 wireframe-container">
              <div className = "wireframe-display" style = {{height: this.state.height, width: this.state.width}}>
                
              {this.state.controls.map(control => (
                <Control control = {control}></Control>
              ))}
              </div>
            </div>
            <div className = "col s3 right util-bar">
              <div className = "card">filler filler</div>
            </div>
          </div>
      )
  }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { diagrams } = state.firestore.data;
    const diagram = diagrams ? diagrams[id] : null;
    if(diagram != null){
      diagram.id = id;
    }
  
    return {
      diagram,
      auth: state.firebase.auth,
    };
  };
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'diagrams' },
    ]),
  )(EditScreen);