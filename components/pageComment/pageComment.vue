<template>
	<view class="comment-box">
		<!-- 顶部用护信息 -->
		<view class="author-box">
			<!-- 左侧头像和发帖时间 -->
			<view class="author-left">
				<view class="useravatar" @click="toUserDetail">
					<u-avatar :src="propUserHeadImgSrc"></u-avatar>
				</view>
				<view class="usertxt">
					<view class="username">用户名</view>
					<view class="datatime" style="color:#888;font-size: 20rpx;">{{datatime}}</view>
				</view>
			</view>
			<!-- 右侧点赞按钮 -->
			<view class="author-right">
				<view class="focus-button">
					<view class="action-star" style="display:flex;align-items:center;" @click="changeCommntLike">
						<image :src="isCommentLike ? `${$imgBaseUrl}/images/like_selected.png` : `${$imgBaseUrl}/images/like_g.png`"></image>
						<text>&nbsp;{{commentLikeNum}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论内容 -->
		<view class="comment-txt" @click="reply">
			在哪里可以更换呢？要不要钱啊！！！！为什么电信、移动NFC卡和天府通-华为内测卡可以使用次数，后面的卡就不行了？
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		name:"pageComment",
		props: {
			propUserHeadImgSrc: {
				type:String,
				default:"../../static/img/tft1.jpg"
			},
			isSubComment: {
				type:Boolean,
				default:false
			},
			commentID:  {
				type:Number
			}
		},
		data() {
			return {
				$imgBaseUrl:Vue.prototype.$imgBaseUrl,
				commentLikeNum:0,
				isCommentLike:false,
				datatime:'2023-4-16 14:53',
				ID:this.commentID
			};
		},
		methods: {
			//点赞~
			changeCommntLike() {
				if(!this.isCommentLike){
					this.commentLikeNum++
				}else {
					this.commentLikeNum--
				}
				this.isCommentLike = !this.isCommentLike
			},
			//跳转至用户详情
			toUserDetail() {
				uni.navigateTo({
					url:"/pages/bbs/userDetail/userDetail"
				})
			},
			//点击评论，聚焦回复框
			reply() {
				this.$emit("getCommentData",this.ID)
			}
		},
		
	}
</script>

<style lang="scss">
.comment-box{
	padding:10rpx 0rpx;
	.author-box{
		width: 100%;
		padding:0rpx 0rpx;
		font-size: 25rpx;
		font-weight: normal;
		display: flex;
		justify-content: space-between;
		background-color:#fff;
		.author-left{
			display: flex;
			.usertxt{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-left: 20rpx;
				.username {
					font-weight: bold;
					color:#757575;
				}
				.datatime {
					color:#A4A4A4;
			}
		}
		}
		.author-right {
			.action-star {
			image{
				width:40rpx;
				height:40rpx;
			}
			text {
				padding-left: 5px;
			}
		}
		}
	}
	.comment-txt {
		font-size: 25rpx;
		padding: 15rpx 0rpx;
		padding-left:90rpx;
	}
}
</style>