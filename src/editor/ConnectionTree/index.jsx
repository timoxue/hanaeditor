import React from 'react';
import {Treebeard, decorators} from 'react-treebeard';
import theme from './theme.jsx'

const modifiedDecorators = Object.assign({},decorators, {
    //nothing now
});

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
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
                data={data}
                onToggle={this.onToggle}
                decorators={modifiedDecorators}
                style={theme}
            />
        );
    }
}

export default ConnectionTree