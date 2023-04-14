<template>
	<view class="user">
		<userTopIcon :isLogin="isLogin" :userInfo="useInfo"></userTopIcon>
	<!-- 中部帖子、收藏数量栏目 -->
			<view class="user-newsnum">
				<view class="item" v-for="item in userNewsCollect">
					<view class="info-num" :style="{color: item.color}" v-if="isLogin"> {{item.num}} </view>
					<view class="info-num" :style="{color: item.color}" v-if="!isLogin"> -- </view>
					<view class="info-title">{{item.title}}</view>
				</view>
			</view>
			<!-- 下部，列表功能项 -->
				<view class="user-func">
					<view 
					v-for="(item,index) in userFunc"
					:key="index"
					class="row">
					<view class="func-icon">
						<image :src="item.icon" ></image>
					</view>
					<view class="func-text">{{item.title}}</view>
					</view>
				</view>
			<!-- 退出登录按钮 -->
			<view class="log-out">
				<button color="red" @click="logOut()" v-if="isLogin">退出登录</button>
			</view>
			<u-toast ref="uToast"></u-toast>
		</view>
	</template>
	
	<script>
		export default {
			data() {
				return {
					userNewsCollect: [{
						title:"帖子",
						num:20,
						color:"rgb(116, 185, 255)"
					},{
						title:"收藏",
						num:35,
						color:"rgb(0, 206, 201)"
					},{
						title:"关注",
						num:10,
						color:"rgb(250, 177, 160)"
					},{
						title:"粉丝",
						num:12,
						color:"rgb(225, 112, 85)"
					}],
					userFunc:[{
						title:"修改个人信息",
						icon:"/static/icon/edit.png"
					},
					{
						title:"查看浏览历史",
						icon:"/static/icon/history.png"
					}],
					useInfo: {
					},
					isLogin:false
				};
			},
			methods: {
				//去登录
				toLogin() {
					uni.navigateTo({
						url:"/pages/login/login"
					})
				},
				//若已登录且token未过期，通过token获取当前已登录的用户信息
				getUserInfo() {
					//获取当前已存在的token
					const token = uni.getStorageSync("user_token")
					console.log(token)
					//判断token是否存在，若存在即向后台验证
					if(token) {
						uni.$u.http.get("/users/verifyToken",{ header: { Authorization: `Bearer ${token}` }}).then(res => { 
								const { code, message, user } = res.data;
								if (code == 200) {
								// 获取用户信息成功，更新页面数据)
								//this.useInfo.username = user.username
								this.isLogin = true
								this.useInfo = res.data.user.tokenData
								console.log(this.useInfo)
								} else {
								uni.showToast({ title: message, icon: 'none' });
								this.useInfo = {icon: "images/user_bg.jpg"}
								}
							}).catch( err => {
								console.log(err)
							})
						} else {
						uni.showToast({ title: '请先登录', icon: 'none' })
						this.useInfo = {icon: "images/user_bg.jpg"}
					}
			},
			//注销，退出并清除token至登录页
			logOut(){
				console.log('111')
				uni.removeStorageSync('user_token');
				this.$refs.uToast.show({
					message:"退出登录成功",
					type:"success",
					position:"center",
					duration:800,
					complete() {
						uni.redirectTo({
							url:"/pages/login/login"
						})
					}
				})
			}
			},
			mounted() {
				this.getUserInfo()
			}
		}
	</script>
	
	<style lang="scss" scoped>
	  .user{
		  background: #DFE6E9;
		  padding:20rpx 20rpx;
			.user-newsnum {
				width: 100%;
				height: 200rpx;
				border-radius: 20rpx;
				margin-top: 20rpx;
				padding: 5rpx;
				display: flex;
				justify-content: space-around;
				background-color: #fff;
				.item {
					height: 100%;
					width: 150rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
				.info-num {
					font-size: 50rpx;
					font-weight: bold;
				}
				.info-title{
					font-size: 30rpx;
				}
				}
			}
			.user-func {
				font-size: 40rpx;
				padding:30rpx 40rpx;
				background: #fff;
				margin-top: 20rpx;
				border-radius: 20rpx;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				.row {
					width: 100%;
					height: 80rpx;
					padding:50rpx 0rpx;
					margin-bottom: 20rpx;
					border-bottom: 1px solid #DFE6E9;
					display: flex;
					align-items: center;
					.func-icon{
						width: 50rpx;
						height: 50rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.func-text {
						font-size: 40rpx;
						font-weight: bold;
						padding-left:30rpx
					}
				}
			}
			.log-out {
				margin-top: 20rpx;
				button {
					background: #12B5A1;
					color:white;
					border-radius: 20rpx;
				}
			}
			.enditem{
				border: none;
				color:red;
			}
	  }
		
	
	</style>