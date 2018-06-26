<template>
	<div class="share-page">
		<div class="head">
			<img src="/static/images/head-bg.png" class="head-bg" />
			<div class="head-inner">
				答题就有娃娃
			</div>
		</div>
		<div class="content">
			<img src="/static/images/share-bg.png" alt="" class="share-bg">
			<div class="content-inner">
				<div class="title">《咏鹅》这首诗是骆宾王几岁的时候写的？</div>
				<div class="answer">
					<div>A 7岁</div>
					<div>A 7岁</div>
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
		}
	}
</script>

<style>
	Page{
		background-color: #dcfdf2;
	}
	.share-page .head{
		padding       : 0 20rpx;
		position      : relative;
		padding-bottom: 20rpx;
	}
	.share-page .head-bg{
		width  : 100%;
		height : 160rpx;
	}
	.share-page .head-inner{
		position   : absolute;
		top        : 64rpx;
		left       : 110rpx;
		right      : 110rpx;
		color      : #479675;
		font-size  : 86rpx;
		line-height: 80rpx;
		text-align : center;
		text-shadow: 1rpx 1rpx 0rpx #fff;
	}
	.share-page .content{
		padding: 0 40rpx;
		text-align: center;
		position: relative;
	}
	.share-page .content .share-bg{
		width: 100%;
	}
	.share-page .content-inner{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		padding: 120rpx;
	}
	.share-page .content-inner .title{
		text-align: left;
		margin-bottom: 20rpx;
	}
</style>