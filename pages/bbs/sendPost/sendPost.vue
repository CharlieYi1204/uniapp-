<template>
	<view class="sendpost-box">
		<view class="form-title">发布内容</view>
		<!-- 输入表单 -->
		<view class="form-box">
			<u--form labelPosition="left" :model="model1" ref="uForm">
				<!-- 帖子标题 -->
				<u-form-item prop="postInfo.title" ref="item1">
					<view class="form-itme-title">标题</view>
					<u--input placeholder="请输入标题" border="bottom" type="text" clearable maxlength="30"
						v-model="model1.postInfo.title"></u--input>
				</u-form-item>
				<!-- 帖子内容输入 -->
				<u-form-item prop="postInfo.context" ref="item1">
					<view class="form-itme-title">内容</view>
					<u--textarea v-model="model1.postInfo.context" placeholder="说些什么吧~" count border="bottom"
						height="160" maxlength="999"></u--textarea>
				</u-form-item>
				<!-- 论坛板块选择 -->
				<u-form-item prop="postInfo.classify">
					<u-cell-group :border="false">
						<u-cell title="选择板块" :value="blockChoosen" arrow-direction="down" isLink
							@click="changePickerShow"></u-cell>
							<u-picker :show="pickerShow" :columns="classify"
							keyName="name"
							@cancel="cancelPicker"
							@confirm="confirmPicker"
							></u-picker>
					</u-cell-group>
				</u-form-item>
				<!-- 图片上传 -->
				<u-form-item>
					<uni-file-picker ref="imgUP" v-model="imageValue" :auto-upload="false" fileMediatype="image"
						mode="grid" @select="select" :limit='9' :del-icon="false" />
					<view class="form-itme-title">图片上传(最多9张)</view>
					<u-button :plain="true" color="#EE394E" shape="circle" @click="clearImg">清空已选图片</u-button>
				</u-form-item>
				<u-button :plain="true" color="#12B5A1" shape="circle" @click="submit">发送帖子</u-button>
			</u--form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				model1: {
					postInfo: {
						user_id: null,
						title: '',
						context: '',
						imgurl: null,
						classify: null,
						is_pass: null,
						image: null,
					}
				},
				rules: {
					'postInfo.title': {
						required: true,
						message: '需填写标题',
						trigger: ['blur']
					},
					'postInfo.context': {
						required: true,
						message: '必须填写内容',
						trigger: ['blur']
					},
				},
				fileList1: [],
				imgUrlArr: [],
				postImgUrl: [],
				pickerShow: false,
				classify: [],
				pickerLoading: false,
				//选中板块后外面显示的值
				blockChoosen: "请点击选择",
				loading: false,
			};
		},
		methods: {
			// 获取板块大类
			getBlockList() {
				uni.$u.http.get("/bbs/getAllBlock").then(res => {
					let data = res.data
					let blocklist = data.map(item => {
						return {
							name:item.name,
							id:item.id
						}
					})
					console.log(blocklist)
					this.classify[0] = blocklist
				})
			},
			//清除已选择图片
			clearImg() {
				this.$refs.imgUP.clearFiles()
				this.imgUrlArr = []
			},
			// 上传图片,获取URL地址
			uploadImg() {
				console.log(111)
				return new Promise(resolve => {
					let a = uni.uploadFile({
						url: 'http://localhost:3000/upload/upimg', //仅为示例，非真实的接口地址
						filePath: this.imgUrlArr[0],
						name: 'image',
						formData: {},
						success: (res) => {
							resolve(res)
						}
					})
				})
			},
			//获取到上传之后的照片地址，方便传入后台数据库
			async setpostUrlImg() {
				let result = await this.uploadImg()
				let imgUrl = JSON.parse(result.data)
				this.postImgUrl.push(imgUrl.data[0])
			},
			// 处理获取到url照片地址,将其数组转换为字符串
			handleImgUrl() {
				if (this.postImgUrl.length !== 0) {
					this.model1.postInfo.image = this.postImgUrl.join(",")
				}
			},
			// 选择图片时触发
			select(e) {
				let eLength = e.tempFilePaths.length
				this.imgUrlArr[0] = e.tempFilePaths[eLength - 1]
				this.setpostUrlImg()
			},
			//控制交流板块picker
			changePickerShow() {
				this.pickerShow = true
			},
			//点击picker的确认按钮
			confirmPicker(e) {
				//选择后的数据值，用于显示在cell中
				this.blockChoosen = e.value[0].name
				this.model1.postInfo.classify = e.value[0].id
				this.pickerShow = false
				
			},
			cancelPicker() {
				this.pickerShow = false
			},
			// 提交数据至后台
			sendPost(pass,message) {
				const currentUserID = uni.getStorageSync("user_id")
				uni.$u.http.post('/bbs/sendPost', {
					user_id: currentUserID,
					category_id: `${this.model1.postInfo.classify}`,
					title: `${this.model1.postInfo.title}`,
					content: `${this.model1.postInfo.context}`,
					is_pass: pass,
					image: `${this.model1.postInfo.image}`,
					failed_reson:message
				}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})

			},

			submit() {
				this.handleImgUrl()
				uni.showLoading({
					title: '加载中'
				});
				let content = `${this.model1.postInfo.title},${this.model1.postInfo.context}`
				console.log(this.model1.postInfo)
				if(this.model1.postInfo.classify === null) {
					uni.hideLoading();
					uni.showModal({
						title: "提示",
						content: `必须选择一个板块`,
						showCancel: false,
					})
				} else {
					this.$refs.uForm.validate().then(res => {
						//调用百度内容审核API接口，若返回合规则直接发送成功，不合规则提交至后台用户进行管理。
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
							console.log(res)
							let conclusion = res.data.conclusion
							let message = null
							if (conclusion === "合规") {
								//若API判定内容通过，则用户所发帖会成功提交至数据库
								this.model1.postInfo.is_pass = 1
								this.sendPost(this.model1.postInfo.is_pass)
								uni.showModal({
									title: "提示",
									content: "发帖成功",
									showCancel: false,
									success: () => {
										uni.reLaunch({
											url: "/pages/bbs/bbs"
										});
									}
								})
							} else if (conclusion === "疑似") {
								this.model1.postInfo.is_pass = 0
								message = res.data.data[0].msg
								this.sendPost(this.model1.postInfo.is_pass,message)
								// conclusion =  res.data.data[0].conclusion
								uni.showModal({
									title: "提示",
									content: `发帖内容${message},已提交至后台等待管理员审核`,
									showCancel: false,
									success: () => {
										uni.reLaunch({
											url: "/pages/bbs/bbs"
										});
									}
								})
					
							} else {
								message = res.data.data[0].msg
								uni.showModal({
									title: "提示",
									content: `发帖内容${message},不允许发布，请编辑后重新提交`,
									showCancel: false,
								})
							}
							uni.hideLoading()
						}).catch(err => {
							console.log(err)
						})
					}).catch(errors => {
						uni.hideLoading()
						console.log(errors)
						uni.showModal({
							title: "提示",
							content: "请按规定填写内容",
							showCancel: false,
						})
					})
				}
			}
		},
		//兼容微信小程序，并且效验规则中的方法，通过setRules方法设置
		onReady() {
			//onReady 为uni-app支持的生命周期之一
			this.$refs.uForm.setRules(this.rules)
		},
		mounted() {
			this.getBlockList()
		}
	}
</script>

<style lang="scss">
	.sendpost-box {
		padding: 20rpx 20rpx;

		.form-title {
			text-align: center;
			color: #12B5A1;
			font-size: 40rpx;
			font-weight: bold;
			padding: 20rpx 0rpx;
		}

		.form-box {
			padding: 20rpx 20rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.form-itme-title {
				padding-left: 10px;
				padding-bottom: 10rpx;
				color: #636e72;
			}
		}
	}
</style>