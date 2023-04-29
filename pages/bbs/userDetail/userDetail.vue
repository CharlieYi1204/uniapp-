<template>
	<view class="user-detailbox">
		<!--顶部用户信息卡片 -->
		<view class="usertop-card">
		<view class="author-box">
			<view class="useravatar">
				<u-avatar :src="userData.icon"></u-avatar>
			</view>
			<!-- 用户头像、ID、个性签名 -->
			<view class="usertxt">
				<view class="username">{{userData.nickname === null ? '未设置昵称' : userData.nickname}}
				<u-icon name='man' size="20" style="padding-left: 10rpx;" color="#12B5A1" v-if="userData.gender === 0"></u-icon>
				<u-icon name='woman' size="20" style="padding-left: 10rpx;" color="#12B5A1" v-if="userData.gender === 1"></u-icon>
				</view>
				<view class="userid" style="color:#888;font-size: 25rpx;padding-top:10rpx">ID：{{userData.user_id}}</view>
				<view class="usersign" style="color:#888;font-size: 25rpx;padding: 10rpx 0rpx;">个性签名：{{userData.signature}}</view>
			</view>
		</view>
		<!-- 分割线 -->
		<u-divider lineColor="#7f8c8d"></u-divider>
		<!-- 粉丝和关注数 -->
		<view class="user-realtion">
			<view class="realtion-item">
				{{fansNum}}
				<view class="realation-text">粉丝</view>
			</view>
			<view class="realtion-item">
				{{followNum}}
				<view class="realation-text">关注</view>
			</view>
		</view>
		<!-- 关注按钮 -->
		<view v-if="!(userData.user_id == currentUserID) ">
		<u-button type="primary" text="关注" icon="plus" plain shape="circle" color="#12B5A1" @click="isFoucs" v-if="!isFocused"></u-button>
		<u-button type="primary" text="已关注" icon="checkmark" plain shape="circle" color="#888" @click="isFoucs" v-if="isFocused"></u-button>
		<u-button type="primary" text="私聊" icon="chat" plain shape="circle" color="#12B5A1" :custom-style="{marginTop:'20rpx'}" @click="toChatPage()"></u-button>
		</view>
	</view>
		<view class="content-category">
			<view class="category" :class="navIndex === 0 ? 'activecate' : '' " @click="changeCateState(0)">帖子</view>
			<view class="category" :class="navIndex === 1 ? 'activecate' : '' " @click="changeCateState(1)">评论</view>
		</view>
		<!-- 判断渲染评论卡片还是发帖内容卡片 -->
		<view v-for="(item,index) in postData" :key="index">
			<pageCard v-if="navIndex === 0" :propData="item"></pageCard>
		</view>
		<view v-for="(item,index) in commentData" :key="index">
			<userComment v-if="navIndex === 1" :propUserData="userData" :commentData="item"></userComment>
		</view>
		
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
				userSign: {
					type:String,
					default:"这个人很懒，什么都没留下"
				},
				
		},
		data() {
			return {
				commentData:[],
				//根据路由传参，获取到用户数据
				userData:{},
				//路由传参获取发帖人ID
				userID:null,
				//当前已登录
				currentUserID:null,
				navIndex:0,
				isFocused:false,
				// 用于判断评论和内容两个按钮激活
				navIndex:0,
				fansNum:0,
				followNum:0,
				postData:null
			};
		},
		methods:{
			//获取当前用户的评论 
			getCommentByUserID() {
				uni.$u.http.get("/bbs/getCommentByUserID",{params:{user_id:`${this.userID}`}}).then(res => {
					console.log(res.data)
					this.commentData = res.data
				})
			},
			//关注与取消关注功能与页面控制
			isFoucs(){
				if(this.isFocused) {
					this.cancleFouces()
				}else {
					this.addFouces()
				}
			},
			//取消关注接口
			cancleFouces() {
				uni.$u.http.get('/bbs/cancleFollow', {params: {user_id:`${this.currentUserID}`, follow_id:`${this.userData.user_id}`}}).then(res => {
						this.isFocused = !this.isFocused
						//获取粉丝数量
						uni.$u.http.get('/bbs/getFansNum', {params: {followed_id:`${this.userID}`}}).then(res => {
							this.fansNum =  res.data[0].FansNum
						})
				})
			},
			//增加关注接口
			addFouces() {
				uni.$u.http.get('/bbs/follows', {params: {user_id:`${this.currentUserID}`, follow_id:`${this.userData.user_id}`}}).then(res => {
					this.isFocused = !this.isFocused
					//获取粉丝数量
					uni.$u.http.get('/bbs/getFansNum', {params: {followed_id:`${this.userID}`}}).then(res => {
						this.fansNum =  res.data[0].FansNum
					})
				})
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
			},
			getData() {
				//获取用户信息
				uni.$u.http.get('/users/getIDTargetUser', {params: {user_id:`${this.userID}`}}).then(res => {
					console.log(res)
						this.userData = res.data.data[0]
						console.log("111111")
						if(this.userData.signature === null) {
							this.userData.signature = '这个人很懒，什么都没留下'
							}
							//获取当前用户对其他用户的关注状态
								this.currentUserID = uni.getStorageSync("user_id")
								uni.$u.http.get('/bbs/getFollowState', {params: {user_id:`${this.currentUserID}`, followed_id:`${this.userData.user_id}`}}).then(res => {
									console.log(res.data)
									this.isFocused = res.data
								}).catch(err => {
								console.log(err)
							})
						}).catch(err => {
							console.log(err)
						})
				//获取关注数量
				uni.$u.http.get('/bbs/getFollowNum', {params: {follower_id:`${this.userID}`}}).then(res => {
					this.followNum = res.data[0].FollowNum
				})
				//获取粉丝数量
				uni.$u.http.get('/bbs/getFansNum', {params: {followed_id:`${this.userID}`}}).then(res => {
					this.fansNum =  res.data[0].FansNum
				})
				//获取该用户的所发帖子
				uni.$u.http.get('/bbs/getPostByUserID', {params: {user_id:`${this.userID}`}}).then(res => {
					this.postData = res.data.data
					console.log(this.postData)
				})
			}
		},
		onLoad(data) {
			this.userID = data.userID
			uni.showLoading({
					title: '加载中'
				});
			},
		onReady() {
			uni.hideLoading();
		},
		mounted() {
			this.getData()
			this.getCommentByUserID()
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
