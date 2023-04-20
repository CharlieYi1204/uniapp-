<template>
	<view class="page-card">
		<!-- 帖子预览顶部，头像、用户名及发帖时间 -->
		<view class="author-box">
			<view class="useravatar" @click="toUserDetail">
				<u-avatar :src="userAvatar"></u-avatar>
			</view>
			<view class="usertxt">
				<view class="username">{{userName}}</view>
				<view class="datatime" style="color:#888;font-size: 20rpx;">{{propData.create_time}}</view>
			</view>
		</view>
		<!-- 标题和内容简介 -->
		<view class="title-box" @click="toPageDetil">
			<view class="title">{{propData.title}}</view>
			<view class="content">{{propData.content}}</view>
		</view>
		<!-- 预览图片，最多显示三个 -->
		<view class="pageImg-box" @click="toPageDetil">
			<view class="image-box" v-for="(item,index) in propData.image" v-if="index <= 3">
				<image :src="item" mode="aspectFill"></image>
			</view>
		</view>
			<!-- 下方点赞、评论、阅读量查看 -->
		<view class="active-box">
			<view class="active-img" @click="changeLikeStatus">
				<image :src="isLike ? `${$imgBaseUrl}/images/like_selected.png` : `${$imgBaseUrl}/images/like.png`"></image>
				<view>{{likeCount}}</view>
			</view>
			<view class="active-img">
				<image src="../../static/icon/eyes.png"></image>
				<view>5</view>
			</view>
			<view class="active-img">
				<image src="../../static/icon/commit.png"></image>
				<view>5</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		name:"pageCard",
		props:{
			propUserHeadImgSrc:{
				type:String,
				default:''
			},
			propPageTime:{
				type:String,
				default:"2023/4/15"
			},
			imgBaseUrl: {
				type:String,
			},
			propImgUrl:{
				type:Array,
			},
			content: {
				type:String
			},
				
			title: {
				type:String
			},
			//父组件传过来的值
			propData: {
				type:Object,
				default() {
					return {
						id:null,
						user_id:null,
						create_time:"2023-4-20",
						title:"标题",
						content:"这里是内容",
						image:null,
					}
				}
			}
		},
		data() {
			return {
				$imgBaseUrl:Vue.prototype.$imgBaseUrl,
				isLike:null,
				likeCount:5,
				userAvatar:null,
				userName:null,
				// 从token中获取当前已登录用户的ID
				currentUserID:null,
			};
		},
		methods: {
			//获取所发帖用户的信息
			getPostAuthor() {
				const id = this.propData.user_id
				uni.$u.http.get('/users/getIDTargetUser', {params: {user_id:`${id}`}}).then(res => {
					const userData = res.data.data[0]
					this.userAvatar = userData.icon
					if(userData.nickname) {
						this.userName = userData.nickname
					}
					else {
						this.userName = `用户${userData.user_id}`
					}
				})
			},
			// 获取当前帖子的点赞量和状态
			getLikesNum() {
				//获取当前贴的点赞数量
				const postID = this.propData.id
				uni.$u.http.get('/bbs/getLikesNum', {params: {post_id:`${postID}`}}).then(res => {
					console.log (res)
					this.likeCount = res.data.data[0].likesNum
				})
				// 从token获取当前已登录用户的ID,通过当前帖子ID和用户ID获取已点赞情况
				this.currentUserID = uni.getStorageSync("user_id")
				const userID = this.currentUserID
				uni.$u.http.get('/bbs/getIsLikes', {params: {post_id:`${postID}`,user_id:`${userID}`}}).then(res => {
					this.isLike = res.data
				})
			},
			changeLikeStatus() {
				if(!this.isLike){
					const postID = this.propData.id
					uni.$u.http.get('/bbs/addLikes', {params: {post_id:`${postID}`,user_id:`${this.currentUserID}`}}).then(res => {
						console.log (res,"111")
					})
					uni.$u.http.get('/bbs/getLikesNum', {params: {post_id:`${postID}`}}).then(res => {
						console.log (res,"222")
						this.likeCount = res.data.data[0].likesNum
					})
				}
				else{
					this.likeCount--
				}
				this.isLike = !this.isLike
			},
			toPageDetil() {
				uni.navigateTo({
					url:'/pages/bbs/pageDetail/pageDetail'
				})
			},
			toUserDetail() {
				uni.navigateTo({
					url:'/pages/bbs/userDetail/userDetail'
				})
			}
		},
		mounted () {
			this.getPostAuthor()
			this.getLikesNum()
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
	margin-bottom: 20rpx;;
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
			font-size: 35rpx;
			font-weight: bold;
			//文本超过两行后显示省略号
			overflow:hidden; 
			text-overflow:ellipsis;
			display:-webkit-box; 
			-webkit-box-orient:vertical;
			-webkit-line-clamp:2; 
		}
		.content{
			font-size: 30rpx;
			color: #888;
			padding-top: 10rpx;
			//文本超过两行后显示省略号
			overflow:hidden; 
			text-overflow:ellipsis;
			display:-webkit-box; 
			-webkit-box-orient:vertical;	
			-webkit-line-clamp:2;
		}
	}
	.active-box {
		padding:20rpx 10rpx;
		display: flex;
		justify-content: space-around;
		.active-img {
			display: flex;
			font-size: 30rpx;
			image {
				height: 40rpx;
				width: 40rpx;
				padding-right: 10rpx;
			}

		}
	}
	.pageImg-box{
		display: flex;
		justify-content: flex-start;
		padding:0rpx 20rpx;
		.image-box{
			margin-left: 20rpx;
			width: 200rpx;
			height:200rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
}
</style>