import {whichTransitionEvent} from './Fn';
import './Zan.scss';

class Zan {
    constructor(ele){
        this.ele = ele;
        this.init();
    }

    init(){
        let zanEle = document.createElement('div');
        zanEle.className = 'zan_item zan' + this.getType();
        zanEle.style.webkitAnimationName = this.getName();
        zanEle.style.animationName = this.getName();
        zanEle.style.webkitAnimationTimingFunction = this.getPath();
        zanEle.style.animationTimingFunction = this.getPath();
        zanEle.style.opacity = (Math.floor(Math.random()*6)+5)/10;
        this.ele.appendChild(zanEle);

        let transitionEvent = whichTransitionEvent('animation');
        let f = false;
        if(transitionEvent){
            zanEle.addEventListener(transitionEvent, function() {
                if (f) {
                    return;
                }
                zanEle.parentNode.removeChild(zanEle);
                f = true;
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

    getType() {
        return Math.floor(Math.random() * 5) + 1;
    }

    getName() {
        return Math.floor(Math.random() * 2) === 1 ? '_moveX': 'moveX';
    }
}

export default Zan;