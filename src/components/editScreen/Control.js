import React, { Component } from 'react';
import { SSL_OP_SINGLE_DH_USE } from 'constants';

class Control extends Component{
    render(){
        let {control} = this.props;
        switch(control.type){
            case "container":
                return(
                    <div className = "control control-container" style ={{left: control.position[0], 
                                                                  top: control.position[1], 
                                                                  width: control.width,
                                                                  height: control.height,
                                                                  backgroundColor: control.backgroundColor,
                                                                  border: "solid " + " " + control.borderColor + " " + control.borderThickness + "px",
                                                                  borderRadius: control.borderRadius + "px"
                                                                }} id = {this.props.id}></div>
                )
            case "label":
                    return(
                        <div className = "control control-label" style ={{left: control.position[0], 
                                                                      top: control.position[1], 
                                                                      width: control.width,
                                                                      height: control.height,
                                                                      fontSize: control.fontSize + "px",
                                                                      color: control.textColor,
                                                                      backgroundColor: control.backgroundColor,
                                                                      border: "solid " + " " + control.borderColor + " " + control.borderThickness + "px",
                                                                      borderRadius: control.borderRadius + "px"
                                                                    }} id = {this.props.id}>{control.text}</div>
                    )
            case "button":
                    return(
                        <div className = "z-depth 2 control control-button" style ={{left: control.position[0], 
                                                                      top: control.position[1], 
                                                                      width: control.width,
                                                                      height: control.height,
                                                                      fontSize: control.fontSize + "px",
                                                                      color: control.textColor,
                                                                      backgroundColor: control.backgroundColor,
                                                                      border: "solid " + " " + control.borderColor + " " + control.borderThickness + "px",
                                                                      borderRadius: control.borderRadius + "px"
                                                                    }} id = {this.props.id}>{control.text}</div>
                    )
            case "textfield":
                    return(
                        <div className = "control control-textfield" style ={{left: control.position[0], 
                                                                      top: control.position[1], 
                                                                      width: control.width,
                                                                      height: control.height,
                                                                      fontSize: control.fontSize + "px",
                                                                      color: control.textColor,
                                                                      backgroundColor: control.backgroundColor,
                                                                      border: "solid " + " " + control.borderColor + " " + control.borderThickness + "px",
                                                                      borderRadius: control.borderRadius + "px"
                                                                    }} id = {this.props.id}>{control.text}</div>
                    )
            default:
                return;
        }
    }
}

export default Control;