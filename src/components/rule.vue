<template>
	<div class="rule">
		<div class="mask">
			<div class="inner">
				<p>世纪杯答题赢娃娃规则:<br>答中5题即可获得抓娃娃机会<br>每天10次机会<br>转发群组可获得复活机会</p>
				<div class="close-btn" @click="click">X</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {

			}
		},
		props: {
			click: {
				type: Function,
				default: () => console.log('clost rules')
			}
		},
	}
</script>

<style>
	.rule{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
	.rule .mask{
		padding: 0 60rpx;
		margin-top: 300rpx;
	}
	.rule .inner{
		background-color: #fff;
		padding: 120rpx 80rpx 170rpx;
		color: #5c584c;
		font-size: 36rpx;
		border-radius: 20rpx;
		line-height: 60rpx;
		position: relative;
	}
	.rule .close-btn{
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
		text-align: center;
	}
</style>