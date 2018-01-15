import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import iconTv from './images/icon-tv.png';
import iconTeach from './images/icon-teach.png';
import iconMatch from './images/icon-match.png';
import iconVideo from './images/icon-video.png';

class Sidebar extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="sidebar">
                <NavLink exact to="/">
                    <img src={iconTv} alt=""/>
                    直播
                </NavLink>
                <NavLink to="/tab/teach">
                    <img src={iconTeach} alt=""/>
                    教学
                </NavLink>
                <NavLink to="/tab/match">
                    <img src={iconMatch} alt=""/>
                    赛事
                </NavLink>
                <NavLink to="/tab/video">
                    <img src={iconVideo} alt=""/>
                    视频
                </NavLink>
            </div>
        )
    }

}

export default Sidebar;