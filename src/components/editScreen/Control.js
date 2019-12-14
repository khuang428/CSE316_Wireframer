import React, { Component } from 'react';
import { Rnd } from 'react-rnd';

class Control extends Component{
    render(){
        let {control} = this.props;

        return (
            <Rnd className = "control"
                 scale = {this.props.scale}
                 onDragStop={(e,d) => {control.position[0] = d.x; control.position[1] = d.y}}
                 onResizeStop={(e, direction, ref, delta, position) => {control.height = ref.style.height; control.width = ref.style.width}}
                 default = {{
                     x: control.position[0],
                     y: control.position[1],
                     height: control.height,
                     width: control.width,
                 }}
                 style ={{ 
                fontSize: control.fontSize + "px",
                color: control.textColor,
                backgroundColor: control.backgroundColor,
                border: "solid " + " " + control.borderColor + " " + control.borderThickness + "px",
                borderRadius: control.borderRadius + "px"
              }} id = {this.props.id}>
                  {control.text}
            </Rnd>
            
        )
        
    }
}

export default Control;