import React, { Component } from 'react';
import './Cover.scss';

class Cover extends Component {
    constructor(props){
        super(props);

        this.imageCompression = this.imageCompression.bind(this);
    }

    imageCompression (imageSrc = '', width = 370, height = 208, quality = 70, format = 'jpg') {
        if(imageSrc.indexOf('dasheng.tv')>0){
            return imageSrc.replace('file','img') + '?imageView2/1/w/' + width + '/h/' + height + '/' + format + '/' + quality;
        }
        return imageSrc;
    }

    render(){
        return (
            <span className="global-item">
                {
                    this.props.lazyload ? <i data-height={this.props.defaultHeight} className={this.props.icon ? 'swiper-lazy global-cover icon-play' : 'swiper-lazy global-cover'} data-background={this.imageCompression(this.props.poster,this.props.width,this.props.height)} /> : <i data-height={this.props.defaultHeight} className={this.props.icon ? 'global-cover icon-play' : 'global-cover'} style={{backgroundImage: 'url(' + this.imageCompression(this.props.poster,this.props.width,this.props.height) + ')'}} />
                }
                { this.props.title && <p className={this.props.titlePd ? 'pd' : ''}>{this.props.title}</p>}
            </span>
        )
    }

}

export default Cover;