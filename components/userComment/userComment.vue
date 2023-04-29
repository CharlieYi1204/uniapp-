<template>	
	<!-- 该组件主要用于用户卡片页面的评论展示功能 -->
	<view class="cardComment">
		<view class="author-box">
			<view class="useravatar">
				<u-avatar :src="userData.icon"></u-avatar>
			</view>
			<view class="usertxt">
				<view class="username">{{userName}}</view>
				<view class="datatime" style="color:#888;font-size: 20rpx;">评论于：{{commentData.create_time}}</view>
			</view>
		</view>
		<!-- 评论内容及引用的文章 -->
		<view class="commit-txt">{{commentData.comment_content}}
		<view class="commit-page" @click="toPageDetail()">
			<view class="page-title">{{commentData.title}}</view>
			<view class="page-content">{{commentData.post_content}}</view>
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
			},
			commentData: {
				type:Object,
			},
			propUserData: {
				type:Object
			}
		},
		data() {
			return {
				userData:this.propUserData,
				userName:null,
			};
		},
		methods: {
			toPageDetail(){
				console.log(1111)
				uni.navigateTo({
					url:`/pages/bbs/pageDetail/pageDetail?postID=${this.commentData.post_id}`
				})
			}	
		},
		onReady() {
			console.log(this.userData )
			if(this.userData.nickname) {
				this.userName = this.userData.nickname
			}
			else {
				this.userName = `用户${this.userData.user_id}`
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