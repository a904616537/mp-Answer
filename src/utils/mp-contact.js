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

const {appid, secret, content_api} = Vue.setting;

export default {

	getAccessToken() {
		return new Promise((resolve, reject) => {
			const access_token = wx.getStorageSync('access_token');

			if(access_token) {
				resolve(access_token);
				return;
			}
			const req = {
				appid,
				secret
			}
			wx.request({
					url     : `${content_api}mobile/getToken`,
					data    : req,
					success : (result, req) => {
						console.log('result', result);
						if(result.data.ret === 0) {
							wx.setStorageSync('access_token', result.data.data)
							resolve(result.data.data);
						} else reject();
		            },
		            fail : (res) => {
		            	console.log('客服请求 access_token 错误！', res)
		            	reject()
		            }
		        })
		});
	},
	sendCustomMsg(data) {
		return new Promise((resolve, reject) => {
			this.getAccessToken()
			.then(result => {
				console.log('access_token', result)
				const req = Object.assign(data, {access_token : result.access_token});
				
				console.log('req ------------------>', req)
				wx.request({
					url     : `${content_api}mobile/postWX`,
					data    : req,
					success : (result, req) => {
						console.log('result', result);
						resolve();
		            },
		            fail : (res) => {
		            	console.log('发送客服消息失败', res)
		            	reject()
		            }
		        })
			})
			.catch(err => {
				console.log('请求 access_token 失败！')
				reject('请求 access_token 失败！');
			})
		});
	}
}