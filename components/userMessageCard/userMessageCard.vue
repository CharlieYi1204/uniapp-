<template>
	<view>
		<view class="author-box">
			<view class="useravatar" @click="toUserDetail">
				<u-avatar :src="userAvatar"></u-avatar>
			</view>
			<view class="usertxt">
				<view class="username">这里是用户名</view>
				<view class="datatime" style="color:#888;font-size: 20rpx;">这里是用户内容</view>
			</view>
			<view class="righttxt">
				<view class="username">时间</view>
				<view class="datatime" style="color:#888;font-size: 20rpx;align-self: flex-end;">
					<u-badge :isDot="true" type="success"></u-badge>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"userCard",
		// porps: {
		// 	userID:{
			
		// 	}
		// }
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.author-box{
		width: 100%;
		display: flex;
		padding:30rpx 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		.usertxt{
			display: flex;
			flex:1;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 20rpx;
			
			.username {
				
			}
		}
		.righttxt {
			display: flex;
			padding:0 15rpx;
			text-align: right;
			flex-direction: column;
			justify-content: space-between;
		
		}
	}
</style>