import React, { Component } from 'react';
import Swiper from 'Swiper';
import 'Swiper/dist/css/swiper.css';
import './Tab.scss';
import { Link } from 'react-router-dom';
import Cover from './Cover';
import 'babel-polyfill';

class Tab extends Component {
    constructor(props){
        super(props);
        this.state = {
            mark: 0,
            tab: [],
            video: []
        };

        this.changeTab = this.changeTab.bind(this);
        this.switchData = this.switchData.bind(this);
        this.setData = this.setData.bind(this);
    }

    changeTab(event){
        this.myTabSwiper.slideTo(Number.parseInt(event.target.dataset.tab));
    }

    switchData(tabId){
        this.myTabSwiper.slideTo(0,0);
        this.setState({
            mark: 0
        });

        if(tabId === 'video') {
            fetch(hostUrl + '/ddz/list').then((res)=>res.json()).then((json)=>{

                if(json.code === 0) {

                    this.setData(json.data.video);

                }
                else{

                }

            }).catch((error)=>{

            });
        }
    }

    setData(data){

        let video = [], tabs = [], list, tab = {};

        for(let i in data){

            tab = {};
            list = [];
            for(let j in data[i]){
                if(!Object.is(j,'cover') && !Object.is(j,'title') && !Object.is(j,'introduce')){
                    list.push(data[i][j]);
                }
            }
            video.push(list);
            tab.cover = data[i].cover;
            tab.title = data[i].title;
            tab.introduce = data[i].introduce;
            tabs.push(tab);

        }

        this.setState({
            tab: tabs,
            video: video
        },()=>{
            this.myTabSwiper.update();
        });

    }

    render(){
        return (
            <div className="body tab">

                <ul className="menu">
                    {
                        this.state.tab.map((value,index)=>{
                            return (
                                <li data-tab={index} data-current={Object.is(this.state.mark,index)} key={index} onClick={this.changeTab}>{value.title}</li>
                            )
                        })
                    }
                </ul>

                <div className="slider">
                    <div className="swiper-container swiper-tab">
                        <div className="swiper-wrapper">
                            {
                                this.state.video.map((value,index)=>{
                                    return (
                                        <div key={index} className="swiper-slide">

                                            <div className="header">
                                                <img src={this.state.tab[index].cover} alt=""/>
                                                <div className="detail">
                                                    <h3>{this.state.tab[index].title}</h3>
                                                    <p>{this.state.tab[index].introduce}</p>
                                                </div>
                                            </div>

                                            <div className="items">
                                                {
                                                    value.map((value,index)=>{
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
                                })
                            }

                        </div>
                    </div>
                </div>

            </div>
        )
    }

    componentDidMount(){
        this.myTabSwiper = new Swiper ('.swiper-tab', {
            on: {
                slideChangeTransitionStart: ()=>{
                    this.setState({
                        mark: this.myTabSwiper.activeIndex
                    });
                }
            }
        });

        this.switchData(this.props.match.params.tabId);

    }

    componentWillReceiveProps(nextProps){
        this.switchData(nextProps.match.params.tabId);
    }
}

export default Tab;