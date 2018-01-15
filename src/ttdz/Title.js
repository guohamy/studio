import React, { Component } from 'react';
import './Title.scss';

class Title extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <span className="global-title">
                <img src={this.props.icon} alt=""/>
                {this.props.title}
            </span>
        )
    }

}

export default Title;