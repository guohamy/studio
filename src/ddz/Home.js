import React, { Component } from 'react';
import Swiper from 'Swiper';
import 'Swiper/dist/css/swiper.css';
import './Home.scss';
import { Link } from 'react-router-dom';
import Title from './Title';
import Cover from './Cover';
import 'babel-polyfill';

import iconLove from './images/icon-love.png';
import iconHot from './images/icon-hot.png';
import iconKeep from './images/icon-keep.png';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            top: {},
            banner: [],
            live: [],
            svideo: [],
            video: []
        };
    }

    componentWillMount(){
    }

    render(){
        return (
            <div className="body home pd20">
                <div className="swiper-container swiper-banner">
                    <div className="swiper-wrapper">
                        {
                            this.state.banner.map((value,index)=>{
                                return (
                                    <div key={index} className="swiper-slide">
                                        <a href={value.url}>
                                            <Cover width={554} height={254} poster={value.pic} />
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    this.state.live.length >0 && <div>
                        <Title icon={iconHot} title="正在直播"/>
                        <div className="swiper-container swiper-video swiper-live">
                            <div className="swiper-wrapper">
                                {
                                    this.state.live.map((value,index)=>{
                                        return (
                                            <div key={index} className="swiper-slide">
                                                <Link to={'/room/' + value.chatroom_id}>
                                                    {
                                                        index <= 4 ? <Cover width={272} height={154} poster={value.cover} title={value.title} /> : <Cover lazyload width={272} height={154} poster={value.cover} title={value.title} />
                                                    }
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }
                <Title icon={iconLove} title="小视频"/>
                <div className="swiper-container swiper-video swiper-svideo">
                    <div className="swiper-wrapper">
                        {
                            this.state.svideo.map((value,index)=>{
                                return (
                                    <div key={index} className="swiper-slide">
                                        <Link to={'/room/' + value.chatroom_id}>
                                            {
                                                index <= 4 ? <Cover width={272} height={154} poster={value.cover} title={value.title} /> : <Cover lazyload width={272} height={154} poster={value.cover} title={value.title} />
                                            }
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Title icon={iconKeep} title="精彩视频"/>
                <div className="swiper-container swiper-video swiper-playback">
                    <div className="swiper-wrapper">
                        {
                            this.state.video.map((value,index)=>{
                                return (
                                    <div key={index} className="swiper-slide">
                                        <Link to={'/room/' + value.chatroom_id}>
                                            {
                                                index <= 4 ? <Cover width={272} height={154} poster={value.cover} title={value.title} /> : <Cover lazyload width={272} height={154} poster={value.cover} title={value.title} />
                                            }
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.myBannerSwiper = new Swiper ('.swiper-banner', {
            slidesPerView: 'auto',
            spaceBetween: 0
        });

        this.mySVideoSwiper = new Swiper ('.swiper-svideo', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            watchSlidesVisibility: true,
            lazy: {
                loadPrevNext: true
            }
        });

        this.myPlaybackSwiper = new Swiper ('.swiper-playback', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            watchSlidesVisibility: true,
            lazy: {
                loadPrevNext: true
            }
        });

        fetch(hostUrl + '/ddz/home').then((res)=>res.json()).then((json)=>{

            if(json.code === 0) {

                this.setState({
                    top: json.data.top,
                    banner: json.data.banner,
                    live: json.data.live,
                    svideo: json.data.small_video.list,
                    video: json.data.playback
                },()=>{
                    this.myBannerSwiper.update();
                    this.mySVideoSwiper.update();
                    this.myPlaybackSwiper.update();

                    this.state.live.length >0 && new Swiper ('.swiper-live', {
                        slidesPerView: 'auto',
                        spaceBetween: 0,
                        watchSlidesVisibility: true,
                        lazy: {
                            loadPrevNext: true
                        }
                    });

                });

            }
            else{

            }

        }).catch((error)=>{

        });
    }
}

export default Home;