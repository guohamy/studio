import React, { Component } from 'react';
import './Match.scss';
import { Link } from 'react-router-dom';
import Cover from './Cover';
import Title from './Title';
import 'babel-polyfill';

import iconKeep from './images/icon-keep.png';
import M7 from './images/m7.jpg';
import M6 from './images/m6.jpg';
import M5 from './images/m5.jpg';
import M4 from './images/m4.jpg';
import M3 from './images/m3.jpg';
import M2 from './images/m2.jpg';
import M1 from './images/m1.jpg';

class Match extends Component {
    constructor(props){
        super(props);
        this.state = {
            game: {}
        };
    }

    render(){
        const list = [
            {
                chatroom_id: 'z1.app-release.5a1a2894a95be72e6c6539d3',
                title: '斗地主黄金联赛决赛',
                cover: M7
            },
            {
                chatroom_id: 'z1.app-release.5a1948e5a95be72e6c5e7e15',
                title: '半决赛第六场',
                cover: M6
            },
            {
                chatroom_id: 'z1.app-release.5a18f3a4bad7cf300b4c99c7',
                title: '半决赛第五场',
                cover: M5
            },
            {
                chatroom_id: 'z1.app-release.59fd9671d425e14fcf68b5d5',
                title: '半决赛第四场',
                cover: M4
            },
            {
                chatroom_id: 'z1.app-release.59fd42d5d425e14fcf6472d8',
                title: '半决赛第三场',
                cover: M3
            },
            {
                chatroom_id: 'z1.app-release.59e1fdd0a95be75a6928aca2',
                title: '半决赛第二场',
                cover: M2
            },
            {
                chatroom_id: 'z1.app-release.59e199d8d425e1633323843e',
                title: '半决赛第一场',
                cover: M1
            }
        ];
        return (
            <div className="body match pd20">
                <div className="header">
                    <img src={this.state.game.cover} alt=""/>
                    <div className="detail">
                        <h3>{this.state.game.title}</h3>
                        <p>{this.state.game.introduce}</p>
                    </div>
                </div>
                <div className="detail outside">
                    <p>赛事奖励：{this.state.game.rewards}</p>
                    <p>赛事规则：{this.state.game.rule}</p>
                    <p>比赛赛程：{this.state.game.schedule}</p>
                </div>
                <Title icon={iconKeep} title="相关视频"/>
                <div className="items">
                    {
                        list.map((value,index)=>{
                            return (
                                <div key={index} className="item">
                                    <Link to={'/room/' + value.chatroom_id}>
                                        <Cover defaultHeight title={value.title} poster={value.cover} />
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    componentDidMount(){
        fetch(hostUrl + '/ddz/home').then((res)=>res.json()).then((json)=>{

            if(json.code === 0) {

                this.setState({
                    game: json.data.games[0]
                });

            }
            else{

            }

        }).catch((error)=>{

        });
    }
}

export default Match;