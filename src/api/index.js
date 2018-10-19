import axios from 'axios';
import qs from 'qs';
import popalert from '../popalert';
// axios.defauls.baseURL = '';

// const baseURL = 'http://test.hxlife.com/ssj/jc/pc_web_server/'
const baseURL = document.location.protocol + '//' + document.domain + '/website/server/';
axios.defaults.withCredentials = true;
const ax = (url, data, mask, method = "post") => {
    if (mask) popalert.waitstart();
    let params = !!data ? qs.stringify(data) : '';
    // url = +url;
    return new Promise(function (resolve, reject) {
        axios({
            method: method,
            url: url,
            // baseURL:'/ssj/jc/pc_web_server/',
            baseURL:baseURL,
            data: params,
        }).then(function (res) {
            if (mask) popalert.waitend();
            resolve(res.data);
        }).catch(function (err) {
            if (mask) popalert.waitend();
            popalert.fade('网络请求错误');
        });
    })
}


export default ax;