import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

  handleOnResizeDrag = () => {
    this.setState({hasChanged: true});
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value, hasChanged: true, hasSaved: false});
  }

  handleZoom = (multiplier) => {
    this.setState({zoom: this.state.zoom*multiplier}, function(){document.getElementById("display").click()});
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
        if(e.target.value > 100){
          controlToChange.fontSize = 100;
        }else{
          controlToChange.fontSize = e.target.value;
        }
        break;
      case("control-text-color"):
        controlToChange.textColor = e.target.value;
        break;
      case("control-background-color"):
        controlToChange.backgroundColor = e.target.value;
        break;
      case("control-border-color"):
        controlToChange.borderColor = e.target.value;
        break;
      case("control-border-thickness"):
        if(e.target.value > 100){
          controlToChange.borderThickness = 100;
        }else{
          controlToChange.borderThickness = e.target.value;
        }
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
    //delete
    if(e.keyCode == 46 && this.state.selectedControl != null){
      e.preventDefault();
      let controlToDelete = this.state.selectedControl;
      this.setState({controls:this.state.controls.filter(function(val){return val != controlToDelete}), selectedControl: null, hasChanged: true, hasSaved: false});
    }
    //duplicate
    if(e.ctrlKey && e.keyCode == 68 && this.state.selectedControl != null){
      e.preventDefault();
      console.log("woop");
      let controlToDupe = this.state.selectedControl;
      let newControl = {
        position: [controlToDupe.position[0] + 100, controlToDupe.position[1] + 100],
        width: controlToDupe.width,
        height: controlToDupe.height,
        type: controlToDupe.type,
        text: controlToDupe.text,
        fontSize: controlToDupe.fontSize,
        textColor: controlToDupe.textColor,
        backgroundColor: controlToDupe.backgroundColor,
        borderColor: controlToDupe.borderColor,
        borderThickness: controlToDupe.borderThickness,
        borderRadius: controlToDupe.borderRadius
      }
      let controls = this.state.controls;
      controls.push(newControl);
      this.setState({controls: controls, selectedControl: newControl, hasChanged: true, hasSaved: false});
    }
  }

  handleNewControl = (e) => {
    let controls = this.state.controls;
    switch(e.target.id){
      case("add-container"):
        controls.push({
          position: [0,0],
          width: this.state.width/3,
          height: this.state.height/3,
          type: "container",
          text: "",
          fontSize: 0,
          textColor: "#000000",
          backgroundColor: "#ffffff",
          borderColor: "#000000",
          borderThickness: 1,
          borderRadius: 0
        });
        this.setState({controls: controls, hasChanged: true, hasSaved: false});
        break;
      case("add-label"):
        controls.push({
          position: [0,0],
          width: this.state.width/5,
          height: this.state.height/15,
          type: "label",
          text: "Prompt For Input: ",
          fontSize: 12,
          textColor: "#000000",
          backgroundColor: "transparent",
          borderColor: "#000000",
          borderThickness: 0,
          borderRadius: 0
        });
        this.setState({controls: controls, hasChanged: true, hasSaved: false});
        break;
      case("add-button"):
        controls.push({
          position: [0,0],
          width: this.state.width/10,
          height: this.state.height/20,
          type: "button",
          text: "Submit",
          fontSize: 12,
          textColor: "#000000",
          backgroundColor: "#dddddd",
          borderColor: "#000000",
          borderThickness: 1,
          borderRadius: 0
        });
        this.setState({controls: controls, hasChanged: true, hasSaved: false});
        break;
      case("add-textfield"):
        controls.push({
          position: [0,0],
          width: this.state.width/5,
          height: this.state.height/20,
          type: "textfield",
          text: "Input",
          fontSize: 12,
          textColor: "#afafaf",
          backgroundColor: "#ffffff",
          borderColor: "#000000",
          borderThickness: 1,
          borderRadius: 0
        });
        this.setState({controls: controls, hasChanged: true, hasSaved: false});
        break;
      default:
        break;
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
            <div className = "col s2 left util-bar">
              <div className = "card diagram-controls">
                {this.state.zoom == 4 ? <Button className = "disabled blue-grey white-text" onClick = {() => this.handleZoom(2.0)}><i className="material-icons zoom-btn">zoom_in</i></Button>
                                      : <Button className = "blue-grey white-text" onClick = {() => this.handleZoom(2.0)}><i className="material-icons zoom-btn">zoom_in</i></Button>}
                {this.state.zoom == 0.25 ? <Button className = "disabled blue-grey white-text" onClick = {() => this.handleZoom(0.5)}><i className="material-icons zoom-btn">zoom_out</i></Button>
                                      : <Button className = "blue-grey white-text" onClick = {() => this.handleZoom(0.5)}><i className="material-icons zoom-btn">zoom_out</i></Button>}
                {this.state.hasChanged ? <Button className = "save-btn blue-grey white-text" onClick = {this.handleSave}>Save</Button> : <Button disabled className = "save-btn">Save</Button>}
                {this.state.hasSaved ? <Link to="/"><Button className = "close-btn blue-grey white-text">Close</Button></Link>
                                     : <Modal header="Leave Without Saving?" options={{dismissible: false}} trigger={<Button className = "close-btn blue-grey white-text">Close</Button>}
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
              <hr style = {{borderColor: "#e0e0e0"}}></hr>
              <div className = "control-select-container">
                <p className = "control-select-header">Add Control</p>
                <div className = "control-selection">
                  <div className = "container" id = "add-container" onClick = {this.handleNewControl}></div>
                  Container
                </div>
                <hr style = {{borderColor: "#e0e0e0"}}></hr>
                <div className = "control-selection">
                  <div id = "add-label" onClick = {this.handleNewControl}>Prompt For Input:</div>
                  Label
                </div>
                <hr style = {{borderColor: "#e0e0e0"}}></hr>
                <div className = "control-selection">
                  <div id = "add-button" onClick = {this.handleNewControl}>Submit</div>
                  Button
                </div>
                <hr style = {{borderColor: "#e0e0e0"}}></hr>
                <div className = "control-selection">
                <div id = "add-textfield" onClick = {this.handleNewControl}>Input</div>
                  Textfield
                </div>
              </div>
            </div>
            <div className = "col s8 wireframe-container">
              <div className = "wireframe-display" id = "display" onClick = {(e) =>this.handleClick(e)} style = {{height: this.state.height + "px", width: this.state.width + "px", transform: "scale("+ this.state.zoom +")"}}>
                
              {this.state.controls.map(control => (
                <Control handleOnResizeDrag = {this.handleOnResizeDrag} selected = {control == this.state.selectedControl} scale = {this.state.zoom} control = {control} key = {this.state.controls.indexOf(control)} id = {this.state.controls.indexOf(control)} onClick = {(e) => this.handleClick(e)}></Control>
              ))}
              </div>
            </div>
            <div className = "col s2 right util-bar">
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
                  <label htmlFor="control-text-color">Text Color:&nbsp;</label>
                  {this.state.selectedControl.type == "container" ? <input disabled type = "color" id = "control-text-color" value = ""></input>
                                                                  : <input type = "color" id = "control-text-color" value = {this.state.selectedControl.textColor} onChange = {e => this.handlePropertyChange(e)}></input>
                  }
                  <br></br>
                  <label htmlFor="control-background-color">Background Color:&nbsp;</label>
                  {this.state.selectedControl.type == "label" ? <input disabled type = "color" id = "control-background-color" value = "white"></input>
                                                              : <input type = "color" id = "control-background-color" value = {this.state.selectedControl.backgroundColor} onChange = {e => this.handlePropertyChange(e)}></input>
                  }
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