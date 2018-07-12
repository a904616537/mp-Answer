<template>
	<div class="index">
		<div class="head">
			<img src="/static/images/head-bg.png" class="head-bg" />
			<div class="head-inner">
				<img src="/static/images/head-icon.png" class="head-icon" />
				答中10题赢娃娃
				<div class="rules" @click="clickRules">规则</div>
			</div>
		</div>

		<swiper
		style ="height : 360rpx;"
		:autoplay="true"
		:interval="5000"
		:duration="1000"
		:indicatorDots="true"
		indicatorColor="rgba(255,255,255,.4)"
		indicator-active-color="#fff"
		>
			<block v-for="(item, index) in banner" :key="index">

				<swiper-item class="swiper-item">
					<div class="banner" :style="'background-image: url('+item+');'"></div>
			    </swiper-item>
			</block>
		</swiper>
		
		<div class="content">
			<p>{{title}}</p>
			<button
			lang            = "zh_CN"
			class           = "btn"
			open-type       = "getUserInfo"
			@getuserinfo 	= "onStart">
				<img src="/static/images/start-btn.png" class="content-img" alt="开始挑战">
			</button>
			<button
			class="btn"
			open-type="share">
				<img src="/static/images/share-btn.png" class="content-img" alt="转发到不同群，挑战次数+1">
			</button>
			<!-- <button
			lang      = "zh_CN"
			class     = "btn"
			open-type = "getUserInfo"
			@click    = "onShare">
				<img src="/static/images/share-btn.png" class="content-img" alt="转发到不同群，挑战次数+1">
			</button> -->
		</div>
		<div class="foot" :style="'background-image: url('+banner1+');'"></div>


		<!-- 弹框 -->
		<confirm v-if="showConfirm" :chance="false" :close="closeConfirm"></confirm><!-- 弹出回答错误提示 -->
		<rule v-if="showRules" :click="closeRules"></rule><!-- 弹出规则框 -->
		<!-- <wawa /> -->
		<!-- <wawa></wawa> -->  <!-- 弹出3秒抽取娃娃提示 -->
		<!-- <share></share> --> <!-- 分享弹框 -->

	</div>
</template>

<script>
	import Vue             from 'vue'
	import rule            from '@/components/rule'
	import login_help      from '@/utils/login'
	import {onDecryptData} from '@/utils'
	const {dispatch, commit, getters, state} = Vue.store;
	export default{
		onShow() {
			this.onInit();
		},
		onLoad(option){
			wx.showShareMenu({
				withShareTicket : true,
				success(res) {
					// 分享成功
					console.log('shareMenu share success')
					console.log('分享', res)
				},
				fail(res) {
					// 分享失败
					console.log(res)
				}
			})
	        commit('user/uid', option.uid);
	    },
		onShareAppMessage(res) {
			const self = this;
			let num = Math.floor(Math.random()*4);
			if(num === 0 || num === 4) num = 1;
			if(this.isLogin) {
				return {
					title    : `【${state.User.user.nickName} @你】帮我答对这题，就能抓娃娃啦！`,
					path     : `/pages/index/main?uid=${state.User.detail.uid}`,
					imageUrl : `/static/images/template${num}.jpg`,
					success(res) {
						console.log('转发成功回调', res)
						if(res.shareTickets && res.shareTickets.length > 0) {

							wx.getShareInfo({
				                shareTicket : res.shareTickets[0],
				                success     : (res) => {
				                	console.log('user/share', res)

				                	login_help.onRequstShare(res, () => {
				                		console.log('self', self)
				                		self.getQuestionNum();
				                		self.showConfirm = false;
				                	})
				                },
				                fail        : (res) => { console.log('error', res) },
				                complete    : (res) => { console.log('complete') }
				            })
						}
					},
				}
			} else {
				return {
					title    : `【抓娃娃王国 @你】帮我答对这题，就能抓娃娃啦！`,
					path     : `/pages/index/main`,
					imageUrl : `/static/images/template${num}.jpg`,
					success : (e) => {

					}
				}
			}
	    },
		data() {
			return {
				title       : '',
				number      : 0,
				showRules   : false,
				showConfirm : false,
				is_login    : false
			}
		},
		components: {
			rule
		},
		computed: {
	        user () {
	        	return state.User.user
	        },
	        banner() {
	        	const storeBanner = getters.getBanner;
	        	return storeBanner.length > 0?storeBanner:['http://c.waguo.net//static/images/shangchengtu.png', 'http://c.waguo.net//static/images/shangchengtu.png'];
	        },
	        banner1() {
	        	const storeBanner = getters.getBanner;
	        	return storeBanner.length > 1?storeBanner[1]:'http://c.waguo.net//static/images/shangchengtu.png';
	        },
	        isLogin() {
	        	return state.User.token?true:false;
	        }
	    },
		methods: {
			onreduceNum(next) {
				// 检查次数
				if(state.Question.count <= 0) {
					this.showConfirm = true;
					wx.hideLoading();
					return;
				}
				// 消耗次数
				const data = {
					token  : state.User.token,
					type   : 2
				}
				wx.request({
					url     : `${Vue.setting.api}mobile/reduceNum`,
					data    : data,
					success : (result, req) => {
						
						console.log('消耗答题次数', result)
						if(next) next();
		            }
		        })
			},
			_onGetInfo(e, url) {
				wx.showLoading({
					title : '加载中'
				})
				// 已经登陆过咯
				if(this.isLogin) {
					this.onreduceNum(() => {
						wx.hideLoading();
						wx.navigateTo({url})
					})
					return;
				}
		        login_help.onGotUserInfo(e, err => {
		    		if(err){
		        		wx.hideLoading();
		    			wx.showToast({
							title    : err,
							icon     : 'none',
							duration : 2000
						})
		    		} else {
		    			wx.hideLoading();
            			this.getQuestionNum(() => {
            				this.onreduceNum(() => {
            					wx.hideLoading();
            					wx.navigateTo({url})
            				})
            			});
		    		}
		    	})
			},
			onInit() {
				const data = {
					type : 2
				}
				wx.request({
					data,
					url     : `${Vue.setting.api}mobile/getPicture`,
					success : (result, req) => {
						if(result.data.ret === 0) {
							dispatch('setBanner', result.data.picture)
							this.title = `当前共有${result.data.all}次挑战`;
						}
					}
				})
			},
			getQuestionNum(next) {
				const data = {
					token : state.User.token,
					type  : 2
				}
				wx.request({
					url     : `${Vue.setting.api}mobile/getQuestionNum`,
					data    : data,
					success : (result, req) => {
						console.log('获取答题次数', result)
						if(result.data.ret === 0) {
							const {lest_num, answer_num} = result.data;
							dispatch('setCount', {count : lest_num, answer_num})
							// dispatch('setCount', {count : 3, answer_num})
							if(next) next();
						} else {
							wx.showToast({
								title    : '网络错误，请重试！',
								icon     : 'none',
								duration : 2000
							})
						}
					}
				})
			},
			onStart(e){
				const url="../start/main"
				this._onGetInfo(e, url)
			},
			onShare(e){
				const url="../share/main"
				this._onGetInfo(e, url)
			},
			clickRules(){
				this.showRules = true
			},
			closeRules(){
				this.showRules = false
			},
			closeConfirm(){
				this.showConfirm = false
			}
		},
		beforeMount() {
			wx.showLoading({
				title : '加载中'
			})
			login_help.onGetUserInfo()
            .then(res => {
            	wx.hideLoading()
            	this.getQuestionNum();
            })
	        .catch(err => wx.hideLoading())
		},
	}
</script>

<style>
page{
	background-color: #eefcff;
}
button {
	border     : none;
	background : none;
}
button::after {
  border: none;
} 
/* index */
.head{
	padding        : 0 20rpx;
	position       : relative;
	padding-bottom : 20rpx;
}
.head-bg{
	width  : 100%;
	height : 160rpx;
}
.head-inner{
	top         : 64rpx;
	left        : 110rpx;
	right       : 110rpx;
	color       : #fff;
	font-size   : 38rpx;
	line-height : 80rpx;
	text-align  : center;
	position    : absolute;
}
.head-icon{
	width  : 100rpx;
	height : 70rpx;
	float  : left;
}
.head .rules{
	font-size        : 28rpx;
	padding          : 0 24rpx;
	border-radius    : 50rpx;
	line-height      : 40rpx;
	margin-right     : 14rpx;
	float            : right;
	background-color : rgba(0,0,0,.3);
	display          : inline-block;
}

/* banner */
.index .banner{
	width            : 100%;
	height           : 360rpx;
	background-color : #d6d3d4;
	background-size  : cover;
}

.index .content{
	font-size  : 36rpx;
	color      : #4b4a4d;
	padding    : 40rpx 20rpx 60rpx;
	text-align : center;
}
.index .content .content-img{
	width      : 100%;
	height     : 110rpx;
	margin-top : 40rpx;
}

/* bottom */
.index .foot{
	width           : 100%;
	height          : 15vh;
	position        : fixed;
	bottom          : 0;
	background-size : cover;
}
</style>
