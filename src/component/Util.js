import axios from 'axios';

axios.defaults.withCredentials = true;

let util = {

};

util.ajaxUrl = window.location.hostname.match(/web.ttdz.dasheng.tv/) ? 'https://api.ddz.dasheng.tv' : 'http://123.207.77.220:9001';

util.ajax = axios.create({
    method: 'get',
    baseURL: util.ajaxUrl,
    timeout: 30000
});

util.fetch = function(url,params = {}){
    return new Promise((resolve, reject) => {
        axios.get(url, {
            baseURL: util.ajaxUrl,
            params: params
        }).then(response=>{
            resolve(response.data);
        }).catch(error=>{
            reject(error);
        });
    });
};

util.post = function(url,data = {}){
    return new Promise((resolve, reject) => {
        axios.post(util.ajaxUrl + url, data).then(response=>{
            resolve(response.data);
        }).catch(error=>{
            reject(error);
        });
    });
};

util.put = function(url,data = {}){
    return new Promise((resolve, reject) => {
        axios.put(util.ajaxUrl + url, data).then(response=>{
            resolve(response.data);
        }).catch(error=>{
            reject(error);
        });
    });
};

export default util;