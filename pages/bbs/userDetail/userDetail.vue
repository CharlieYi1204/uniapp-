<template>
	<view class="user-detailbox">
		<!--顶部用户信息卡片 -->
		<view class="usertop-card">
		<view class="author-box">
			<view class="useravatar">
				<u-avatar :src="UserHeadImgSrc"></u-avatar>
			</view>
			<!-- 用户头像、ID、个性签名 -->
			<view class="usertxt">
				<view class="username">用户名
				<u-icon name='man' size="20" style="padding-left: 10rpx;" color="#12B5A1"></u-icon>
				</view>
				<view class="userid" style="color:#888;font-size: 25rpx;padding-top:10rpx">ID：{{userID}}</view>
				<view class="usersign" style="color:#888;font-size: 25rpx;padding: 10rpx 0rpx;">个性签名：{{userSign}}</view>
			</view>
		</view>
		<!-- 分割线 -->
		<u-divider lineColor="#7f8c8d"></u-divider>
		<!-- 粉丝和关注数 -->
		<view class="user-realtion">
			<view class="realtion-item">
				1111
				<view class="realation-text">粉丝</view>
			</view>
			<view class="realtion-item">
				22222
				<view class="realation-text">关注</view>
			</view>
		</view>
		<!-- 关注按钮 -->
		<u-button type="primary" text="关注" icon="plus" plain shape="circle" color="#12B5A1" @click="isFoucs" v-if="!isSelected"></u-button>
		<u-button type="primary" text="已关注" icon="checkmark" plain shape="circle" color="#888" @click="isFoucs" v-if="isSelected"></u-button>
		<u-button type="primary" text="私聊" icon="chat" plain shape="circle" color="#12B5A1" :custom-style="{marginTop:'20rpx'}" @click="toChatPage()"></u-button>
	</view>
		<view class="content-category">
			<view class="category" :class="navIndex === 0 ? 'activecate' : '' " @click="changeCateState(0)">帖子</view>
			<view class="category" :class="navIndex === 1 ? 'activecate' : '' " @click="changeCateState(1)">评论</view>
		</view>
		<!-- 判断渲染评论卡片还是发帖内容卡片 -->
		<pageCard v-if="navIndex === 0" title="【卡面上新】华为钱包×腾讯手游13张卡面正式来袭！" content="喜欢玩游戏的华为钱包天府通用户们有福气啦！本周华为钱包来给各位天府通小伙伴送夏日卡面福利啦！"></pageCard>
		<userComment v-if="navIndex === 1"></userComment>
	</view>
</template>

<script>
	export default {
		props:{
				propUserHeadImgSrc:{
					type:String,
					default:``
				},
				propPageTime:{
					type:String,
					default:"2023/4/15"
				},
				userID: {
					type:String,
					default:"此处为用户ID"
				},
				userSign: {
					type:String,
					default:"这个人很懒，什么都没留下"
				},
				
		},
		data() {
			return {
				//头像Src
				UserHeadImgSrc:`${this.$imgBaseUrl}images/user_bg.jpg`,
				navIndex:0,
				isSelected:false,
				// 用于判断评论和内容两个按钮激活
				navIndex:0
			};
		},
		methods:{
			isFoucs(){
				this.isSelected = !this.isSelected
			},
			//更改关注状态，请求函数写在这里面
			changeCateState(index) {
				if (index === 1) {
					this.navIndex = 1
				}
				else {
					this.navIndex = 0
				}
			},
			// 跳转至聊天详情页面
			toChatPage() {
				uni.navigateTo({
					url:"/pages/bbs/chat/chat"
				})
			}
		}
	}
</script>

<style lang="scss">
.user-detailbox{
	padding:20rpx 20rpx;
	padding-top: 30rpx;
	height:300rpx;
	.usertop-card {
		width: 100%;
		padding:30rpx 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		
	}
	.author-box{
		display: flex;
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
	.user-realtion{
		padding:0rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		.realtion-item {
			width: 50%;
			font-size: 30rpx;
			font-weight: bold;
			text-align: center;
			.realation-text {
				font-size: 20rpx;
				font-weight: normal;
				padding-top: 10rpx;
				color:#888;
			}
		}
	}
	.content-category {
		display: flex;
		padding: 30rpx 0rpx;
		.category {
			padding:0rpx 20rpx;
			font-size: 30rpx;
		}
		.activecate {
			color:#12B5A1;
		}
	}
}
</style>
