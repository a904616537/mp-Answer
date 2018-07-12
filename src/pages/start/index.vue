<template>
	<div class="start">
		<div class="head">
			<div class="count">已连续答对{{number}}题</div>
			<div class="timer">
				<div class="inner">
					<div class="border">
						<span class="minutes">{{time}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="title">{{question.question}}</div>
			<div class="answer">
				<div
				v-for="(item, key) in question.answer"
				:key="key"
				class="answer-btn"
				:style="'background-color : '+(item.bg?item.bg:'#1D9881') + ';'"
				@click="onNext(item.key, key)"
				>{{item.value}}</div>
			</div>
		</div>

		<!-- 弹出错误提示 -->
		<confirm
		v-if    ="showConfirm"
		:chance ="openPlay"
		:close  ="closeConfirm"
		:oneMore="oneMore"
		:share  ="onShare"/>
		<!-- 哟吼，全答对啦 -->
		<wawa v-if="showSuccess" :close="onClose" :bi="bi"/>
	</div>
</template>

<script>
	import Vue        from 'vue';
	import login_help from '@/utils/login'
	const {dispatch, getters, state} = Vue.store;
	export default{
		onShareAppMessage(res) {
			const self = this;
			let num = Math.floor(Math.random()*4);
			if(num === 0 || num === 4) num = 1;
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
			                	login_help.onRequstShare(res, () => {
			                		self.share = true;
			                		self.onreduceNum();
			                	})
			                },
			                fail        : (res) => { console.log('error', res) },
			                complete    : (res) => { console.log('complete') }
			            })
					}
				},
			}
	    },
		data() {
			return {
				bi          : 20,
				time        : 10,
				timer       : null,
				showConfirm : false,
				showSuccess : false,
				number      : 0,
				question    : {},
				is_over     : false,
				share       : false
			}
		},
		computed: {
			count() {
				return state.Question.number
			},
	        openPlay () {
	        	return getters.openPlay
	        },
	        questions() {
	        	return state.Question.questions
	        },
	        token() {
	        	return state.User.token
	        }
	    },
		onShow() {
			if(!this.share) this.onInitQuestion();
		},
		onUnload() {
			if(this.timer) this.onOver();
		},
		onHide() {
			if(this.timer) this.onOver();
		},
		methods: {
			onSelected(selected) {
				const bgcolor = (typeof selected === 'undefined')?'#1D9881':(selected?'#ecdd32' : '#cf4646');
				return bgcolor;
			},
			onreduceNum(next) {
				// 检查次数
				if(state.Question.count <= 0) {
					this.showConfirm = true;
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
						
						this.showConfirm = false;

						// 题目回答成功，重新加载答题时间
						this.timer = setInterval(() => {
							if(this.time > 0){
								this.time --;
							}else{
								clearInterval(this.timer);
								this.timer = null;
								this.showConfirm = true
							}
						},1000)
						// 加载成功，开始游戏后减少一次游戏机会
						dispatch('play');
		            }
		        })
			},
			getQuestion() {
	        	if(this.questions) {
	        		const question = this.questions.get(this.number);
	        		if(question) this.question = question;
	        		else {
	        			console.log('没有题目啦，答题成功！')
						this.onOver();
						this.onSunmit();
	        		}
	        	}
	        	else this.question = {}
	        },
	    	onClose() {
	    		this.showSuccess = false;
	    		wx.navigateBack();
	    	},
			closeConfirm(){
				this.showConfirm = false;
				if(this.is_over) wx.navigateBack();
			},
			// 配置题库，每次重新答题需要
			onInitQuestion() {
				this.showConfirm = false;
				this.number      = 0;
				const data = {
					type  : 2,
					token : state.User.token
				}
				let questions = [];
				wx.request({
					url     : `${Vue.setting.api}mobile/qa`,
					data,
					success : (result) => {
						if(result.data.ret === 0) {
							const questions = result.data.data.map(val => {
								return {
									id       : val.id,
									question : val.question,
									correct  : val.right_a,
									answer   : val.answer
								}
							})
							dispatch('onInit', questions);
							this.getQuestion();
							if(this.openPlay) {
								if(!this.timer){
									this.timer = setInterval(() => {
										if(this.time > 0){
											this.time --;
										}else{
											clearInterval(this.timer);
											this.timer = null;
											this.showConfirm = true
										}
									},1000)
									// 加载成功，开始游戏后减少一次游戏机会
									dispatch('play');
								}
							} else {
								this.time        = 10;
								this.showConfirm = true;
								this.is_over     = true;
							}
						} else {
							wx.showToast({
								title    : '网络错误,请关闭重试',
								icon     : 'none',
								duration : 2000
							})
						}
					}
				});
			},
			onOver() {
				clearInterval(this.timer);
				this.timer = null;
				this.time = 10;
			},
			// 下一题
			onNext(key, index) {
				// 上一个题没有结束前不允许点击
				if(this.disabled) return;

				this.time = 10;
				this.disabled = true;
				let que = this.question.answer[index];
				if(key === this.question.correct) {
					que.bg = '#ecdd32';
					this.question.answer.splice(index, 1, que);
					// 回答正确，开始下一题
					setTimeout(() => {
						this.disabled = false;
						this.number ++;
						this.getQuestion();
					}, 1000);
				} else {
					que.bg = '#cf4646';
					this.question.answer.splice(index, 1, que);
					// 回答错误，结束游戏
					setTimeout(() => {
						this.disabled = false;
						this.onOver();
						this.is_over = true;
						this.showConfirm = true;
					}, 1000);
				}
			},
			onShare() {
				console.log('分享')
			},
			oneMore() {
				// 重新来一次
				console.log('再来一次啦！', this.timer, this.openPlay)
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
						this.onInitQuestion();
		            }
		        })
			},
			onSunmit() {
				const data = {
					token  : this.token,
					type   : 2
				}
				wx.request({
					url     : `${Vue.setting.api}mobile/getReward`,
					data    : data,
					success : (result, req) => {
						console.log('通知得到奖励', result)
						if(result.data.ret === 0) {
							this.bi = result.data.num;
							this.showSuccess = true;
						}
		            }
		        })
				
			}
		}
	}
</script>

<style>
page{
	background-color: #eefcff;
} 
.head{
	line-height: 170rpx;
	margin-top: 40rpx;
	margin-bottom: 80rpx;
}
.head .count{
	font-size: 32rpx;
	display  : inline-block;
}
.head .timer{
	float : right;
	border: 7rpx solid #157964;
	width: 170rpx;
	height: 170rpx;
	border-radius: 170rpx;
}
.head .timer:after{
	content: '';
	display: table;
	clear  : both;
	height : 0;
	overflow: hidden;
}
.head .inner{
	border: 8rpx solid #F7EC4F;
	width: 155rpx;
	height: 155rpx;
	border-radius: 155rpx;
}
.head .minutes{
	font-size: 80rpx;
}
.head .inner .border{
	border: 7rpx solid #157964;
	width: 142rpx;
	height: 142rpx;
	border-radius: 142rpx;
	text-align: center;
	line-height: 140rpx;
}
.start{
	color  : #4b4a4d;
	padding: 0 50rpx;
}
.content .title{
	font-size: 44rpx;
	margin-bottom: 40rpx;
}
.answer-btn{
	color         : #e7f5fe;
	font-size     : 38rpx;
	line-height   : 100rpx;
	margin-bottom : 20rpx;
	text-align    : center;
	border-radius : 16rpx;
}
</style>