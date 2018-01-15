import React, { Component } from 'react';
import './Room.scss';
import '../component/videoPlay/dsVideo.scss';
import dsVideo from '../component/videoPlay/dsVideo';
import RongIMC from '../component/RongIMClient';
import Zan from '../component/Zan';
import Danmu from '../component/Danmu';
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
        this.comment = this.comment.bind(this);
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
        this.rongIMC = new RongIMC(window.appKey,token,chatroom_id,{
            zan: ()=>{
                new Zan(this.refs.zan);
            },
            danmu: (name,text)=>{
                new Danmu(this.refs.danmu,{
                    name: name,
                    text: text
                }).addDanmu();
            }
        });
    }

    setCommentText(event){
        this.setState({
            commentText: event.target.value
        });
    }

    comment(){
        this.rongIMC.sendMsg('天天德州用户' + Math.floor(Math.random()*899999 + 100000),this.state.commentText,()=>{
            this.setState({
                commentText: ''
            });
        });
    }

    render(){
        return (
            <div className="body room">

                <div ref="video">

                    {
                        this.state.commentBar === 1 && <div className="ds-comment">
                            <input type="text" value={this.state.commentText} placeholder="发表评论" onChange={this.setCommentText}/>
                            <a onClick={this.comment}>发送</a>
                        </div>
                    }

                    <div ref="zan" className="ds-zan"/>
                    <div ref="danmu" className="ds-danmu"/>
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
                        this.connectRongIM('pFCwf7rfTv9dVyWH30JY/ZmjEG5jvVwFAhqOhoeLE7gbgArBjoCLLMI/PzqQXzHPvtIGr9s18lvMPUSLaFQ3H+pQzlSxTcWB',json.data.chatroom_id);
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