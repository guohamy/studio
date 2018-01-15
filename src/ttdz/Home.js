import React, { Component } from 'react';
import Swiper from 'Swiper';
import 'Swiper/dist/css/swiper.css';
import './Home.scss';
import { Link } from 'react-router-dom';
import Title from './Title';
import Cover from './Cover';
import statusLive from './images/icon-live.png';
import statusPlayBack from './images/icon-playback.png';
import iconLive from './images/icon-start.png';
import 'babel-polyfill';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            top: {},
            banner: {},
            live: []
        };
    }

    render(){
        return (
            <div className="body home pd20">

                <div className="home-main">

                    <Link to={'/room/' + this.state.top.chatroom_id} className="top">
                        <Title icon={Object.is(this.state.top.status,1) ? statusLive : statusPlayBack} title={this.state.top.title} />
                        <Cover width={850} height={548} icon={true} poster={this.state.top.cover} />
                    </Link>

                    <a href={this.state.banner.url} className="bottom">
                        <Cover width={850} height={82} poster={this.state.banner.pic} />
                    </a>
                </div>

                <div className="home-side">
                    <Title icon={iconLive} title="热门直播" />
                    <div className="swiper-container swiper-live">
                        <div className="swiper-wrapper">
                            {
                                this.state.live.map((value,index)=>{
                                    return (
                                        <div key={index} className="swiper-slide">
                                            <Link to={'/room/' + value.chatroom_id}>
                                                <Cover titlePd={true} title={value.title} poster={value.cover} />
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.mySwiper = new Swiper ('.swiper-live', {
            direction: 'vertical',
            slidesPerView: 'auto'
        });

        fetch(hostUrl + '/ttdz/list').then((res)=>res.json()).then((json)=>{

            if(json.code === 0) {

                this.setState({
                    top: json.data.top,
                    banner: json.data.banner[0],
                    live: json.data.live
                });

                this.mySwiper.update();
            }
            else{

            }

        }).catch((error)=>{

        });
    }
}

export default Home;