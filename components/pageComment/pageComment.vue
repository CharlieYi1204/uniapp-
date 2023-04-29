<template>
	<view class="comment-box">
		<!-- 顶部用护信息 -->
		<view class="author-box">
			<!-- 左侧头像和发帖时间 -->
			<view class="author-left">
				<view class="useravatar" @click="toUserDetail">
					<u-avatar :src="userData.icon"></u-avatar>
				</view>
				<view class="usertxt">
					<view class="username">{{userName}}</view>
					<view class="datatime" style="color:#888;font-size: 20rpx;">{{commentData.create_time}}</view>
				</view>
			</view>
			<!-- 右侧为是当前用户评论的删除接口 -->
			<view class="author-right">
				<view class="focus-button" v-if="userData.user_id === currentUserID" @click="deleteComment()">
					<view class="action-star" style="display:flex;align-items:center;">
						<u-icon name="trash" size="25" color="#888"></u-icon>
						<text style="color: #888;font-size: 25rpx;">删除</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论内容 -->
		<view class="comment-txt" @click="reply">
			{{commentData.content}}
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
			commentID:  {
				type:Number
			},
			postID: {
				type:Number
			},
			//父组件传过来的评论数据
			propcommentData: {
				type:Object
			},
		},
		data() {
			return {
				userData:null,
				userName:null,
				commentData:this.propcommentData,
				$imgBaseUrl:Vue.prototype.$imgBaseUrl,
				// commentLikeNum:0,
				// isCommentLike:false,
				ID:this.commentID,
				currentUserID:null,
			};
		},
		methods: {
			// 删除评论
			deleteComment() {
				console.log("1111")
				//模态框
				const id =  this.commentData.id
				const postID = this.postID
				//防止this的指向发生变化
				const self = this
				uni.showModal({
					title: '提示',
					content: '确定要删除这条评论吗',
					success: function (res) {
						if (res.confirm) {
							//通过组件传值，调用父组件获取评论方法，避免删除页面之后需要刷新
							uni.$u.http.post("/bbs/deleteComment",{comment_id:id}).then( res => {
								console.log(postID)
								self.deleteGetData()
								uni.showToast({
									title: '删除成功',
									duration: 1000,
									icon:"success"
								});
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				
			},
			//跳转至用户详情
			toUserDetail() {
				uni.navigateTo({
					url:`/pages/bbs/userDetail/userDetail?${this.commentData.user_id}`
				})
			},
			//点击评论内容，回复框显示所选用户
			deleteGetData() {
				console.log("2222")
				this.$emit("deleteGetData",this.postID)
			},
			reply() {
				this.$emit("getCommentData",this.userName,this.commentData.user_id,this.commentData.id)
			},
			getUserInfo() {
				uni.$u.http.get('/users/getIDTargetUser', {params: {user_id: `${this.commentData.user_id}`}}).then(res => {
					this.userData = res.data.data[0]
					this.currentUserID = uni.getStorageSync("user_id")
					console.log(this.currentUerID)
					console.log(this.userData)
					if(this.userData.nickname !== null) {
						this.userName = this.userData.nickname
					}
					else {
						this.userName = `用户${this.userData.user_id}`
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		mounted() {
			this.getUserInfo()
		}
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
				justify-content: space-around;
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
		font-size: 30rpx;
		padding: 15rpx 0rpx;
		padding-left: 100rpx;
	}
}
</style>