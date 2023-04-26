<template>
	<view>
		<view class="author-box" @click="toChat">
			<view class="useravatar" @click="toUserDetail">
				<u-avatar :src="userData.icon[0]"></u-avatar>
			</view>
			<view class="usertxt">
				<view class="username">{{userData.nickname}}</view>
				<view class="datatime" style="color:#888;font-size: 20rpx;">你好，请问一下...</view>
			</view>
			<view class="righttxt">
				<view class="username">2023/5/6</view>
				<view class="datatime" style="color:#888;font-size: 20rpx;align-self: flex-end;">
					<u-badge :isDot="showDot" type="success" @click="showDot = false"></u-badge>
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
				userData:null,
				showDot:true,
				text:"你好，想请问一下雅安雨城区13路可以使用天府通吗？"
			};
		},
		methods: {
			getUserData() {
				uni.$u.http.get("/users/getIDTargetUser",{params:{user_id:51}}).then(res =>{
					console.log(res)
					this.userData = res.data.data[0]
				})
			},
			toChat() {
				uni.navigateTo({
					url:"/pages/bbs/chat/chat"
				})
			}
		},
		mounted() {
			this.getUserData()
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