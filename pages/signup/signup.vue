<template>
	<view class="sign-up">
		<!-- 顶部图标 -->
		<view class="signup_top">
			<text class="title-top">注册</text>
			<text class="title-bottom">以开始使用</text>
		</view>
		<!-- 注册表单收集 -->
		<view class="form">
			<u--form labelPosition="top" labelWidth="80px" :model="model1" ref="form">
				<u-form-item label="用户名" prop="userInfo.username" :required="true">
					<u--input placeholder="请输入用户名(作为您的登录凭证)" v-model="model1.userInfo.username" border="bottom" clearable>
					</u--input>
				</u-form-item>
				<u-form-item label="昵称" prop="userInfo.nickname">
					<u--input placeholder="请输入昵称(非必填)" v-model="model1.userInfo.nickname"  clearable border="bottom">
					</u--input>
				</u-form-item>
				<u-form-item label="密码" prop="userInfo.password" :required="true">
					<u--input placeholder="请输入密码" type="password" v-model="model1.userInfo.password" border="bottom">

					</u--input>
				</u-form-item>
				<u-form-item label="确认密码" prop="passwordSecond" :required="true">
					<u--input placeholder="请再次输入密码" type="password" v-model="model1.passwordSecond" border="bottom"> 

					</u--input>
				</u-form-item>
				</u-form-item>
				<u-form-item label="性别" prop="userInfo.sex" @click="showSex = true; hideKeyboard()"
					ref="item1" :required="true" borderBottom = "true">
					<u--input disabled disabledColor="#ffffff" placeholder="请选择性别" v-model="model1.userInfo.gender"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item>
					<u-button formType="submit" shape="circle" color="rgb(18,181,161)" @click="submit()">
						注册
					</u-button>
				</u-form-item>
			</u--form>
			<view class="tologintxt" @click="toLogin()">已有账号？点击登陆></view>
			<!-- 选择性别时的弹窗 -->
			<u-action-sheet :show="showSex" :actions="genderArr" title="请选择性别" @close="showSex = false"
				@select="sexSelect">
			</u-action-sheet>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model1: {
					userInfo: {
						username: "",
						password: "",
						nickname: null,
						gender: null
					},
					passwordSecond:"",
				},
				showSex: false,
				genderArr: [{
						name: "男",
					},
					{
						name: "女",
					},
					{
						name: "保密",
					},
				],
				rules: {
					'userInfo.username': [{
							type: 'string',
							required: true,
							message: '请填写姓名',
							trigger: ['blur', 'change']
						},
						{
							min:3,
							message:'长度不小于3'
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return uni.$u.test.enOrNum(value);
							},
							message: "账号只能包含数字和字母",
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ["change", "blur"],
						}],
						// 校验用户是否已存在
						// {
						// 	asyncValidator: (rule, value, callback) => {
						// 		uni.$u.http.post('/xxx/xxx', {
						// 			name: value
						// 		}).then(res => {
						// 			// 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
						// 			if (res.error) {
						// 				callback(new Error('姓名重复'));
						// 			} else {
						// 				// 如果校验通过，也要执行callback()回调
						// 				callback();
						// 			}
						// 		})
						// 	},
							// 如果是异步校验，无需写message属性，错误的信息通过Error抛出即可
							// message: 'xxx'],
							
							"userInfo.nickname": [
								{
									min: 0,
									max: 15,
									message: '长度在0-15个字符之间'
								},
								{
									pattern: /^[\u4e00-\u9fa5A-Za-z0-9_]{0,15}$/,
									transform(value) {
										return String(value);
									},
									message: "只能包含中文、数字、字母、下划线,且长度大于1"
								}
							],
							"userInfo.password": [{
								type: 'string',
								required: true,
								message: '请输入密码',
								trigger: ['blur', 'change'],
							},{
								min:5,
								message:'长度不小于5'
							}],
							"passwordSecond": [
								{
										type: 'string',
										required: true,
										message: '请再次输入密码',
										trigger: ['blur', 'change'],
								},
								{
									// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
									validator: (rule, value, callback) => {
										// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
										let passwordCorrect = this.model1.userInfo.password == value
										console.log(passwordCorrect)
										return passwordCorrect
									},
									message: "与第一次输入的密码不匹配",
									// 触发器可以同时用blur和change，二者之间用英文逗号隔开
									trigger: [ "blur"],
								}
								]
						}
					};
				},
				onReady() {
					this.$refs.form.setRules(this.rules)
				},
				methods: {
					//跳转到登录界面
					toLogin() {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					},
					//点击性别输入框时，隐藏键盘
					hideKeyboard() {
						uni.hideKeyboard()
					},
					//选择性别的回调函数
					sexSelect(e) {
						console.log(e)
						this.model1.userInfo.gender = e.name
					},
					submit() {
						//效验表单最终数据是否通过
						this.$refs.form.validate().then(res => {
							uni.$u.toast('校验通过')
							console.log(res)
						}).catch(errors => {
							uni.$u.toast('注册失败，请按提示填写')
						})
					}
				}
			}
</script>

<style lang="scss">
	.sign-up {
		padding: 40rpx 40rpx;
		box-shadow: 0 0 blur 100rpx rgba(0, 0, 0, 0.2);

		.signup_top {
			height: 250rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			;
			padding-left: 40rpx;

			.signup-icon {
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
			}

			.title-top {
				font-size: 80rpx;
				font-weight: bold;
				color: #12b5a1;
			}

			.title-bottom {
				font-size: 40rpx;
				padding-top: 40rpx;
			}
		}

		.form {
			padding: 40rpx 50rpx;
			background: #fff;
			border-radius: 40rpx;
		}

		.tologintxt {
			font-size: 30rpx;
			padding-top: 20rpx;
			text-align: center;
			text-decoration: underline;
			color: #888
		}
	}
</style>
