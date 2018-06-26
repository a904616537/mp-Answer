<template>
	<div class="share">
		<div class="mask" @click="close">
			<div class="inner">
				<div class="item">
					<div class="left item-text">
						<div>邀请好友+30币</div>
						<div>(对方充值你得10%返现)</div>
					</div>
					<div class="left item-btn">
						<div>邀请</div>
						<div>0/5</div>
					</div>	
				</div>
				<div class="item">
					<div class="left item-text">
						<div class="text-style">(对方充值你得10%返现)</div>
					</div>
					<div class="left item-btn">
						<div>分享</div>
						<div>0/5</div>
					</div>	
				</div>
				<div class="item">
					<div class="left item-text">
						<div class="text-style">每日分享+好运</div>
					</div>
					<div class="left item-btn">
						<div>下载</div>
						<div>0/5</div>
					</div>	
				</div>
				<div class="item">
					<div class="left item-text">
						<div>登录app签到/开宝箱<br>领币</div>
					</div>
					<div class="left item-btn">
						<div style="line-height: 90rpx;">马上登录</div>
					</div>
				</div>
				<div class="item checked">
					<div class="left item-text">
						<div class="text-style">连续答中10题+20币</div>
					</div>
					<div class="left item-btn" @click="checked">
						<div>答题</div>
						<div>0/10</div>
					</div>	
				</div>
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
			close: {
				type: Function,
				default: () => console.log('close confirm')
			}
		},
		methods: {
			checked() {
				console.log('选中')
			}
		}
	}
</script>

<style>
	.share{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
	.share .mask{
		padding: 0 60rpx;
		margin-top: 300rpx;
	}
	.share .inner{
		background-color: #fff;
		text-align      : left;
		padding         : 10rpx;
		color           : #4b4a4d;
		font-size       : 32rpx;
		border-radius   : 20rpx;
		position        : relative;
		border          : 5rpx solid #469680;
	}
	.share .left{
		float: left;
	}
	.share .item{
		padding: 10rpx 10rpx 10rpx 28rpx;
		margin-bottom: 10rpx;
	}
	.share .item.checked{
		border: 5rpx solid #469680;
		border-radius: 10rpx;
	}
	.share .item:after{
		content: '';
		display: table;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.share .item-text{
		width: 366rpx;
	}
	.share .text-style{
		line-height: 100rpx;
	}
	.share .item-btn{
		background-color: #469680;
		color: #fff;
		width: 184rpx;
		height: 90rpx;
		padding: 10rpx 0;
		text-align: center;
		border-radius: 10rpx;
		line-height: 45rpx;
	}
</style>