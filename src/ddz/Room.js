import React, { Component } from 'react';
import './Room.scss';
import '../component/videoPlay/dsVideo.scss';
import dsVideo from '../component/videoPlay/dsVideo';
import RongIMC from '../component/RongIMClient';
import Zan from '../component/Zan';

import 'babel-polyfill';

class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            commentText: '',
            commentBar: 2
        };

        this.createScript = this.createScript.bind(this);
        this.connectRongIM = this.connectRongIM.bind(this);
        this.setCommentText = this.setCommentText.bind(this);
    }

    createScript (mainUrl, callback) {
        let oScript = document.createElement('script');
        oScript.src = mainUrl;
        if (oScript.readyState) {
            oScript.onreadystatechange = ()=>{
                if (oScript.readyState == 'loaded' || oScript.readyState == 'complete') {
                    oScript.onreadystatechange = null;
                    if (callback) {
                        callback();
                    }
                }
            }
        } else {
            oScript.onload = ()=>{
                if (callback) {
                    callback();
                }
            }
        }
        document.getElementsByTagName('head').item(0).appendChild(oScript);
    }

    connectRongIM(token,chatroom_id){
        new RongIMC(window.appKey,token,chatroom_id,{
            zan: ()=>{
                new Zan(this.refs.zan);
            }
        });
    }

    setCommentText(event){
        this.setState({
            commentText: event.target.value
        });
    }

    render(){
        return (
            <div className="body room">

                <div ref="video">

                    {
                        this.state.commentBar === 1 && <div className="ds-comment">
                            <input type="text" placeholder="发表评论" onChange={this.setCommentText}/>
                            <a onClick={this.comment}>发送</a>
                        </div>
                    }

                    <div ref="zan" className="ds-zan"/>
                </div>

            </div>
        )
    }

    componentDidMount(){

        fetch(hostUrl + '/ttdz/room?chatroom_id=' + this.props.match.params.videoId + '&has_im_token=0').then((res)=>res.json()).then((json)=>{

            if(json.code === 0) {

                this.video = new dsVideo(this.refs.video,{
                    src: json.data.url,
                    poster: json.data.cover,
                    title: json.data.title,
                    controlBar: json.data.status !== 1,
                    stopPropagationEle: ['input','a']
                });

                this.setState({
                    commentBar: json.data.source === 3 ? 0 : json.data.status
                });

                if(json.data.status === 1){
                    this.createScript('//cdn.ronghub.com/RongIMLib-2.2.4.min.js',()=>{
                        this.connectRongIM('j5xBcqcT9kd6kQ0ENlyJQ5mjEG5jvVwFAhqOhoeLE7gWUiiGw88YAh4fJ47k182ImOjpMoVXgGQx0yPBOzLiSI6oPtp9Y7Ok',json.data.chatroom_id);
                    });
                }
            }
            else{

            }

        }).catch((error)=>{

        });
    }

    componentWillUnmount(){
        this.video.remove();
    }
}

export default Room;