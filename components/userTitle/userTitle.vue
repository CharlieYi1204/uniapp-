<template>
	<view class="userTitle-box">
		<view class="usertop-card">
				<view class="author-box">
					<view class="useravatar" @click="toUserDetail">
						<u-avatar :src="userData.icon[0]"></u-avatar>
					</view>
					<!-- 用户头像、ID、个性签名 -->
					<view class="usertxt" @click="toUserDetail">
						<view class="username" style="display: flex">{{userData.nickname}}<u-icon :name="userData.gender === 0 ? 'woman' : 'man'" size="20" style="padding-left: 10rpx;" color="#12B5A1"></u-icon></view>
						<view class="userid" style="color:#888;font-size: 25rpx;padding-top:10rpx">ID：{{userData.user_id}}</view>
						<view class="usersign" style="color:#888;font-size: 25rpx;padding: 10rpx 0rpx;">个性签名：{{userData.signature}}</view>
					</view>
					<view class="author-right">
						<view class="focus-button">
							<u-button type="primary" size="mini" text="关注" icon="plus" plain shape="circle" color="#12B5A1" @click="isFoucs" v-if="!isFocused"></u-button>
							<u-button type="primary" size="mini" text="已关注" icon="checkmark" plain shape="circle" color="#888" @click="isFoucs" v-if="isFocused"></u-button>
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
			userData: {
				type:Object
			}
		},
		data() {
			return {
				isFocused: false,
				userID:""
			};
		},
		methods: {
			toUserDetail() {
				uni.navigateTo({
					url:`/pages/bbs/userDetail/userDetail?userID=${this.userData.user_id}`
				})
			},
			isFoucs(){
				if(this.isFocused) {
					this.cancleFouces()
				}else {
					this.addFouces()
				}
			},
			//获取当前用户的关注状态
			getFocusState() {
				//关注别人状态
				uni.$u.http.get('/bbs/getFollowState', {params: {user_id:`${this.userID}`, followed_id:`${this.userData.user_id}`}}).then(res => {
						this.isFocused = res.data
						console.log(this.isFocused)
					}).catch(err => {
					console.log(err)
				})
			},
			//取消关注接口
			cancleFouces() {
				uni.$u.http.get('/bbs/cancleFollow', {params: {user_id:`${this.userID}`, follow_id:`${this.userData.user_id}`}}).then(res => {
						this.isFocused = !this.isFocused
				})
			},
			// 新增关注接口
			addFouces() {
				uni.$u.http.get('/bbs/follows', {params: {user_id:`${this.userID}`, follow_id:`${this.userData.user_id}`}}).then(res => {
					this.isFocused = !this.isFocused
				})
			},	
		},
		mounted() {
			this.userID = uni.getStorageSync("user_id")
			this.getFocusState()
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