export const whichTransitionEvent = (type)=>{
    let el = document.createElement('fakeelement');
    let transitions = type === 'animation' ? {
        WebkitTransition: 'webkitAnimationEnd',
        MozTransition: 'animationend',
        OTransition: 'oAnimationEnd oAnimationend',
        transition: 'animationend'
    }: {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd oTransitionend',
        transition: 'transitionend'
    };
    for (let t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
};