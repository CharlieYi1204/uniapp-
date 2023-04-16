<template>
	<view class="page-card">
		<!-- 帖子预览顶部，头像、用户名及发帖时间 -->
		<view class="author-box">
			<view class="useravatar" @click="toUserDetail">
				<u-avatar :src="propUserHeadImgSrc"></u-avatar>
			</view>
			<view class="usertxt">
				<view class="username">用户名</view>
				<view class="datatime" style="color:#888;font-size: 20rpx;">{{propPageTime}}</view>
			</view>
		</view>
		<!-- 标题和内容简介 -->
		<view class="title-box" @click="toPageDetil">
			<view class="title">好消息！地铁、公交通通5折！天府新区学生卡优惠政策升级→</view>
			<view class="content">为鼓励公交绿色出行，缓解城市交通拥堵，积极响应四川天府新区政策，
			认真践行“全龄友好、幸福出行”服务理念，为天府新区未满18周岁中小学生线上线下办理学生卡优惠政策升级业务。
			天府新区学生卡优惠政策升级情况及办理指南，小天已经为您一一整理好啦，请查收！</view>
		</view>
		<!-- 预览图片，最多显示三个 -->
		<view class="pageImg-box" @click="toPageDetil">
			<view class="image-box" v-for="(item,index) in  propImgUrl">
				<image :src="item.imgUrl" mode="aspectFill"></image>
			</view>
		</view>
			<!-- 下方点赞、评论、阅读量查看 -->
		<view class="active-box">
			<view class="active-img" @click="changeLikeStatus">
				<image :src="isLike ? `${this.$imgBaseUrl}/images/like_selected.png` : `${this.$imgBaseUrl}/images/like.png`"></image>
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
			propImgUrl: {
				type:Array,
				default() {
					return [{
						imgUrl:"http://192.168.8.147:3000/images/tft1.jpg"
					},{
						imgUrl:"http://192.168.8.147:3000/images/tft2.jpg"
					},{
						imgUrl:"http://192.168.8.147:3000/images/tft3.jpg"
					}]
				}
			}
		},
		data() {
			return {
				isLike:false,
				likeCount:5
			};
		},
		methods: {
			changeLikeStatus() {
				if(!this.isLike){
					this.likeCount++
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
				console.log("111")
				uni.navigateTo({
					url:'/pages/bbs/userDetail/userDetail'
				})
			}
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
		justify-content: space-around;
		.image-box{
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