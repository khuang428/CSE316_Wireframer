import React from 'react';

class DiagramCard extends React.Component {

    render() {
        const { diagram } = this.props;
        return (
            <div className="blue-grey card z-depth-1 diagram-link">
                <div className="card-content white-text center">
                    <span className="card-title">{diagram.name}</span>
                </div>
            </div>
        );
    }
}
export default DiagramCard;