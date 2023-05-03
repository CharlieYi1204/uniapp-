<template>
	<view class="page-detail">
		<!-- 消息提示框 -->
		<u-toast ref="uToast"></u-toast>
		<!-- 顶部用护信息 -->
		<view class="author-box">
			<view class="author-left">
				<view class="useravatar" @click="toUserDetail">
					<u-avatar :src="userData.icon"></u-avatar>
				</view>
				<view class="usertxt">
					<view class="username">{{userData.nickname}}</view>
					<view class="datatime" style="color:#888;font-size: 20rpx;">{{pageData.create_time}}</view>
				</view>
			</view>
			<view class="author-right">
				<view class="focus-button" v-if="!(userData.user_id == currentUserID) ">
					<u-button type="primary" size="mini" text="关注" icon="plus" plain shape="circle" color="#12B5A1" @click="isFoucs" v-if="!isfouced"></u-button>
					<u-button type="primary" size="mini" text="已关注" icon="checkmark" plain shape="circle" color="#888" @click="isFoucs" v-if="isfouced"></u-button>
				</view>
			</view>
		</view>
		<!-- 中部帖子信息栏 -->
		<view class="post-box">
			<!-- 标题 -->
			<view class="post-title">{{pageData.title}}</view>
			<!-- 内容 -->
			<view class="post-context">{{pageData.content}}</view>
			<!-- 如果存在图片就遍历出来，显示在帖子内容下面 -->
			<view class="post-img">
				<view class="img-box">
					<!-- 帖子图片 -->
					 <u-album :urls="urls1" rowCount="3" singleSize="300" multipleSize="100" ></u-album>
				</view>
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
					<!-- <image src="../../../static/icon/warn.png"></image>
					<text>举报</text> -->
				</view>
				<view class="action-like">
					<view class="action-star" style="display:flex;align-items:center;padding-right:10rpx" @click="changeStar">
						<image :src="isStar ? '../../../static/icon/favor_fill.png' : '../../../static/icon/favor.png'"></image>
						<text>收藏&nbsp;{{starNum}}</text>
					</view>
					<view class="action-star" style="display:flex;align-items:center;" @click="changeLikeStatus">
						<image :src="isLike ? `${$imgBaseUrl}/images/like_selected.png` : `${$imgBaseUrl}/images/like_g.png`"></image>
						<text>点赞&nbsp;{{likeCount}}</text>
					</view>
				</view>
			</view>
		</view>
			<!-- 评论区 -->
			<view class="comment-box">
				<view class="comment-title">
					<view>{{commentNum}}条评论</view>
					<view style="color:#888;font-weight: normal;font-size: 30rpx;" @click="replyThisPost">回复本帖</view>
				</view>
				<!-- 评论 -->
				<view class="comment-txt" v-for="(item,index) in commentList" :key="index">
					<pageComment @getCommentData="getSubCommentData" :commentID="index" :propcommentData="item" :postID="postID"
					@deleteGetData = "deleteGetData"></pageComment>
					<view class="comment-txt-2" v-if="item.children">
						<view v-for="(subiitem,subindex) in item.children" :key="subindex">
							<pageComment  :propcommentData="subiitem"  @getCommentData="getSubCommentData" @deleteGetData = "deleteGetData"></pageComment>
						</view>
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
			    v-model="commentPost.content"
				ref = "replyInput"
			  ></u--input>
		</view>
		<view>
			<u-button type="primary" text="回复" color="#12B5A1" @click="sendReply"></u-button>
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
				//传入的帖子ID
				postID:null,
				//帖子的具体数据
				pageData:null,
				//发帖用户的详细信息
				userData:null,
				currentUserID:null,
				//帖子中的图片的相册数据
				urls1:null,
				datetime:"2023-4-16",
				popUpShow:false,
				isStar:false,
				isLike:false,
				likeCount:0,
				starNum:0,
				replyText:'',
				isfouced:false,
				commentNum:0,
				haveSubComment:true,
				commentListInstance:"回复本贴：",
				commentList:null,
				commentPost: {
					user_id:null,
					post_id:null,
					content:'',
					parent_id:null,
				},
				$imgBaseUrl:Vue.prototype.$imgBaseUrl,
				userState:null,
			};
		},
		methods:{
			//添加一条浏览历史记录
			addVisit() {
				const userID = uni.getStorageSync("user_id")
				console.log(userID,"currentUserID")
				console.log(this.postID,"this.postID")
				uni.$u.http.post("/bbs/addVisit",{user_id:userID,post_id:this.postID}).then(res => {
					console.log(1111111)
					console.log(res,"resahahahh")
				})
			},
			//获取当前用户的状态
			getUserState() {
				uni.$u.http.get("/users/getIDTargetUser",{params:{user_id:this.currentUserID}}).then(res => {
					this.userState = res.data.data[0].is_banned
				})
			},
			//子组件删除评论之后，重新获取数据
			deleteGetData(postID) {
				this.getCommentData()
				this.getCommmentNum()
			},
			// 避免点击用户后,无法定位至当前帖子回复
			replyThisPost() {
				this.commentListInstance = "回复本帖："
				this.commentPost.user_id = this.currentUserID
				this.commentPost.post_id = this.postID
				this.commentPost.parent_id = null
			},
			//提交回复
			async sendReply() {
				uni.showLoading({
					title: '加载中'
				});
				console.log(this.userState,"11111")
				await this.getUserState()
				if(this.userState === 0) {
					let content = this.commentPost.content
					// 评论敏感词控制
					uni.$u.http.post(
						"https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined?access_token=24.5ad0345de5d7b3092ded668b39d1bc15.2592000.1684510068.282335-32035516", {
							text: content
						}, {
							header: {
								'Content-Type': 'application/x-www-form-urlencoded',
								'Accept': 'application/json'
							}
						}
					).then(res => {
						let conclusion = res.data.conclusion
						let message = null
						if(conclusion === "合规") {
							this.commentPost.post_id = parseInt(this.postID)
							this.commentPost.user_id = this.currentUserID
							//将评论内容，请求后台	
							uni.$u.http.post("/bbs/replyPost",this.commentPost).then(res => {
								console.log(res)
								uni.hideLoading()
								this.commentPost.content = null
								this.commentList = null
								this.getCommentData()
								this.getCommmentNum()
								uni.hideLoading();
								uni.showToast({
									title: '评论成功',
									icon:'success',
									duration: 1000
								});
							})
						}
						else {
							uni.hideLoading();
							message = res.data.data[0].msg
							uni.showModal({
								title: "提示",
								content: `评论内容${message},请编辑后重新提交`,
								showCancel: false,
							})
						}
					})
				}
				else {
					uni.hideLoading();
					uni.showModal({
						title: '提示',
						content: '该用户已被封禁，无法发言，请联系管理员',
						showCancel:false
					});
					this.modalShow = false
					this.isActive = false
				}
				
				
			},
			toIndex() {
				uni.redirectTo({
					url:'/pages/index/index'
				})
			},
			isFoucs(){
				if(this.isfouced) {
					//已经关注点击后，需要从数据库中删除
					this.cancleFouces()
				}else {
					this.addFouces()
				}
			},
			changeStar() {
				if(!this.isStar){
					//增加收藏
					this.addCollect()
				}
				else{
					this.cancelCollect()
				}
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
					url:`/pages/bbs/userDetail/userDetail?userID=${this.userData.user_id}`
				})
			},
			//获取子组件comment评论的数据
			getSubCommentData(userName,userID,postID) {
				console.log(userName,userID,postID)
				this.commentPost.post_id = postID
				this.commentListInstance = `回复：${userName}`
				this.commentPost.parent_id = postID
			},
			//取消关注接口
			cancleFouces() {
				uni.$u.http.get('/bbs/cancleFollow', {params: {user_id:`${this.currentUserID}`, follow_id:`${this.userData.user_id}`}}).then(res => {
						this.isfouced = !this.isfouced
					}).catch(err => {
				})
			},
			//增加关注接口
			addFouces() {
				uni.$u.http.get('/bbs/follows', {params: {user_id:`${this.currentUserID}`, follow_id:`${this.userData.user_id}`}}).then(res => {
						this.isfouced = !this.isfouced
					}).catch(err => {
					console.log(err)
				})
			},
			//获取评论
			getCommentData() {
				uni.$u.http.get('/bbs/getCommentData', {params: {post_id:`${this.postID}`}}).then(res => {
					console.log(res)
					this.commentList = res.data
				})
			},
			// 获取该页面的具体数据
			getpageDetailData() {
				uni.$u.http.get('/bbs/getTargetPostData', {params: {post_id:`${this.postID}`}}).then(res => {
					this.pageData = res.data.data[0]
					this.urls1 = this.pageData.image
					//获取当前帖子的所有评论 
					this.getCommentData()
					//获取当前发帖的用户信息
					uni.$u.http.get('/users/getIDTargetUser', {params: {user_id:`${this.pageData.user_id}`}}).then(res => {
						const userData = res.data.data[0]
						this.userData = res.data.data[0]
						if(this.userData.nickname == null) {
							this.userData.nickname = `用户${this.userData.user_id}`
						}
						
						this.currentUserID = uni.getStorageSync("user_id")
						//获取当前用户的收藏状态
						uni.$u.http.get('/bbs/getCollectState', {params: {user_id:`${this.currentUserID}`, post_id:`${this.postID}`}}).then(res => {
								this.isStar = res.data
							}).catch(err => {
							console.log(err)
						})
						//获取当前用户对发帖用户的关注状态
						uni.$u.http.get('/bbs/getFollowState', {params: {user_id:`${this.currentUserID}`, followed_id:`${this.userData.user_id}`}}).then(res => {
							this.isfouced = res.data
						})
					}).catch(err => {
						console.log(err)
					})
				})
			},
			//获取帖子的收藏量
			getStarNum() {
				uni.$u.http.get('/bbs/getCollectByID', {params: {post_id:`${this.postID}`}}).then(res => {
					this.starNum = res.data[0].collectNum
				})
			},
			//添加收藏
			addCollect() {
				uni.$u.http.post('/bbs/addCollect', {post_id: `${this.postID}`, user_id: `${this.currentUserID}`} ).then(res => {
					this.getStarNum()
					this.isStar = !this.isStar
				}).catch(err => {
					console.log(err)
				})
			},
			//取消收藏
			cancelCollect() {
				uni.$u.http.post('/bbs/cancelCollect', {post_id: `${this.postID}`, user_id: `${this.currentUserID}`} ).then(res => {
						this.getStarNum()
						this.isStar = !this.isStar
					}).catch(err => {
						console.log(err)
					})
				},
			// 获取当前帖子的点赞量和状态
			getLikesNum() {
				//获取当前贴的点赞数量
				uni.$u.http.get('/bbs/getLikesNum', {params: {post_id:`${this.postID}`}}).then(res => {
					this.likeCount = res.data.data[0].likesNum
				})
				// 从token获取当前已登录用户的ID,通过当前帖子ID和用户ID获取已点赞情况
				this.currentUserID = uni.getStorageSync("user_id")
				const userID = this.currentUserID
				uni.$u.http.get('/bbs/getIsLikes', {params: {post_id:`${this.postID}`,user_id:`${userID}`}}).then(res => {
					this.isLike = res.data
				})
			},
			//改变点赞状态及其数据
			changeLikeStatus() {
				if(!this.isLike){
					//点击添加赞
					uni.$u.http.get('/bbs/addLikes', {params: {post_id:`${this.postID}`,user_id:`${this.currentUserID}`}}).then(res => {
						//获取加入后的记录
						uni.$u.http.get('/bbs/getLikesNum', {params: {post_id:`${this.postID}`}}).then(res => {
							this.likeCount = res.data.data[0].likesNum
						})
					})
					
				}
				else{
					uni.$u.http.get('/bbs/delLikes', {params: {post_id:`${this.postID}`,user_id:`${this.currentUserID}`}}).then(res => {
						uni.$u.http.get('/bbs/getLikesNum', {params: {post_id:`${this.postID}`}}).then(res => {
							this.likeCount = res.data.data[0].likesNum
						})
					})
				}
				this.isLike = !this.isLike
			},
			//获取该贴的评论量
			getCommmentNum() {
				uni.$u.http.get('/bbs/getCommentCountByPostID', {params: {post_id:`${this.postID}`}}).then(res => {
					this.commentNum = res.data[0].commentNum
				}).catch(err => {
					console.log(err)
				}) 
			}
		},
		onLoad(data) {
			this.postID = data.postID
			uni.showLoading({
				title: '加载中'
			});
		},
		onReady() {
			uni.hideLoading();
			
		},
		mounted(){
			this.addVisit()
			this.getpageDetailData()
			this.getLikesNum()
			this.getStarNum()
			this.getCommmentNum()
			this.getUserState()
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
		.post-context {
			padding-top: 20rpx;
			text-indent: 20rpx;
			line-height: 50rpx;
		}
		.post-img {
			.img-box{
				padding-top:15rpx;
				text-align: center;
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
			display: flex;
			justify-content: space-between;
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
