<template>	
	<!-- 该组件主要用于用户卡片页面的评论展示功能 -->
	<view class="cardComment">
		<view class="author-box">
			<view class="useravatar" @click="toUserDetail">
				<u-avatar :src="propUserHeadImgSrc"></u-avatar>
			</view>
			<view class="usertxt">
				<view class="username">用户名</view>
				<view class="datatime" style="color:#888;font-size: 20rpx;">评论于：{{datatime}}</view>
			</view>
		</view>
		<!-- 评论内容及引用的文章 -->
		<view class="commit-txt">我觉得这个东西说得很好我非常赞同，它是正确的，客观的，一针见血的
		<view class="commit-page" @click="toPageDetail()">
			<view class="page-title">天府通-NFC卡正式上线啦！</view>
			<view class="page-content">轻轻一碰，出行更方便，更像享受天府通实体卡同等折扣，快来体验吧！
			轻轻一碰，出行更方便，更像享受天府通实体卡同等折扣，快来体验吧！</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"userComment",
		props: {
			datatime: {
				type:String,
				default:"2023-4-15 18:39"
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			toPageDetail(){
				uni.navigateTo({
					url:"/pages/bbs/pageDetail/pageDetail"
				})
			}	
		}
	}
</script>

<style lang="scss">
.cardComment{
	margin-top: 20rpx;
	padding:10rpx,10rpx;
	background-color: #fff;
	border-radius: 20rpx;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin-bottom: 20rpx;
	.author-box{
		width: 100%;
		display: flex;
		padding:30rpx 30rpx;
		.usertxt{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 20rpx;
			.username {
				font-weight: bold;
			}
		}
	}
	.commit-txt {
		font-size:25rpx;
		padding:0rpx 30rpx;
		padding-bottom:30rpx;
		//文本超过5行后显示省略号
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:5; 
	}
	.commit-page {
		margin-top:20rpx;
		width:100%;
		background-color: #F8F8F8;
		padding:20rpx 20rpx ;
		.page-title {
			font-size:25rpx;
			//文本超过2行后显示省略号
			overflow:hidden; 
			text-overflow:ellipsis;
			display:-webkit-box; 
			-webkit-box-orient:vertical;
			-webkit-line-clamp:2;
		}
		.page-content {
			//文本超过2行后显示省略号
			padding-top: 20rpx;
			font-size: 20rpx;
			color:#888;
			overflow:hidden; 
			text-overflow:ellipsis;
			display:-webkit-box; 
			-webkit-box-orient:vertical;
			-webkit-line-clamp:2;
		; 
		}
	}
}
</style>