<template>
	<view class="login">
		<!-- 顶部图标 -->
		<view class="login_top">
			<view class="login-icon">
				<image src="../../../static/icon/login_icon.png"></image>
			</view>
			<text @click="toSignUp()">还没有账号？去注册></text>
		</view>
		
		<!-- 中部登录 -->
		<view class="form">
			<u-form 
			labelPosition="left"
			:model="userLogin"
			@submit="res => console.log(res)"
			>
				<u-form-item
					label="账号"
					borderBottom
				>
					<u--input
						v-model="userLogin.username"
						placeholder="请输入用户名"
				>	</u--input>
			</u-form-item>
			<u-form-item
					label="密码"
					borderBottom
				>
					<u--input
						type="password"
						v-model="userLogin.password"
						placeholder="请输入密码"
				></u--input>
			</u-form-item>
			<u-form-item>
				<u-button formType="submit" shape="circle" color="rgb(18,181,161)" @click="getInfo()">
					登录
				</u-button>
			</u-form-item>
			</u-form>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value6:0,
				userLogin: {
					username:"",
					password:""
				},
				loading:true,
				toastType:"",
			}
		},
		methods: {
			//提交登录信息至后台
			getInfo() {
				let userLogin = this.userLogin
				//将用户名和密码提交至后台进行验证
				uni.$u.http.post('/users/userLogin',{
					username: userLogin.username,
					password: userLogin.password,
				},{dataType: 'json'}).then(res => {
					if(res.data.message == "登录成功")
					{
						//若登录成功就将用户token保存
						uni.setStorageSync('user_token',res.data.token)
						uni.setStorageSync('isLogin', true)
						this.toastType = "success"
					} else {
						this.toastType = "error"
					}
					let toastType = this.toastType
					this.$refs.uToast.show({
						type:this.toastType,
						message:res.data.message,
						duration:800,
						url:"/pages/user/user",
						complete() {
							//如果登录成功就进行跳转到用户页面
							if(toastType == "success") {
								uni.reLaunch({
									url:"/pages/user/user"
								})
							}
						}
					})})
					.catch((errpr) => {
						this.$refs.uToast.show({
							type:"error",
							message:"登录失败",
							duration:800,
						})
					})
					//登录成功则跳转至用户中心
					
			},
			toSignUp() {
				uni.navigateTo({
					url:"/pages/user/login/signup/signup"
				})
			}
		}
	}
</script>

<style lang="scss">
.login {
	padding: 20rpx 20rpx;
	.login_top {
		height: 400rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.login-icon{
			height: 180rpx;
			width: 180rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		text {
			font-size: 30rpx;
			padding-top: 20rpx;
			text-decoration: underline;
			color:#888
		}
	}
	.form{
			padding: 20rpx 20rpx;
		}
	}

</style>
