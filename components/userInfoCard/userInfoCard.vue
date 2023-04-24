<template>
	<view class="useInfo-box">
			<view class="author-box">
				<view class="author-left" @click="toUserDeatil">
					<view class="useravatar">
						<u-avatar :src="userData.icon"></u-avatar>
					</view>
					<!-- 用户头像、ID、个性签名 -->
					<view class="usertxt">
						<view class="username">{{userData.nickname === null ? '未设置昵称' : userData.nickname}}
						<u-icon name='man' size="20" style="padding-left: 10rpx;" color="#12B5A1" v-if="userData.gender === 0"></u-icon>
						<u-icon name='woman' size="20" style="padding-left: 10rpx;" color="#12B5A1" v-if="userData.gender === 1"></u-icon>
						</view>
						<view class="userid" style="color:#888;font-size: 25rpx;padding-top:10rpx">ID：{{userData.user_id}}</view>
						<view class="usersign" style="color:#888;font-size: 25rpx;padding: 10rpx 0rpx;">个性签名：{{userData.signature === null ? '这个人很懒，什么都没留下' :  userData.signature}}</view>
					</view>
				</view>
				<view class="author-right">
					<u-button type="primary" size="mini" text="关注" icon="plus" plain shape="circle" color="#12B5A1" @click="isFoucs" v-if="!isFocused"></u-button>
					<u-button type="primary" size="mini" text="取消关注" icon="checkmark" plain shape="circle" color="#888" @click="isFoucs" v-if="isFocused"></u-button>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"userInfoCard",
		props: {
			userData: {
				type:Object
			},
			userID: {
				type:Number
			}
		},
		data() {
			return {
				isFocused:false
			};
		},
		methods: {
			toUserDeatil() {
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
			this.getFocusState()
		}
	}
</script>

<style lang="scss">
.useInfo-box {
	padding:10rpx 10rpx;
	.author-box{
		width: 100%;
		padding:30rpx 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		display: flex;
		.author-left {
			display: flex;
			flex: 1;
			.usertxt{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-left:20rpx;
				.username {
					display: flex;
					font-weight: bold;
				}
			}
		}
	}
}
</style>