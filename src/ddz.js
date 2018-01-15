import React from 'react';
import ReactDOM from 'react-dom';
import { Route,Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Rem from './component/Rem';
import './component/reset.scss';
import './ddz/Main.scss';
import Home from './ddz/Home';
import Match from './ddz/Match';
import Tab from './ddz/Tab';
import Sidebar from './ddz/Sidebar';
import Room from './ddz/Room';

Rem(1334);

let isDist = !window.location.hostname.match(/web.ddz.dasheng.tv/);
window.hostUrl = isDist ? 'https://api.ddz.dasheng.tv' : 'http://123.207.77.220:9001';
window.appKey = isDist ? 'p5tvi9dstt364' : '4z3hlwrv4zv0t';

ReactDOM.render(
    <HashRouter>
        <div className="main">
            <Sidebar />
            <Route exact path="/" component={Home} />
            <Route exact path="/match" component={Match} />
            <Route exact path="/tab/:tabId" component={Tab} />
            <Route exact path="/room/:videoId" component={Room} />
        </div>
    </HashRouter>,
    document.getElementById('root')
);