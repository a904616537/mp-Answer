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
		<div class="banner"></div>
		<div class="content">
			<p>当前共有{{number}}次挑战</p>
			<img src="/static/images/start-btn.png" class="content-img" alt="开始挑战" @click="start">
			<img src="/static/images/share-btn.png" class="content-img" alt="转发到不同群，挑战次数+1" @click="share">
		</div>
		<div class="foot">
			<img src="/static/images/bottom-img.jpg" class="foot-img">
		</div>


		<!-- 弹框 -->
		<confirm v-if="showConfirm" :close="closeConfirm"></confirm><!-- 弹出回答错误提示 -->
		<rule v-if="showRules" :click="closeRules"></rule><!-- 弹出规则框 -->

	</div>
</template>

<script>
	import rule from '@/components/rule'

	export default{
		data() {
			return {
				number: 54770,
				showRules: false,
				showConfirm: false
			}
		},
		components: {
			confirm,
			rule
		},
		methods: {
			start(){
				const url="../start/main"
				wx.navigateTo({ url })
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
		}
	}
</script>

<style>
page{
	background-color: #eefcff;
}
/* index */
.head{
	padding       : 0 20rpx;
	position      : relative;
	padding-bottom: 20rpx;
}
.head-bg{
	width  : 100%;
	height : 160rpx;
}
.head-inner{
	position   : absolute;
	top        : 64rpx;
	left       : 110rpx;
	right      : 110rpx;
	color      : #fff;
	font-size  : 38rpx;
	line-height: 80rpx;
	text-align: center;
}
.head-icon{
	width : 100rpx;
	height: 70rpx;
	float : left;
}
.head .rules{
	background-color: rgba(0,0,0,.3);
	display         : inline-block;
	font-size       : 28rpx;
	padding         : 0 24rpx;
	border-radius   : 50rpx;
	float           : right;
	line-height     : 40rpx;
	margin-right    : 14rpx;
}

/* banner */
.index .banner{
	width           : 100%;
	height          : 360rpx;
	background-color: #d6d3d4;
}

.index .content{
	font-size : 36rpx;
	text-align: center;
	color     : #4b4a4d;
	padding   : 40rpx 20rpx 60rpx;
}
.index .content .content-img{
	width     : 100%;
	height    : 110rpx;
	margin-top: 40rpx;
}

/* bottom */
.index .foot .foot-img{
	width  : 100%;
	display: block;
}
</style>
