import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import Button from 'react-materialize/lib/Button';
import Modal from 'react-materialize/lib/Modal';

import Control from './Control';

class EditScreen extends Component{
  state = {
    name: this.props.diagram.name,
    zoom: 1,
    height: this.props.diagram.height,
    width: this.props.diagram.width,
    heightBox: this.props.diagram.height, //values in the textbox
    widthBox: this.props.diagram.width,
    controls: this.props.diagram.controls,
    dimensionChanged: false,
    hasChanged: false,
    hasSaved: true,
    selectedControl: null
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value, hasChanged: true, hasSaved: false});
  }

  handleZoom = (multiplier) => {
    this.setState({zoom: this.state.zoom*multiplier});
  }

  handleDimensionChange = (e) => {
    let dimension = parseInt(e.target.value);
    if(dimension < 1){
      this.setState({[e.target.id]: 1, dimensionChanged: true});
    }else if(dimension > 5000){
      this.setState({[e.target.id]: 5000, dimensionChanged: true});
    }else{
      this.setState({[e.target.id]: dimension, dimensionChanged: true});
    }
  }

  handleDimensionUpdate = () => {
    this.setState({height: this.state.heightBox, width: this.state.widthBox, dimensionChanged: false, hasChanged: true, hasSaved: false});
  }

  handleClick = (e) => {
    if(e.target.className.includes("control")){
      this.setState({selectedControl: this.state.controls[parseInt(e.target.id)]});
    }else{
      this.setState({selectedControl: null});
    }
  }

  handlePropertyChange = (e) => {
    let controlToChange = this.state.selectedControl;
    switch(e.target.id){
      case("control-text"):
        controlToChange.text = e.target.value;
        break;
      case("control-font-size"):
        controlToChange.fontSize = e.target.value;
        break;
      //TODO add color picker with hex values instead
      case("control-border-thickness"):
        controlToChange.borderThickness = e.target.value;
        break;
      case("control-border-radius"):
        controlToChange.borderRadius = e.target.value;
        break;
      default:
        break;
    }
    this.setState({selectedControl: controlToChange, hasChanged: true, hasSaved: false});
  }

  handleSave = () => {
    let fireStore = getFirestore();
    fireStore.collection("diagrams").doc(this.props.diagram.id).update({name: this.state.name,
                                                                        height: this.state.height,
                                                                        width: this.state.width,
                                                                        controls: this.state.controls});
    this.setState({hasChanged: false, hasSaved: true});
  }

  handleKeyPress = (e) => {
    if(e.keyCode == 46 && this.state.selectedControl != null){
      let controlToDelete = this.state.selectedControl;
      this.setState({controls:this.state.controls.filter(function(val){return val != controlToDelete}), selectedControl: null, hasChanged: true, hasSaved: false});
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);
}

  componentWillUnmount(){
      document.removeEventListener("keydown", this.handleKeyPress, false);
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
                {this.state.zoom == 4 ? <Button className = "disabled" onClick = {() => this.handleZoom(2.0)}><i className="material-icons zoom-btn">zoom_in</i></Button>
                                      : <Button onClick = {() => this.handleZoom(2.0)}><i className="material-icons zoom-btn">zoom_in</i></Button>}
                &nbsp;
                {this.state.zoom == 0.25 ? <Button className = "disabled" onClick = {() => this.handleZoom(0.5)}><i className="material-icons zoom-btn">zoom_out</i></Button>
                                      : <Button onClick = {() => this.handleZoom(0.5)}><i className="material-icons zoom-btn">zoom_out</i></Button>}
                &nbsp;
                {this.state.hasChanged ? <Button onClick = {this.handleSave}>Save</Button> : <Button disabled>Save</Button>}
                &nbsp;
                {this.state.hasSaved ? <Link to="/"><Button>Close</Button></Link>
                                     : <Modal header="Leave Without Saving?" options={{dismissible: false}} trigger={<Button>Close</Button>}
                                        actions={[<Link to="/"><Button className="blue-grey darken-1" modal="close">Yes</Button></Link>,<Button className="blue-grey darken-1" modal="close">No</Button>]}>
                                          <p className = "bold-text">Any changes you've made will not be retrievable. <br></br> Are you sure you want to leave?</p>
                                       </Modal>}
              </div>
              <label htmlFor="diagram-name" className="active">Diagram Name</label>
              <input type = "text" id = "diagram-name" value = {this.state.name} onChange = {this.handleNameChange}></input>
              <label htmlFor="diagram-height" className="active">Diagram Height</label>
              <input type = "number" min = '1' max = '5000' id = "heightBox" value = {this.state.heightBox} onChange = {this.handleDimensionChange}></input>
              <label htmlFor="diagram-width" className="active">Diagram Width</label>
              <input type = "number" min = '1' max = '5000' id = "widthBox" value = {this.state.widthBox} onChange = {this.handleDimensionChange}></input>
              {this.state.dimensionChanged?<Button onClick = {this.handleDimensionUpdate}>Update Dimensions</Button>
                                          :<Button className = "disabled" onClick = {this.handleDimensionUpdate}>Update Dimensions</Button>}
              <div className = "control-select-container grey">
              
              </div>
            </div>
            <div className = "col s6 wireframe-container">
              <div className = "wireframe-display" onClick = {(e) =>this.handleClick(e)} style = {{height: this.state.height, width: this.state.width, transform: "scale("+this.state.zoom +")"}}>
                
              {this.state.controls.map(control => (
                <Control control = {control} key = {this.state.controls.indexOf(control)} id = {this.state.controls.indexOf(control)} onClick = {(e) => this.handleClick(e)}></Control>
              ))}
              </div>
            </div>
            <div className = "col s3 right util-bar">
              {this.state.selectedControl == null ? <div></div>
                                                    :<div className = "control-properties">
                  <p className = "control-properties-header">Properties</p>
                  {this.state.selectedControl.type == "container" ? <label htmlFor="control-text">Text</label> 
                                                                  : <label htmlFor="control-text" className="active">Text</label>
                  }
                  {this.state.selectedControl.type == "container" ? <input disabled type = "text" id = "control-text" value = ""></input>
                                                                  : <input type = "text" id = "control-text" value = {this.state.selectedControl.text} onChange = {e => this.handlePropertyChange(e)}></input>
                  }
                  {this.state.selectedControl.type == "container" ? <label htmlFor="control-font-size">Font Size</label>
                                                                  : <label htmlFor="control-font-size" className="active">Font Size</label>
                  }
                  {this.state.selectedControl.type == "container" ? <input disabled type = "number" id = "control-font-size" value = ""></input>
                                                                  : <input type = "number" id = "control-font-size" value = {this.state.selectedControl.fontSize} onChange = {e => this.handlePropertyChange(e)}></input>
                  }                                                                
                  {this.state.selectedControl.type == "container" ? <label htmlFor="control-text-color">Text Color:&nbsp;</label>
                                                                  : <label htmlFor="control-text-color">Text Color:&nbsp;</label>
                  }
                  {this.state.selectedControl.type == "container" ? <input disabled type = "color" id = "control-text-color" value = ""></input>
                                                                  : <input type = "color" id = "control-text-color" value = {this.state.selectedControl.textColor} onChange = {e => this.handlePropertyChange(e)}></input>
                  }
                  <br></br>
                  <label htmlFor="control-background-color">Background Color:&nbsp;</label>
                  <input type = "color" id = "control-background-color" value = {this.state.selectedControl.backgroundColor} onChange = {e => this.handlePropertyChange(e)}></input>
                  <br></br>
                  <label htmlFor="control-border-color">Border Color:&nbsp;</label>
                  <input type = "color" id = "control-border-color" value = {this.state.selectedControl.borderColor} onChange = {e => this.handlePropertyChange(e)}></input>
                  <br></br> 
                  <label htmlFor="control-border-thickness" className="active">Border Thickness</label>
                  <input type = "number" id = "control-border-thickness" value = {this.state.selectedControl.borderThickness} onChange = {e => this.handlePropertyChange(e)}></input>
                  <label htmlFor="control-border-radius" className="active">Border Radius</label>
                  <input type = "number" id = "control-border-radius" value = {this.state.selectedControl.borderRadius} onChange = {e => this.handlePropertyChange(e)}></input>
                </div>
                }
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