<template>
	<div class="wawa">
		<div class="mask">
			<div class="inner">
				<p>转发到不同群<br>即可马上复活并继续答题</p>
				<div class="close-btn" @click="close">X</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				chance : true
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
		text-align: center;
		padding: 40rpx 40rpx 120rpx;
		color: #5c584c;
		font-size: 36rpx;
		border-radius: 20rpx;
		line-height: 70rpx;
		position: relative;
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