class RongIMC {
    constructor(Appkey,Token,RoomID,Fn){
        this.Appkey = Appkey;
        this.Token = Token;
        this.RoomID = RoomID;

        this.Fn = Object.assign({
            zan: ()=>{
                console.log('点赞');
            },
            danmu: (name, text)=>{
                console.log(name + '：' + text);
            }
        },Fn);
        this.init();
    }

    init(){
        RongIMClient.init(this.Appkey);
        let conversationtype = RongIMLib.ConversationType.CHATROOM;

        RongIMClient.connect(this.Token, {
            onSuccess: (uid)=>{
                console.log("Login successfully." + uid);
                RongIMClient.getInstance().joinChatRoom(this.RoomID, 0, {
                    onSuccess: function() {
                        // 加入聊天室成功。
                    },
                    onError: function(error) {
                        // 加入聊天室失败
                    }
                });
            },
            onTokenIncorrect: ()=>{
                //TOKEN无效
            },
            onError: (errorCode)=> {
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        //'超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        //'未知错误';
                        break;
                    case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                        //'不可接受的协议版本';
                        break;
                    case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                        //'appkey不正确';
                        break;
                    case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                        //'服务器不可用';
                        break;
                }
            }
        });

        RongIMClient.setConnectionStatusListener({
            onChanged: (status)=> {
                switch (status) {
                    //链接成功
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功');
                        break;
                    //正在链接
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                        break;
                    //重新链接
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                        break;
                    //其他设备登录
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录');
                        break;
                    //网络不可用
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用');
                        break;
                }
            }
        });

        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: (message)=>{
                // 判断消息类型
                switch(message.messageType){
                    case RongIMClient.MessageType.TextMessage:
                        // 发送的消息内容将会被打印
                        this.getMsg(message);
                        break;
                    default:
                    // 自定义消息
                    // do something...
                }
            }
        });
    }

    getMsg(msg){
        let msg_obj = typeof(msg.content.content) === 'string' ? JSON.parse(msg.content.content) : msg.content.content;
        //业务可以自定义设置消息的显示样式
        switch (msg_obj.type) {
            case 1:
                this.Fn.danmu(msg_obj.data.nick,msg_obj.data.text);
                break;
            case 2:
                /* 进来了 */
                break;
            case 3:
                /* 离开 */
                break;
            case 4:
                this.Fn.zan();
                break;
            default:
                break;
        }
    }

    onSendMsg(msg,callback = ()=>{console.log('发送成功')}) {
        RongIMClient.getInstance().sendMessage(RongIMLib.ConversationType.CHATROOM, this.RoomID, msg, {
            onSuccess: (message)=> {
                //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                this.getMsg(message);
                callback();
            },
            onError: (errorCode, message)=> {
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        //'超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        //'未知错误';
                        break;
                    case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                        //'在黑名单中，无法向对方发送消息';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                        //'不在讨论组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_GROUP:
                        //'不在群组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                        //'不在聊天室中';
                        break;
                    default:
                        break;
                }
            }
        });
    }

    sendMsg(name,text,callback) {
        this.onSendMsg(new RongIMLib.TextMessage({
            content: JSON.stringify({
                type: 1,
                data: {
                    uid: 1,
                    nick: name,
                    photo_url: '',
                    text: text
                }
            })
        }),()=>{callback()});
    }
}

export default RongIMC;