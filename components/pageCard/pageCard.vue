<template>
	<view class="page-card" v-if="isDelete">
		<!-- 模态框，用于确认删除帖子 -->
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="modalShow"
		title="删除帖子?" 
		content="请确认是否删除" 
		cancelText='取消' 
		showCancelButton
		buttonReverse
		@cancel="hiddenModal"
		@confirm="toDeletePost"
		></u-modal>
		<!-- 帖子预览顶部，头像、用户名及发帖时间 -->
		<view class="author-box">
			<view class="author-left">
				<view class="useravatar" @click="toUserDetail">
					<u-avatar :src="userAvatar"></u-avatar>
				</view>
				<view class="usertxt">
					<view class="username">{{userName}}</view>
					<view class="datatime" style="color:#888;font-size: 20rpx;">{{propData.create_time}}</view>
				</view>
			</view>
			<view class="author-right">
				<view class="delet-button">
					<u-button type="primary" size="mini" text="删除帖子" icon="trash" plain shape="circle" color="#12B5A1"  v-if="deletshow"
					@click="deletPost"></u-button>
				</view>
				<view v-if="collectCard">
					<u-button type="primary" size="mini" text="收藏" icon="star" plain shape="circle" color="#12B5A1" @click="isFocus" v-if="!isStar"></u-button>
					<u-button type="primary" size="mini" text="取消收藏" icon="star-fill" plain shape="circle" color="#888" @click="isFocus" v-if="isStar"></u-button>
				</view>
			</view>
		</view>
		<!-- 标题和内容简介 -->
		<view class="title-box" @click="toPageDetil">
			<view class="title">{{propData.title}}</view>
			<view class="content">{{propData.content}}</view>
		</view>
		<!-- 预览图片，最多显示三个 -->
		<view class="pageImg-box" @click="toPageDetil" :class="!userCard ? '' : 'pageimg-userbox'">
			<view class="image-box" v-for="(item,index) in propData.image" :key="index" v-if="index <= 2" >
				<image :src="item" mode="aspectFill"></image>
			</view>
		</view>
			<!-- 下方点赞、评论、阅读量查看 -->
		<view class="active-box" v-if="!userCard">
			<view class="active-img" @click="changeLikeStatus">
				<image :src="isLike ? `${$imgBaseUrl}/images/like_selected.png` : `${$imgBaseUrl}/images/like.png`"></image>
				<view>{{likeCount}}</view>
			</view>
			<view class="active-img">
				<image src="../../static/icon/eyes.png"></image>
				<view>{{propData.visit_count}}</view>
			</view>
			<view class="active-img" @click="toPageDetil">
				<image src="../../static/icon/commit.png"></image>
				<view>{{commentNum}}</view>
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
			deletshow:{
				type:Boolean,
				default:false
			},
			userCard: {
				type:Boolean,
				default:false
			},
			collectCard: {
				type:Boolean,
				default:false
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
				collectCard:false,
				isStar:false,
				$imgBaseUrl:Vue.prototype.$imgBaseUrl,
				isLike:null,
				likeCount:null,
				userAvatar:null,
				userName:null,
				commentNum:null,
				// 从token中获取当前已登录用户的ID
				currentUserID:null,
				modalShow:false,
				isDelete:true,
			};
		},
		methods: {
			//新增收藏
			addCollect() {
				uni.$u.http.post('/bbs/addCollect', {post_id: `${this.propData.id}`, user_id: `${this.currentUserID}`} ).then(res => {
					this.isStar = !this.isStar
				}).catch(err => {
					console.log(err)
				})
			},
			// 取消收藏
			cancelCollect() {
				uni.$u.http.post('/bbs/cancelCollect', {post_id: `${this.propData.id}`, user_id: `${this.currentUserID}`} ).then(res => {
						this.isStar = !this.isStar
					}).catch(err => {
						console.log(err)
					})
				},
			//获取帖子收藏状态
			getCollectState() {
				uni.$u.http.get('/bbs/getCollectState', {params: {user_id:`${this.currentUserID}`, post_id:`${this.propData.id}`}}).then(res => {
						this.isStar = res.data
					}).catch(err => {
					console.log(err)
				})
			},
			//设置关注状态 
			isFocus(){
				if(this.isStar) {
					this.cancelCollect()
				}else {
					this.addCollect()
				}
			},
			// 确认删除帖子
			toDeletePost() {
				console.log(111)
				uni.$u.http.post("/bbs/deletePost",{post_id: `${this.propData.id}`,user_id: `${this.propData.user_id}`}).then(res => {
					console.log("删除成功",res)
					this.modalShow = false
					this.$refs.uToast.show({
						type:"success",
						message:"删除成功",
						duration:800
					})
					this.isDelete=false
				}).catch(err => {
					console.log(err)
				})
			},
			//删除帖子
			deletPost(){
				this.modalShow = true
			},
			hiddenModal() {
				this.modalShow = false
			},
			//获取当前帖子的评论量
			getCommmentNum() {
				uni.$u.http.get('/bbs/getCommentCountByPostID', {params: {post_id:`${this.propData.id}`}}).then(res => {
					this.commentNum = res.data[0].commentNum
				}).catch(err => {
					console.log(err)
				}) 
			},
			//增加浏览量
			addVisitCount() {
					uni.$u.http.get('/bbs/addVisitCount', {params: {post_id:`${this.propData.id}`}}).then(res => { 
					})
			},
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
					this.likeCount = res.data.data[0].likesNum
				})
				// 从token获取当前已登录用户的ID,通过当前帖子ID和用户ID获取已点赞情况
				this.currentUserID = uni.getStorageSync("user_id")
				const userID = this.currentUserID
				uni.$u.http.get('/bbs/getIsLikes', {params: {post_id:`${postID}`,user_id:`${userID}`}}).then(res => {
					this.isLike = res.data
				})
			},
			//改变点赞状态及其数据
			changeLikeStatus() {
				const postID = this.propData.id
				if(!this.isLike){
					//点击添加赞
					uni.$u.http.get('/bbs/addLikes', {params: {post_id:`${postID}`,user_id:`${this.currentUserID}`}}).then(res => {
						//获取加入后的记录
						uni.$u.http.get('/bbs/getLikesNum', {params: {post_id:`${postID}`}}).then(res => {
							this.likeCount = res.data.data[0].likesNum
						})
					})
					
				}
				else{
					uni.$u.http.get('/bbs/delLikes', {params: {post_id:`${postID}`,user_id:`${this.currentUserID}`}}).then(res => {
						uni.$u.http.get('/bbs/getLikesNum', {params: {post_id:`${postID}`}}).then(res => {
							this.likeCount = res.data.data[0].likesNum
						})
					})
				}
				this.isLike = !this.isLike
			},
			toPageDetil() {
				const postID = this.propData.id
				this.addVisitCount()
				uni.navigateTo({
					url:`/pages/bbs/pageDetail/pageDetail?postID=${postID}`
				})
			},
			toUserDetail() {
				uni.navigateTo({
					url:`/pages/bbs/userDetail/userDetail?userID=${this.propData.user_id}`
				})
			}
		},
		mounted () {
			this.getPostAuthor()
			this.getLikesNum()
			this.getCommmentNum()
			this.getCollectState()
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
		justify-content: space-between;
		.author-left {
			display: flex;
		}
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
	.pageimg-userbox{
		padding-bottom: 25rpx;
	}
}
</style>