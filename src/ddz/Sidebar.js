import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import iconHome from './images/icon-home.png';
import iconSVideo from './images/icon-svideo.png';
import iconMatch from './images/icon-match.png';
import iconVideo from './images/icon-video.png';

class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            home: 0
        };
    }

    render(){
        return (
            <div className="sidebar">
                <NavLink exact to="/">
                    <img src={iconHome} alt=""/>
                    首页
                </NavLink>
                <NavLink to="/tab/video">
                    <img src={iconVideo} alt=""/>
                    视频
                </NavLink>
                <NavLink to="/match">
                    <img src={iconMatch} alt=""/>
                    赛事
                </NavLink>
            </div>
        )
    }

    componentDidMount(){

    }

    shouldComponentUpdate(){
        return true;
    }

}

export default Sidebar;