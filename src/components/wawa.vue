<template>
	<div class="wawa">
		<div class="mask">
			<div class="inner">
				<p>获得<span class="bi">55</span>娃娃币可免费抽取娃娃</p>
				<img class="img-style">
				<div class="set-time">{{second}}s</div>
				<div class="close-btn" @click="close">X</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				chance : true,
				second : 3
			}
		},
		props: {
			close: {
				type: Function,
				default: () => console.log('clost btn')
			},
		}
	}
</script>

<style>
	.wawa{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
	.wawa .mask{
		padding: 0 60rpx;
		margin-top: 300rpx;
	}
	.wawa .inner{
		background-color: #fff;
		text-align      : center;
		padding         : 40rpx 40rpx;
		color           : #5c584c;
		font-size       : 36rpx;
		border-radius   : 20rpx;
		line-height     : 70rpx;
		position        : relative;
	}
	.wawa .bi{
		display: inline-block;
		color: #f44435;
		margin-left: -10rpx;
	}
	.wawa .img-style{
		background-color: #f4f4f4;
		width: 390rpx;
		height: 340rpx;
		border-radius: 20rpx;
		margin-top: 10rpx;
	}
	.wawa .set-time{
		width: 100rpx;
		height: 100rpx;
		border: 1px solid #5c583c;
		margin: 0 auto;
		line-height: 100rpx;
		border-radius: 50rpx;
	}
	.wawa .close-btn{
		background-color: #82cfaf;
		color: #fff;
		display: inline-block;
		width: 55rpx;
		height: 55rpx;
		line-height: 55rpx;
		border-radius: 55rpx;
		position: absolute;
		right: -20rpx;
		top: -20rpx;
	}
</style>