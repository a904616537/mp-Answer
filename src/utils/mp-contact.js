/**
* FileType js
* Sample React Redux 
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-07-12 11:59:33
* @Description
* @Flow 
*/

import Vue     from 'vue';
import store   from '../store';

const {appid, secret, api} = Vue.setting;
const accessUrl = `https://api.weixin.qq.com/cgi-bin/token`
export default {

	getAccessToken() {
		return new Promise((resolve, reject) => {
			const req = {

			}
			wx.request({
					url     : accessUrl,
					data    : req,
					success : (result, req) => {
						resolve();
		            },
		            fail : (res) => {
		            	console.log('客服请求 access_token 错误！', res)
		            	reject()
		            }
		        })
		});
	}
}