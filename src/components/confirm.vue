<template>
	<div class="confirm">
		<div class="mask">
			<div class="inner">
				<div class="confirm-title" v-if="chance">回答错误～</div>
				<div class="red-text" v-else>你已经没有机会挑战了</div>
				<p>转发到不同群<br>即可马上复活并继续答题</p>
				<button
				@click="share"
				open-type="share">
					<img src="/static/images/forward.png" alt="点击转发到不同群" class="forward-img">
				</button>
				<div class="red-text one-more" @click="oneMore" v-if="chance">再来一次</div>
				<div class="close-btn" @click="close">X</div>
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
			chance : {
				type    : Boolean,
				default : true
			},
			close: {
				type    : Function,
				default : () => console.log('clost btn')
			},
			share: {
				type    : Function,
				default : () => console.log('share btn')
			},
			oneMore: {
				type    : Function,
				default : () => console.log('再来一次!')
			}
		}
	}
</script>

<style>
	button {
		border     : none;
		background : none;
	}
	button::after {
	  border: none;
	} 

	.confirm{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
	.confirm .mask{
		padding: 0 60rpx;
		margin-top: 300rpx;
	}
	.confirm .inner{
		background-color: #fff;
		text-align: center;
		padding: 40rpx 40rpx 120rpx;
		color: #5c584c;
		font-size: 36rpx;
		border-radius: 20rpx;
		line-height: 70rpx;
		position: relative;
	}
	.confirm .confirm-title{
		color: #b6703e;
		font-size: 46rpx;
		line-height: 100rpx;
	}
	.confirm .forward-img{
		width: 420rpx;
		height: 74rpx;
		margin-top: 20rpx;
	}
	.confirm .close-btn{
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
	.confirm .red-text{
		color: #f44435;
	}
	.confirm .one-more{
		text-decoration: underline;
	}
</style>