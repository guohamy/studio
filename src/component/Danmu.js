import {whichTransitionEvent} from './Fn';
import './Danmu.scss';

class Danmu {
    constructor(ele,option){
        this.option = Object.assign({
            name: '游客' + Math.floor(Math.random()*899999 + 100000),
            text: '支持一下'
        }, option);
        this.ele = ele;
    }

    addDanmu(){
        let t = this.getTop();
        let danmu = document.createElement('div');
        danmu.className = 'dd-item dd-item-' + t;
        danmu.style.top = (t-1)*0.52+'rem';
        danmu.style.animationTimingFunction = this.getPath();
        danmu.style.webkitAnimationTimingFunction = this.getPath();
        let b = document.createElement('b');
        b.innerHTML = this.option.name;
        danmu.appendChild(b);
        let text = document.createElement('span');
        text.innerHTML = this.option.text;
        danmu.appendChild(text);
        this.ele.appendChild(danmu);
        this.removeDanmu(danmu);
    }

    removeDanmu(o) {
        let transitionEvent = whichTransitionEvent('animation');
        if(transitionEvent){
            o.addEventListener(transitionEvent, function() {
                o.parentNode.removeChild(o);
            });
        }
    }

    getPath() {
        let i = Math.floor(Math.random() * 5) + 1;
        let atf = 'linear';
        switch (i) {
            case 1:
                atf = 'linear';
                break;
            case 2:
                atf = 'ease';
                break;
            case 3:
                atf = 'ease-in';
                break;
            case 4:
                atf = 'ease-out';
                break;
            case 5:
                atf = 'ease-in-out';
                break;
        }
        return atf;
    }

    getTop(){
        let _1n = document.getElementsByClassName('dd-item-1').length;
        let _2n = document.getElementsByClassName('dd-item-2').length;
        let _3n = document.getElementsByClassName('dd-item-3').length;
        if(_1n===0||_1n<=_2n&&_1n<=_3n){
            return 1;
        }
        else if(_2n===0||_2n<_1n&&_2n<=_3n){
            return 2;
        }
        else{
            return 3;
        }
    }
}

export default Danmu;