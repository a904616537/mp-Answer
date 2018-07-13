/**
# Sample Wechat MP
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:15:52
* @Description
* @Flow 
*/

import Vue     from 'vue';
import WxCrypt from './WXBizDataCrypt';
import store   from '../store';


	const error = new Map([
	    [501, '用户未授权'],
	    [502, '用户信息获取失败'],
	    [503, '服务器响应失败'],
	    [504, '微信响应失败'],
	    [505, '登陆失败']
	]);


export default {
	onSetSessionKey (key) {
        store.commit('user/session_key', key)
    },
    onLogin (user) {
        store.commit('user/login', user)
    },
	onWXApp(user) {
		return new Promise((resolve, reject) => {
			const data = {
				nickname : user.nickName,
				openid   : user.openId,
				unionid  : user.unionId,
				avatar   : user.avatarUrl,
				gender   : user.gender
			}
	    	wx.request({
				url     : `${Vue.setting.api}mobile/wx_app`,
				data    : data,
				success : (result, req) => {
					console.log('user detail', result.data.user)
	            	store.commit('user/detail', {user : result.data.user, token : result.data.login.token});
	            	resolve();
	            }
	        })
	    });
	},
	onGetUserInfo() {
	    return new Promise((resolve, reject) => {
	        wx.getSetting({
	            success : (res) => {
	                if (res.authSetting['scope.userInfo']) {
                        this.onGetLogin()
                        .then(userdata => {
                        	// 登陆服务器响应成功
                        	const {session_key, openid} = userdata.data;
                        	console.log('userdata', userdata)
                        	wx.getUserInfo({
	                    		success : (res) => {
	            					const {encryptedData, iv} = res;

		                        	const pc = new WxCrypt(Vue.setting.appid, session_key);
		                        	// if(store.state.User.share) {
		                        	// 	this.share = pc.decryptData(store.state.User.share.encryptedData, store.state.User.share.iv)
		                        	// }
		                        	
						            const data = pc.decryptData(encryptedData , iv)
						            if(data) {
						            	this.onSetSessionKey(session_key);
		                            	this.onLogin(data);
		                            	this.onWXApp(data)
		                            	.then(() => {
		                           //  		console.log('share', this.share)
		                           //  		if(this.share) {
			                        		// 	this.onRequstShare(this.share.openGId);
			                        		// }
		                            		// 登陆成功后获取用户详细数据
		                            		resolve(data)
		                            	})
						            } else reject(error.get(503))
	                			},
                				fail : (err) => reject(error.get(502))
                			})
                        })
                        .catch((err) => {
                        	console.log('err', err)
                        	reject(error.get(503))
                        })
	                } else reject(error.get(501))
	            },
	            fail : (err) => reject(error.get(501))
	        });
	    });
	},
	onGotUserInfo(e, callback) {
		if(e.mp.detail.rawData){

			wx.showLoading({
				title : '加载中'
			})

			//用户按了允许授权按钮
			console.log('用户按了允许授权按钮')
			const {encryptedData, iv} = e.mp.detail;
	        this.onGetUserInfo()
	        .then(userdata => {
	        	setTimeout(() => {
	        		callback(false)
					wx.hideLoading();
				}, 1000);
	        })
	        .catch(() => {
				callback(error.get(503))
	        })
		} else {
			//用户按了拒绝按钮
			console.log('用户按了拒绝按钮')
			callback(error.get(501))
		}
	},
	onGetLogin() {
	    return new Promise((resolve, reject) => {
	        wx.login({
	            success : (res) => {
	                if (res.code) {
	                	const data = {
							appid      : Vue.setting.appid,
							secret     : Vue.setting.secret,
							code    : res.code
	                	}
	                    wx.request({
							url     : `${Vue.setting.api}mobile/wx_code`,
							data,
							success : (result) => {
								resolve(result)
							},
							fail    : (err) => reject(error.get(503))
	                    })
	                } else reject(error.get(504))
	            }
	        });
	    });
	},
	onRequstShare(res, next) {
		const pc    = new WxCrypt(Vue.setting.appid, store.state.User.session_key);
		const share = pc.decryptData(res.encryptedData, res.iv)
		const data  = {
			team_uid : share.openGId,
			uid      : store.state.User.share_uid || store.state.User.detail.uid,
			token    : store.state.User.token,
			type     : 2
		}
		console.log('requst share data', data);
		wx.request({
			url     : `${Vue.setting.api}mobile/shareNum`,
			data    : data,
			success : (result, req) => {
				console.log('result share_team_get', result)
				if(next) next()
            }
        })
	}
}