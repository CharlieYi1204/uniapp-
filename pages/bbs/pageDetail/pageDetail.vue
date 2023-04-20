<template>
	<view class="page-detail">
		<!-- 消息提示框 -->
		<u-toast ref="uToast"></u-toast>
		<!-- 顶部用护信息 -->
		<view class="author-box">
			<view class="author-left">
				<view class="useravatar" @click="toUserDetail">
					<u-avatar :src="`${this.$imgBaseUrl}/images/user_bg.jpg`"></u-avatar>
				</view>
				<view class="usertxt">
					<view class="username">用户名</view>
					<view class="datatime" style="color:#888;font-size: 20rpx;">{{datetime}}</view>
				</view>
			</view>
			<view class="author-right">
				<view class="focus-button">
					<u-button type="primary" size="mini" text="关注" icon="plus" plain shape="circle" color="#12B5A1" @click="isFoucs" v-if="!isfouced"></u-button>
					<u-button type="primary" size="mini" text="已关注" icon="checkmark" plain shape="circle" color="#888" @click="isFoucs" v-if="isfouced"></u-button>
				</view>
			</view>
		</view>
		<!-- 中部帖子信息栏 -->
		<view class="post-box">
			<!-- 标题 -->
			<view class="post-title">【卡面上新】华为钱包×腾讯手游13张卡面正式来袭！</view>
			<!-- 内容 -->
			<view class="post-context">喜欢玩游戏的华为钱包天府通用户们有福气啦！本周华为钱包来给各位天府通小伙伴送夏日卡面福利啦！
《英雄联盟》手游、《穿越火线》手游、《使命召唤》手游、《QQ飞车》手游，4款炙手可热的手游卡面上线啦！13款精美绝伦的卡面限时免费送啦！前往华为钱包现在领取，部分卡片永久有效哦！
			</view>
			<!-- 如果存在图片就遍历出来，显示在帖子内容下面 -->
			<view class="post-img">
				<view class="img-box"><image src="../../../static/img/tft3.jpg" mode='aspectFill'></image></view>
			</view>
			<!-- 弹出层进行内容举报 -->
			<u-popup :show="popUpShow">
			        <view class="popup-box">
			        	<view class="title">举报</view>
						<u--textarea v-model="reportValue" 
							placeholder="请输入内容" 
							style="padding"
							count
							height="100"
							maxlength= "200"></u--textarea>
						  <view class="button-box" style="display:flex;justify-content: space-around;">
								<view class="report-button" style="width:250rpx">
									<u-button type="primary" color="#000" :plain="true" text="取消" @click="hiddenPopUp"></u-button>
						  		</view>
						  		<view class="report-button"  style="width:250rpx">
						  		  <u-button type="primary" color="#12B5A1" text="提交" @click="sendReportData"></u-button>
								</view>
						  </view>
							
			        </view>
			</u-popup>
			<!-- 内容下部,举报、点赞、收藏 -->
			
			<view class="page-action">
				<view class="action-report" style="display:flex;align-items:center;"
				@click="popUpShow = true">
					<image src="../../../static/icon/warn.png"></image>
					<text>举报</text>
				</view>
				<view class="action-like">
					<view class="action-star" style="display:flex;align-items:center;padding-right:10rpx" @click="changeStar">
						<image :src="isStar ? '../../../static/icon/favor_fill.png' : '../../../static/icon/favor.png'"></image>
						<text>收藏&nbsp;{{starNum}}</text>
					</view>
					<view class="action-star" style="display:flex;align-items:center;" @click="changeLike">
						<image :src="isLike ? `${$imgBaseUrl}/images/like_selected.png` : `${$imgBaseUrl}/images/like_g.png`"></image>
						<text>点赞&nbsp;{{likeNum}}</text>
					</view>
				</view>
			</view>
		</view>
			<!-- 评论区 -->
			<view class="comment-box">
				<view class="comment-title">
					{{commentNum}}条评论
				</view>
				<!-- 二级评论 -->
				<view class="comment-txt" v-for="(item,index) in commentList" :key="index">
					<pageComment @getCommentData="getCommentData" :commentID="index"></pageComment>
					<view class="comment-txt-2">
						<pageComment :isSubComment = "true" v-if="haveSubComment"></pageComment>
					</view>
					<u-divider lineColor="#596275"></u-divider>
				</view>
			</view>
			<!-- 底部输入框 -->
	<view class="input-bottom">
		<view class="bottom-input">
			 <u--input
			    :placeholder="commentListInstance"
			    border="surround"
			    v-model="value"
				ref = "replyInput"
			  ></u--input>
		</view>
		<view>
			<u-button type="primary" text="回复" color="#12B5A1"></u-button>
		</view>
	</view>
	<!-- 占位符，防止页面挡住 -->
	<view class="pleceHolder">
	</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				datetime:"2023-4-16",
				popUpShow:false,
				isStar:false,
				isLike:false,
				likeNum:0,
				starNum:0,
				value:'',
				isfouced:false,
				reportValue:"",
				commentNum:1,
				haveSubComment:true,
				commentListInstance:"回复该贴：",
				commentList:[1,2],
				$imgBaseUrl:Vue.prototype.$imgBaseUrl,
			};
		},
		methods:{
			toIndex() {
				uni.redirectTo({
					url:'/pages/index/index'
				})
			},
			isFoucs(){
				this.isfouced = !this.isfouced
			},
			changeStar() {
				if(!this.isStar){
					this.starNum++
				}
				else{
					this.starNum--
				}
				this.isStar = ! this.isStar
			},
			changeLike(){
				if(!this.likeNum){
					this.likeNum++
				}
				else{
					this.likeNum--
				}
				this.isLike = ! this.isLike
			},
			sendReportData(){
				this.popUpShow = false
				this.$refs.uToast.show({
					message:"举报成功",
					type:"success",
					position:"center",
					duration:1000,
				})
			},
			hiddenPopUp() {
				this.popUpShow = false
			},
			toUserDetail() {
				uni.navigateTo({
					url:"/pages/bbs/userDetail/userDetail"
				})
			},
			//获取子组件comment一级评论的数据
			getCommentData(id) {
				this.commentListInstance = `回复：${id}`
			}
		},
		onLoad(data) {
			console.log(data.pageID)
		}
	}
</script>

<style lang="scss">
.page-detail{
	.author-box{
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color:#fff;
		padding:30rpx 30rpx;
		.author-left{
			display: flex;
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
		.author-right {
			.focus-button {
				
			}
		}
	}
	.post-box {
		background-color:#fff;
		margin-top: 20rpx;
		padding:30rpx 30rpx;
		.post-title{
			font-size: 35rpx;
			font-weight: bold;
		}
		.post {
			ttext-indent: 20rpx;
		}
		.post-img {
			.img-box{
				padding-top:15rpx;
				width: 100%;
				height: 400rpx;
				image {
					width: 100%;
					height:100%;
				}
			}
			
		}
		.popup-box {
			padding:20rpx 20rpx;
			.title {
				text-align:center;
				padding-bottom: 20rpx;
				font-size: 30rpx;
				font-weight: bold;
			}
			.button-box{
				padding-top:30rpx;
			}
		}
		.page-action {
			display: flex;
			justify-content: space-between;
			padding-top:20rpx;
			font-size:25rpx;
			color:#888;
			.action-report {
				image{
					width:40rpx;
					height:40rpx
				}
				text {
					padding-left: 5rpx;
				}
			}
			.action-like {
				display: flex;
				.action-star {
				}image{
					width:40rpx;
					height:40rpx
				}
				text {
					padding-left: 5rpx;
				}
			}
		}
}
 .comment-box {
		margin-top: 20rpx;
		width: 100%;
		background-color: #fff;
		padding: 30rpx 20rpx;
		padding-top:0rpx;
		.comment-title {
			font-weight: bold;
			padding:30rpx 0rpx;
			padding:20rpx;
		}
		.comment-txt{
			.comment-txt-2{
				padding-left: 80rpx;
			}
		}
	}
	.input-bottom {
		height:150rpx;
		width: 100%;
		position: fixed;
		bottom:0;
		left:0;
		background-color: #fff;
		padding:20rpx 20rpx 0rpx 20rpx;
		display: flex;
		justify-content: space-around;
		.bottom-input{
			width: 80%;
		}
	}
	.pleceHolder{
		height: 150rpx;
	}
}
</style>
