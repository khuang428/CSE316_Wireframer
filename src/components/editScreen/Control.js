import React, { Component } from 'react';
import { Rnd } from 'react-rnd';

const handle = <div style ={{width: "100%", height: "100%", backgroundColor: "white", border: "solid black 1px"}}></div>;

class Control extends Component{

    
    render(){
        let {control} = this.props;
        if(this.props.selected){
            return (
                <Rnd className = "control"
                 bounds = "parent"
                 scale = {this.props.scale}
                 onDragStop={(e,d) => {control.position[0] = d.x; control.position[1] = d.y; this.props.handleOnResizeDrag()}}
                 onResizeStop={(e, direction, ref, delta, position) => {control.height = ref.style.height; control.width = ref.style.width; this.props.handleOnResizeDrag()}}
                 enableResizing = {
                    { top:false, right:false, bottom:false, left:false, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true }
                 }
                 resizeHandleComponent = {
                     {topRight: handle, topLeft: handle, bottomRight: handle, bottomLeft: handle}
                 }
                 position = {{x: control.position[0], y:control.position[1]}}
                 size = {{height: control.height, width: control.width}}
                 style ={{ 
                    fontSize: control.fontSize + "px",
                    color: control.textColor,
                    backgroundColor: control.backgroundColor,
                    border: "solid " + " " + control.borderColor + " " + control.borderThickness + "px",
                    borderRadius: control.borderRadius + "px",
                    transform: "scale(" + this.props.scale + ")!important"
                 }} id = {this.props.id} className={"control-"+control.type}>
                  {control.text}
            </Rnd>
            )
        }else{
            return (
                <Rnd className = "control"
                scale = {this.props.scale}
                disableDragging
                enableResizing = {
                    { top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }
                }
                position = {{x: control.position[0], y:control.position[1]}}
                size = {{height: control.height, width: control.width}}
                style ={{ 
               fontSize: control.fontSize + "px",
               color: control.textColor,
               backgroundColor: control.backgroundColor,
               border: "solid " + " " + control.borderColor + " " + control.borderThickness + "px",
               borderRadius: control.borderRadius + "px",
             }} id = {this.props.id} className={"control-"+control.type}>
                 {control.text}
            </Rnd>
            
            )
        }

        
    }
}

export default Control;