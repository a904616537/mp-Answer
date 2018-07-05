<template>
	<div class="wawa">
		<div class="inner">
			<div class="top">
				<img src="https://c.waguo.net/static/wxapps/images/search.png"/>
			</div>
			<div class="info">
				<p class="title">恭喜你获得</p>
				<p class="desc">{{bi}}娃娃币（可免费抓{{number}}次）</p>
				<p class="msg"><span>92%</span>的用户已经<span>免费抓到</span>娃娃</p>
				<img class="qrcode" src="https://c.waguo.net/static/wxapps/images/qr-code.png">
				<p class="text">截屏扫码0元抓娃娃</p>
				<div class="btn" @click="onClose">
					<p>下载图片识别二维码</p>
				</div>
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
				type    : Function,
				default : () => console.log('clost btn')
			},
			bi : {
				type    : Number,
				default : 55
			}
		},
		computed: {
			number() {
				return this.bi === 55?3:2;
			}
		},
		methods: {
			onClose() {
				clearInterval(this.timer);
				this.close();
			},
			start() {
				this.timer = setInterval(() => {
					if(this.second === 0) {
						clearInterval(this.timer);
						this.close();
					} else this.second--;
				}, 1000);
			}
		},
		beforeMount() {
			// this.start();
		}
	}
</script>

<style>
	.wawa{
		width            : 100%;
		height           : 100%;
		top              : 0;
		left             : 0;
		display          : flex;
		background-color : rgba(0,0,0,.5);
		position         : fixed;
		justify-content  : center;
		align-items      : center;
	}
	.wawa .inner{
		width            : 600rpx;
		height           : 900rpx;
		background-image : url('https://c.waguo.net/static/wxapps/images/bg-g.png');
		background-size  : 100% 100%;
		position         : relative;
		display          : flex;
		justify-content  : center;
	}
	.wawa .inner .top {
		width            : 400rpx;
		height           : 120rpx;
		top              : -20rpx;
		padding          : 10rpx;
		position         : absolute;
		display          : flex;
		justify-content  : flex-end;
		align-items      : flex-end;
		background-image : url('https://c.waguo.net/static/wxapps/images/top.png');
		background-size  : 100% 100%;
	}
	.wawa .inner .top img{
		width  : 240rpx;
		height : 50rpx;
		margin : 10rpx 30rpx;
	}
	.wawa .info {
		margin-top: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.wawa .info p {
		margin-bottom : 20rpx;
	}
	.wawa .info .title{
		color     : #fdb161;
		font-size : 40rpx;
	}
	.wawa .info .desc{
		color     : #f5fb11;
		font-size : 40rpx;
	}
	.wawa .info .msg{
		padding          : 10rpx;
		font-size        : 30rpx;
		line-height      : 60rpx;
		border-radius    : 25rpx;
		background-color : #fff;
	}
	.wawa .info .msg span {
		color: #F40000;
	}
	.wawa .info .qrcode{
		width  : 240rpx;
		height : 240rpx;
	}
	.wawa .info .text{
		font-size : 30rpx;
		color     : #fff;
	}
	.wawa .info .btn{
		color            : #965A41;
		padding          : 20rpx;
		border-radius    : 10rpx;
		background-color : #F9FEAA;
	}
	.wawa .info .btn p {
		margin: 0;
	}
</style>