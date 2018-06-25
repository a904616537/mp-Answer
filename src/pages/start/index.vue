<template>
	<div class="start">
		<div class="head">
			<div class="count">已连续答对{{count}}题</div>
			<div class="timer">
				<div class="inner">
					<div class="border">
						<span class="minutes">{{time}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="title">{{question}}</div>
			<div class="answer">
				<div class="answer-btn">宜其家室</div>
				<div class="answer-btn">灼灼其华</div>
				<div class="answer-btn">宜其室家</div>
				<div class="answer-btn">之子于归</div>
			</div>
		</div>

		<!-- 弹出错误提示 -->
		<confirm v-if="showConfirm" :close="closeConfirm"></confirm>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				count: 0,
				time : '',
				timer: null,
				showConfirm: false,
				question: '"逃之夭夭" 的下一句是什么？'
			}
		},
		onReady(){
			const currentTime = 10
			if(!this.timer){
				this.time = currentTime;
				this.timer = setInterval(() => {
					if(this.time > 0 && this.time <= currentTime){
						this.time --;
					}else{
						clearInterval(this.timer);
	         			this.timer = null;	
						this.showConfirm = true
					}
				},1000)
			}
		},
		methods: {
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
	background-color: #1D9881;
	color: #e7f5fe;
	font-size: 38rpx;
	line-height: 100rpx;
	margin-bottom: 20rpx;
	text-align: center;
	border-radius: 16rpx;
}
</style>