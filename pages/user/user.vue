<template>
	<view class="user">
		<userTopIcon v-if="isLogin" :isLogin="isLogin" :userInfo="useInfo"></userTopIcon>
		<userTopIcon v-if="!isLogin"></userTopIcon>
	<!-- 中部帖子、收藏数量栏目 -->
			<view class="user-newsnum">
				<view class="item" v-for="(item,index) in userNewsCollect" :key="index" @click="toDeatilPage(index)">
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
					class="row"
					@click="goToDetail(index)">
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
					userFunc:[
						{
							title:"个人信息管理",
							icon:"/static/icon/edit.png"
						},
						{
							title:"查看浏览历史",
							icon:"/static/icon/history.png"
						},
						{
							title:"关注的板块",
							icon:"/static/icon/block.png"
						},{
							title:"赞过的帖子",
							icon:"/static/icon/user_like.png"
						}],
					useInfo: {},
					isLogin:false
				};
			},
			methods: {
				goToDetail(i) {
					switch(i){
						case 0:
						uni.navigateTo({
							url:`/pages/user/userFunc/userManage/userManage?user_id=${this.useInfo.user_id}`
						})
						break;
						case 1:
						uni.navigateTo({
							url:`/pages/user/userFunc/visitHistory/visitHistory?user_id=${this.useInfo.user_id}`
						})
						break;
						case 2:
						uni.navigateTo({
							url:`/pages/user/userFunc/userFollowBlock/userFollowBlock?user_id=${this.useInfo.user_id}`
						})
						break;
						case 3:
						uni.navigateTo({
							url:`/pages/user/userFunc/userLikePost/userLikePost?user_id=${this.useInfo.user_id}`
						})
						break;
					}
				},
				getNum() {
					//获取发帖数量
					uni.$u.http.post('/bbs/getPostNumByUserID',  {user_id:`${this.useInfo.user_id}`}).then(res => {
							this.userNewsCollect[0].num = res.data[0].post_num
						}).catch(err => {
						console.log(err)
					})
					//获取收藏数量
					uni.$u.http.post('/bbs/getCollectNumByUserID',  {user_id:`${this.useInfo.user_id}`}).then(res => {
							
							this.userNewsCollect[1].num = res.data[0].collect_num
						}).catch(err => {
						console.log(err)
					})
					//获取关注数量
					uni.$u.http.post('/bbs/getFollowNumByUserID',  {user_id:`${this.useInfo.user_id}`}).then(res => {
							
						this.userNewsCollect[2].num = res.data[0].follow_num
							
						}).catch(err => {
						console.log(err)
					})
					//获取粉丝数量
					uni.$u.http.post('/bbs/getFansNumByUserID',  {user_id:`${this.useInfo.user_id}`}).then(res => {
							this.userNewsCollect[3].num = res.data[0].fans_num
						}).catch(err => {
						console.log(err)
					})
				},
				//跳转至关注、收藏等详情页
				toDeatilPage(i) {
					const currentID = uni.getStorageSync("user_id")
					if (i === 0)
					{
						uni.navigateTo({
							url:`/pages/user/userTags/userPosts/userPosts?user_id=${currentID}`
						})
					}else if(i===1){
						uni.navigateTo({
							url:`/pages/user/userTags/userCollect/userCollect?user_id=${currentID}`
						})
					}else if(i===2){
						uni.navigateTo({
							url:`/pages/user/userTags/userFollow/userFollow?user_id=${currentID}`
						})
					}else{
						uni.navigateTo({
							url:`/pages/user/userTags/userFans/userFans?user_id=${currentID}`
						})

					}
				},
				//去登录
				toLogin() {
					uni.navigateTo({
						url:"/pages/user/login/login"
					})
				},
				//若已登录且token未过期，通过token获取当前已登录的用户信息
				getUserInfo() {
					//获取当前已存在的token
					const token = uni.getStorageSync("user_token")
					//判断token是否存在，若存在即向后台验证
					if(token) {
						uni.$u.http.get("/users/verifyToken",{ header: { Authorization: `Bearer ${token}` }}).then(res => { 
								const { code, message, user } = res.data;
								if (code == 200) {
								// 获取用户信息成功，更新页面数据)
								//this.useInfo.username = user.username
								this.isLogin = true
								this.useInfo = res.data.user.tokenData
								this.getNum()
								uni.setStorageSync('user_id', this.useInfo.user_id);
								} else {
								uni.showToast({ title: message, icon: 'none' });
								this.useInfo = {icon: "/images/user_bg.jpg"}
								//token过期则清除token
								uni.removeStorageSync('user_token');
								uni.removeStorageSync('user_id');
								uni.setStorageSync('isLogin', false);
								}
								
							}).catch( err => {
								console.log(err)
							})
						} else {
						uni.removeStorageSync('user_token');
						uni.removeStorageSync('user_id');
						uni.setStorageSync('isLogin', false);
						uni.showToast({ title: '请先登录', icon: 'none' })
						this.useInfo = {icon: "/images/user_bg.jpg"}
					}
			},
			//注销，退出并清除token至登录页
			logOut(){
				uni.removeStorageSync('user_token');
				uni.removeStorageSync('user_id');
				uni.setStorageSync('isLogin', false);
				this.$refs.uToast.show({
					message:"退出登录成功",
					type:"success",
					position:"center",
					duration:800,
					complete() {
						uni.redirectTo({
							url:"/pages/user/login/login"
						})
					}
				})
			}
			},
			onShow() {
				this.getNum()
				//登录拦截 
				const isLogin = uni.getStorageSync("isLogin")
				// consol.log(isLogin)
				 if (!isLogin) {
				      uni.reLaunch({
				        url: '/pages/user/login/login'
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