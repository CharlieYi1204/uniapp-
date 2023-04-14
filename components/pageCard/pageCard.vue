<template>
	<view class="page-card">
		<!-- 帖子预览顶部，头像、用户名及发帖时间 -->
		<view class="author-box">
			<view class="useravatar">
				<u-avatar :src="src"></u-avatar>
			</view>
			<view class="usertxt">
				<view class="username">用户名</view>
				<view class="datatime" style="color:#888;font-size: 20rpx;">发帖时间</view>
			</view>
		</view >
		<!-- 标题和内容简介 -->
		<view class="title-box">
			<view class="title">这里是标题哦哦哈哈哈哈哈哈哈哈哈哈</view>
			<view class="content">这里是内容哦咦啊哇啊啊啊嘎达嘎达嘎达</view>
		</view>	
	</view>
</template>

<script>
	export default {
		name:"pageCard",
		data() {
			return {
				src:"http://localhost:3000/images/user_bg.jpg"
			};
		}
	}
</script>

<style lang="scss">
.page-card {
	margin-top: 20rpx;
	padding:10rpx,10rpx;
	background-color: #fff;
	border-radius: 20rpx;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
	.title-box{
		padding:0rpx 40rpx;
		padding-bottom: 40rpx;
		.title {
			font-size: 40rpx;
			font-weight: bold;
		}
		.content{
			font-size: 30rpx;
			color: #888;
			padding-top: 10rpx;
		}
	}
}
</style>