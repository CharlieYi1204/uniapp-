<template>
	<view class="user">
		<!-- 头部头像区域 -->
		<view class="top">
			<view class="usericon" @click="toLogin()">
					<image :src="isLogin === true ? userData.icon[0] : imgsrc" mode="aspectFill" @click="toLogin()"></image>
					<view v-if="!isLogin">请登录</view>
					<view v-if="isLogin && !notSetNickname" class="username">{{userData.nickname}}</view>
					<view v-if="isLogin && notSetNickname" class="username">未设置昵称</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	 import { number } from 'echarts';
import Vue from 'vue'
	export default {
		name:"userTopIcon",
		props: {
			isLogin:{
				type:Boolean,
				default: false
			},
			userInfo:{
				type:Object,
				default() {
					return {
						username:"默认用户名",
						icon:"/images/user_bg.jpg"
					}
				}
			},
		},
		data() {
			return {
				userID: this.userInfo.user_id,
				userData:null,
			};
		},
		methods: {
			//获取用户数据 
			getUserData() {
				uni.$u.http.get("/users/getIDTargetUser",{params:{user_id:this.userID}}).then(res => {
					this.userData = res.data.data[0]
				})
			},
			toLogin(){
				if(this.isLogin === false) {
					uni.navigateTo({
						url:"/pages/user/login/login"
					})
				}else {
					uni.navigateTo({
						url:`/pages/bbs/userDetail/userDetail?userID=${this.userID}`
					})
				}
			}
		},
		computed: {
			notSetNickname() {
				return this.userInfo.nickname == '' || this.userInfo.nickname == null
			},
			imgsrc() {
				return this.$imgBaseUrl + '/images/user_bg.jpg'
			}
		},
		mounted() {
			this.getUserData()
			const userid = uni.getStorageSync("user_id")
			console.log(userid)
			this.userID = userid
		},
		onShow() {
			this.getUserData()
		}
	}
</script>

<style lang="scss" scoped>
  .user{
	  background: #DFE6E9;
	.top {
		  width: 100%;
		  height: 400rpx;
		  background-image: linear-gradient(to right bottom , #0164A7, #5EAF37);
		  background-image: (url("../../static/img/user_bg.jpg") rgba(0,0,0,0.5));
	
		  background-position:center;
		  border-radius: 30rpx;

		  color: white;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  .usericon {
			text-align: center;
		  	width: 350rpx;
		  	height: 150rpx;
			image {
				border: 3px solid #fff;
				border-radius: 150rpx;
				width: 150rpx;
				height: 100%;
			}
			.username {
				 overflow: hidden;
				 white-space: nowrap;
				 text-overflow: ellipsis;

			}
		  }
		}
	}

</style>