import React, { Component } from 'react';
import { SSL_OP_SINGLE_DH_USE } from 'constants';

class Control extends Component{
    render(){
        let {control} = this.props;
        switch(control.type){
            case "container":
                return(
                    <div className = "control-container" style ={{left: control.position[0], 
                                                                  top: control.position[1], 
                                                                  width: control.width,
                                                                  height: control.height,
                                                                  backgroundColor: control.backgroundColor,
                                                                  border: "solid",
                                                                  borderColor: control.borderColor,
                                                                  borderWidth: control.borderThickness,
                                                                  borderRadius: control.borderRadius
                                                                }}></div>
                )
            case "label":
                    return(
                        <div className = "control-label" style ={{left: control.position[0], 
                                                                      top: control.position[1], 
                                                                      width: control.width,
                                                                      height: control.height,
                                                                      fontSize: control.fontSize,
                                                                      color: control.textColor,
                                                                      backgroundColor: control.backgroundColor,
                                                                      border: "solid",
                                                                      borderColor: control.borderColor,
                                                                      borderWidth: control.borderThickness,
                                                                      borderRadius: control.borderRadius
                                                                    }}>{control.text}</div>
                    )
            case "button":
                    return(
                        <div className = "z-depth 2 control-button" style ={{left: control.position[0], 
                                                                      top: control.position[1], 
                                                                      width: control.width,
                                                                      height: control.height,
                                                                      fontSize: control.fontSize,
                                                                      color: control.textColor,
                                                                      backgroundColor: control.backgroundColor,
                                                                      border: "solid",
                                                                      borderColor: control.borderColor,
                                                                      borderWidth: control.borderThickness,
                                                                      borderRadius: control.borderRadius,
                                                                    }}>{control.text}</div>
                    )
            case "textfield":
                    return(
                        <div className = "control-textfield" style ={{left: control.position[0], 
                                                                      top: control.position[1], 
                                                                      width: control.width,
                                                                      height: control.height,
                                                                      fontSize: control.fontSize,
                                                                      color: control.textColor,
                                                                      backgroundColor: control.backgroundColor,
                                                                      border: "solid",
                                                                      borderColor: control.borderColor,
                                                                      borderWidth: control.borderThickness,
                                                                      borderRadius: control.borderRadius
                                                                    }}>{control.text}</div>
                    )
            default:
                return;
        }
    }
}

export default Control;