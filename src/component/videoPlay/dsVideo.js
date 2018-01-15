class dsVideo {
    constructor(container, options){

        this.android = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1;
        this.container = container;
        this.options = Object.assign({
            src: '',
            inline: true,
            x5: true,
            width: '100%',
            height: '100%',
            controlBar: true,
            title: false,
            poster: false,
            posterFit: 'cover',
            status: 0,
            control: true,
            loading: true,
            time: 5000,
            stopPropagationEle: ['a'],
            ready: function () {
                console.log('视频初始化完成');
            }
        }, options);

        this.options.controlBar = this.options.status === 1 ? false : this.options.controlBar;
        this.init();
    }

    changeTime(time) {
        let h = Math.floor(time/3600);
        h = h > 0 ? (h > 9 ? h : '0' + h) : 0;
        let m = Math.floor(time/60%60);
        m = m > 9 ? m : '0' + m;
        let s = Math.floor(time%60);
        s = s > 9 ? s : '0' + s;
        return h !== 0 ? h + ':' + m + ':' + s : m + ':' + s;
    }

    getOffsetLeft(obj){
        let tmp = obj.offsetLeft;
        let val = obj.offsetParent;
        while(val != null){
            tmp += val.offsetLeft;
            val = val.offsetParent;
        }
        return tmp;
    }

    requestFullScreen() {
        let de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        }
        else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        }
        else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    }

    exitFullscreen() {
        let de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        }
        else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        }
        else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    }

    init(){
        this.container.className = 'ds-container';
        this.container.style.height = this.options.height;
        this.container.style.width = this.options.width;
        this.video = document.createElement('video');
        this.video.className = 'ds-video';
        this.video.src = this.options.src;
        this.container.appendChild(this.video);

        this.options.title && this.addTitle();
        this.options.poster && this.addPoster();
        this.options.loading && this.addLoadingBar();
        this.options.controlBar && this.addControlBar();

        !this.android && this.options.inline && this.setInline();
        this.android && this.options.x5 && this.setX5();

        this.container.addEventListener('touchend', (e)=>{
            for(let i in this.options.stopPropagationEle){
                if(e.target.matches(this.options.stopPropagationEle[i])){
                    return;
                }
            }
            if(!this.video.paused){
                clearTimeout(this.setTime);
                if(this.container.className.match(new RegExp( "(\\s|^)ds-controlBar-hidden(\\s|$)"))){
                    this.container.classList.remove('ds-controlBar-hidden');
                    this.setTime = setTimeout(()=>{
                        this.container.classList.add('ds-controlBar-hidden');
                    }, this.options.time);
                }
                else{
                    this.container.classList.add('ds-controlBar-hidden');
                }
            }
        });

        this.video.addEventListener('canplay', ()=>{
            this.loadedMetaData();
        });

        this.video.addEventListener('durationchange', ()=>{
            this.duration = this.video.duration;
            this.pointTime = 1 / this.duration;

            if(this.options.controlBar) {
                document.querySelector('.ds-remainingTime').innerHTML = this.changeTime(this.duration - this.video.currentTime);
                document.querySelector('.ds-totalTime').innerHTML = this.changeTime(this.duration);
            }
        });

        this.video.addEventListener('seeked', ()=>{
            if(this.container.className.match(new RegExp( "(\\s|^)ds-seeking(\\s|$)"))){
                this.container.classList.remove('ds-seeking');
            }
        });

        this.video.addEventListener('seeking', ()=> {
            this.container.classList.add('ds-seeking');
        });

        this.video.addEventListener('waiting', ()=> {
            this.container.classList.add('ds-waiting');
        });

        this.video.addEventListener('timeupdate', ()=> {
            if(this.removed){
                return;
            }
            if(this.options.controlBar) {
                document.querySelector('.ds-currentTime').innerHTML = this.changeTime(this.video.currentTime);
                document.querySelector('.ds-remainingTime').innerHTML = this.changeTime(this.duration - this.video.currentTime);
                document.querySelector('.ds-play-progress').style.width = this.pointTime * this.video.currentTime * 100 + '%';
            }
        });

        this.video.addEventListener('play', ()=> {
            if(!this.container.className.match(new RegExp( "(\\s|^)ds-played(\\s|$)"))){
                this.container.classList.add('ds-played');
            }
            if(this.options.controlBar && document.querySelector('.ds-playStatus').className.match(new RegExp( "(\\s|^)ds-paused(\\s|$)"))){
                document.querySelector('.ds-playStatus').classList.remove('ds-paused');
                document.querySelector('.ds-playStatus').classList.add('ds-play');
            }
        });

        this.video.addEventListener('pause', ()=> {
            if(this.removed){
                return;
            }
            if(this.options.controlBar){
                document.querySelector('.ds-playStatus').classList.remove('ds-play');
                document.querySelector('.ds-playStatus').classList.add('ds-paused');
            }
            this.container.classList.remove('ds-controlBar-hidden');
            clearTimeout(this.setTime);
        });

        this.video.addEventListener('playing', ()=> {
            if(this.container.className.match(new RegExp( "(\\s|^)ds-waiting(\\s|$)"))){
                this.container.classList.remove('ds-waiting');
            }
            this.setTime = setTimeout(()=>{
                this.container.classList.add('ds-controlBar-hidden');
            }, this.options.time);
        });

        this.video.addEventListener('ended', ()=> {
            this.container.className = 'ds-container';
        });

        this.video.addEventListener('error', (e)=> {
            //console.log(e);
        });
    }

    addTitle(){
        let titleBar = document.createElement('div');
        titleBar.className = 'ds-header';
        titleBar.innerHTML = `
            <div class="ds-text ds-title">${this.options.title}</div>
        `;
        this.container.appendChild(titleBar);
    }

    addPoster(){
        let posterBar = document.createElement('div');
        posterBar.className = 'ds-poster ' + this.options.posterFit;
        posterBar.style.backgroundImage = 'url(' + this.options.poster + ')';
        this.container.appendChild(posterBar);

        if(this.options.control){
            posterBar.onclick = ()=>{
                this.video.play();
            }
        }
    }

    addLoadingBar(){
        let loadingBar = document.createElement('div');
        loadingBar.className = 'ds-loading-spinner';
        this.container.appendChild(loadingBar);
    }

    addControlBar(){
        let controlBar = document.createElement('div');
        controlBar.className = 'ds-controlBar';
        controlBar.innerHTML = `
            <button class="ds-button ds-playStatus ds-paused"></button>
            <time class="ds-text ds-currentTime">${this.changeTime(0)}</time>
            <div class="ds-text ds-time-divider">/</div>
            <time class="ds-text ds-remainingTime">${this.changeTime(0)}</time>
            <time class="ds-text ds-totalTime">${this.changeTime(0)}</time>
            <div class="ds-progress">
                <div class="ds-progress-holder">
                    <div class="ds-load-progress"></div>
                    <div class="ds-play-progress"></div>
                </div>
            </div>` + (!this.android ? `<button class="ds-button ds-fullscreen ds-exitfullscreen"></button>` : `<div class="ds-blank"></div>`);
        this.container.appendChild(controlBar);
    }

    setInline(){
        this.video.setAttribute('webkit-playsinline',true);
        this.video.setAttribute('playsinline',true);
        this.video.setAttribute('x-webkit-airplay',true);
    }

    setX5(){
        this.video.setAttribute('x5-video-player-type','h5');
        this.video.setAttribute('x5-video-player-fullscreen',true);
        this.video.setAttribute('x5-video-orientation','landscape|portrait');
        this.video.setAttribute('x5-video-ignore-metadata',true);

        this.video.addEventListener('x5videoenterfullscreen',()=>{
            this.video.style.width = window.screen.availWidth + 'px';
            this.video.style.height = window.screen.availHeight + 'px';

            this.container.style.width = window.screen.availWidth + 'px';
            this.container.style.height = window.screen.availHeight + 'px';
        });

        this.video.addEventListener('x5videoexitfullscreen',()=>{
            this.video.style.width = '100%';
            this.video.style.height = '100%';

            this.container.style.width = '100%';
            this.container.style.height = '100%';
        });
    }

    setControlBar(){

        document.querySelector('.ds-remainingTime').innerHTML = this.changeTime(this.duration);
        document.querySelector('.ds-totalTime').innerHTML = this.changeTime(this.duration === Infinity ? 0 : this.duration);

        document.querySelector('.ds-playStatus').onclick = ()=>{
            if(this.video.paused) {
                this.video.play();
            }
            else{
                this.video.pause();
            }
        };

        if(!this.android){
            let fullScreenButton = document.querySelector('.ds-fullscreen');
            fullScreenButton.onclick = ()=>{
                if(fullScreenButton.className.match(new RegExp( "(\\s|^)ds-exitfullscreen(\\s|$)"))) {
                    fullScreenButton.classList.remove('ds-exitfullscreen');
                    fullScreenButton.classList.add('ds-enterfullscreen');
                    this.requestFullScreen();
                }
                else{
                    fullScreenButton.classList.remove('ds-enterfullscreen');
                    fullScreenButton.classList.add('ds-exitfullscreen')
                    this.exitFullscreen();
                }
            };
        }

        let propress = document.querySelector('.ds-progress');

        propress.addEventListener('touchstart', (e)=>{
            e.stopPropagation();
            this.dragging = true;
            this.video.pause();
        });

        propress.addEventListener('touchmove', (e)=>{
            e.stopPropagation();
            if(!this.dragging){
                return;
            }
            e = e.touches[0];
            let endPos = e.pageX - this.getOffsetLeft(propress) >= propress.offsetWidth ? propress.offsetWidth : e.pageX - this.getOffsetLeft(propress);
            document.querySelector('.ds-play-progress').style.width = endPos / propress.offsetWidth * 100 + '%';
        });

        propress.addEventListener('touchend', (e)=> {
            e.stopPropagation();
            this.dragging = false;
            e = e.changedTouches[0];
            let endPos = e.pageX - this.getOffsetLeft(propress) >= propress.offsetWidth ? propress.offsetWidth : e.pageX - this.getOffsetLeft(propress);
            this.video.currentTime = endPos / propress.offsetWidth * this.duration;
            this.video.play();
        });

    }

    loadedMetaData(){
        this.duration = this.video.duration;
        this.pointTime = 1 / this.duration;
        this.options.controlBar && this.setControlBar();
    }

    remove(){
        this.removed = true;
    }
}

export default dsVideo;