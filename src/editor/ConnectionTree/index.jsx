import React from 'react';
import {Treebeard, decorators} from 'react-treebeard';
import theme from './theme.jsx'

const modifiedDecorators = Object.assign({},decorators, {
    //nothing now
});

let data1 = {    
    name: 'root1',
    toggled: false
};


class ConnectionTree extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {};
        
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }

    render(){
        return (
            <Treebeard
                data={this.props.data}
                onToggle={this.onToggle}
                decorators={modifiedDecorators}
                style={theme}
            />
        );
    }
}

export default ConnectionTree