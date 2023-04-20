<template>
	<view class="userTitle-box">
		<view class="usertop-card">
				<view class="author-box">
					<view class="useravatar">
						<u-avatar :src="UserHeadImgSrc"></u-avatar>
					</view>
					<!-- 用户头像、ID、个性签名 -->
					<view class="usertxt">
						<view class="username" style="display: flex">用户名<u-icon :name="sex === 0 ? 'woman' : 'man'" size="20" style="padding-left: 10rpx;" color="#12B5A1"></u-icon></view>
						<view class="userid" style="color:#888;font-size: 25rpx;padding-top:10rpx">ID：{{userID}}</view>
						<view class="usersign" style="color:#888;font-size: 25rpx;padding: 10rpx 0rpx;">个性签名：{{userSign}}</view>
					</view>
					<view class="author-right">
						<view class="focus-button">
							<u-button type="primary" size="mini" text="关注" icon="plus" plain shape="circle" color="#12B5A1" @click="isFoucs" v-if="!isfouced"></u-button>
							<u-button type="primary" size="mini" text="已关注" icon="checkmark" plain shape="circle" color="#888" @click="isFoucs" v-if="isfouced"></u-button>
						</view>
					</view>
				</view>
		</view>	
	</view>
</template>

<script>
	export default {
		name:"userTitle",
		props: {
			sex: {
				type:Number,
			},
		},
		data() {
			return {
				isfouced: false,
			};
		},
		methods: {
			isFoucs(){
				this.isfouced = !this.isfouced
			},
		}
	}
</script>

<style lang="scss">
.userTitle-box {

	.usertop-card {
		width: 100%;
		margin-top:20rpx;
		padding:30rpx 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		
	}
	.author-box{
		display: flex;
		align-items: center;
		.usertxt{
			display: flex;
			flex-direction: column;
			flex: 1;
			justify-content: space-between;
			padding-left:20rpx;
			.username {
				font-weight: bold;
			}
		}
	}
}
</style>