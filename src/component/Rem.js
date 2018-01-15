let Rem = function (w=1334,h=750,statue=false,resize=true) {
    let _D = document;
    var _W;
    let _self = {};
    _self.resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    _self.Html = _D.getElementsByTagName("html")[0];
    _self.widthProportion = function(){
        let p = Number((_D.body&&_D.body.clientWidth||_self.Html.offsetWidth)/_W).toFixed(3);
        return p>=1?1:p;
    };
    _self.changePage = function(){
        if(statue){
            _W = _D.documentElement.clientWidth>_D.documentElement.clientHeight?w:h;
        }
        else{
            _W = w;
        }
        _self.Html.setAttribute("style","font-size:"+_self.widthProportion()*100+"px");
        _self.correctPx();
    };
    _self.correctPx = function(){
        let docEl = document.documentElement;
        let clientWidth = docEl.clientWidth;
        if (!clientWidth || clientWidth > 768) return;
        let div = document.createElement('div');
        div.style.width = '1.4rem';
        div.style.height = '0';
        document.body.appendChild(div);
        var ideal = 140 * clientWidth / _W;
        var rmd = (div.clientWidth / ideal);
        if(rmd > 1.05 || rmd < 0.95){
            docEl.style.fontSize = 100 * (clientWidth / _W) / rmd + 'px';
        }
        document.body.removeChild(div);
    };
    _self.changePage();
    if (!document.addEventListener) return;
    if(resize){
        window.addEventListener(_self.resizeEvt,_self.changePage,false);
    }
    document.addEventListener('DOMContentLoaded', _self.changePage, false);
};
export default Rem;