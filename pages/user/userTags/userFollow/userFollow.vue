<template>
	<view class="follow-box">
		<view v-for="(item,index) in focusUserData" :key="index">
			<userInfoCard :userData = "item" :userID = "userID"></userInfoCard>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userID:null,
				focusUserData:null,
			};
		},
		methods: {
			getUserData() {
				uni.$u.http.post('/bbs/getFocusUerInfoByUserID',  {user_id:`${this.userID}`}).then(res => {
					console.log(res.data.data)
					this.focusUserData = res.data.data
				}).catch(err => {
				console.log(err)
			})
		},
		onLoad(data){
			this.userID = data.user_id
			this.getUserData()
		}
	},
}
</script>

<style lang="scss">
.follow-box {
	padding:20rpx 20rpx;
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
