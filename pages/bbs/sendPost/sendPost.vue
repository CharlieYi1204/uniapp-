<template>
	<view class="sendpost-box">
		<view class="form-title">发布内容</view>
		<!-- 输入表单 -->
		<view class="form-box">
			<u--form
				labelPosition="left"
				:model="model1"
				ref="uForm"
			>
				<!-- 帖子标题 -->
				<u-form-item
					prop="postInfo.title"
					ref="item1"
				>
					<view class="form-itme-title">标题</view>
					  <u--input
					    placeholder="请输入标题"
					    border="bottom"
						type ="text"
					    clearable
						maxlength = "30"
						v-model="model1.postInfo.title"
					  ></u--input>
				</u-form-item>
				<!-- 帖子内容输入 -->
				<u-form-item
					prop="postInfo.context"
					ref="item1">
					<view class="form-itme-title">内容</view>
					  <u--textarea
						v-model="model1.postInfo.context" 
						placeholder="说些什么吧~"
						count
						border="bottom"
						height = "160"
						maxlength="999"></u--textarea>
				</u-form-item>
				<!-- 论坛板块选择 -->
				<u-form-item
					prop="postInfo.classify">
					<u-cell-group :border="false">
						<u-cell
						    title="选择板块"
						    :value="blockChoosen"
						    arrow-direction="down"
						    isLink
							@click="changePickerShow"
						></u-cell>
					</u-cell-group>
					  <u-picker 
					  :show="pickerShow"
					  ref="uPicker" 
					  :columns="classify"
					  :loading="pickerLoading"
					  @confirm="confirmPicker"
					  @cancel = "this.pickerShow = false"
					  @change="changeHandler"></u-picker>
				</u-form-item>
				<!-- 图片上传 -->
				<u-form-item>
					<view class="form-itme-title">图片上传(最多9张)</view>
					<u-upload
						:fileList="fileList5"
						@afterRead="afterRead"
						@delete="deletePic"
						name="5"
						multiple
						:maxCount="9"
						deletable
					></u-upload>
				</u-form-item>
				<u-button :plain="true" color="#12B5A1" shape="circle" @click="submit">提交</u-button>
			</u--form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model1: {
					postInfo: {
						title:'',
						context:'',
						imgurl:null,
						classify:null,
						block:null,
					}
				},
				rules: {
					'postInfo.title':{
						required:true,
						message: '需填写标题',
						trigger:['blur']
					},
					'postInfo.context':{
						required:true,
						message: '必须填写内容',
						trigger:['blur']
					},
					'postInfo.classify':{
						required:true,
						message: '必须选择一个板块',
						trigger:['change']
					}
				},
				fileList1:[],
				imgUrlArr:[],
				pickerShow:false,
				//板块选择中的一级，板块类型
				classify:[['城市','支付方式'],['成都市','德阳市','眉山市','资阳市']],
				//板块选择中的二级，板块类型中的板块名称
				block:[['成都市','德阳市','眉山市','资阳市'],['实体卡',"NFC卡","天府通APP二维码"]],
				pickerLoading:false,
				//选中板块后外面显示的值
				blockChoosen:"请点击选择",
				loading:false,
			};
		},
		methods: {
			//控制交流板块picker
			changePickerShow() {
				this.pickerShow = true
			},
			//当picker一级列表变化是，进行取值
			
			changeHandler(e) {
				console.log(e)
				  const {
                    columnIndex, 	//列的索引值
                    value,	//当前列选中的值
                    values, // values为当前变化列的数组内容
                    index, 	//当前列选中的值在values数组中的索引值
					// 微信小程序无法将picker实例传出来，只能通过ref操作
                    picker = this.$refs.uPicker
					} = e
					// 当第一列值发生变化时，变化第二列(后一列)对应的选项
						if (columnIndex === 0) {
							this.pickerLoading = true
							uni.$u.sleep(300).then(() => {
								// picker为选择器this实例，变化第二列对应的选项
								picker.setColumnValues(1,this.block[index])
								this.pickerLoading = false
							})
						}
			}, 
			//点击picker的确认按钮
			confirmPicker(e) {
				console.log(e)
				//选择后的数据值，用于显示在cell中
				this.blockChoosen = `${e.value[0]}-${e.value[1]}`
				this.model1.postInfo.classify = e.value[0]
				this.model1.postInfo.block = e.value[1]
				this.pickerShow = false
				console.log(this.model1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			//上传图片的函数
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			submit() {
				let content = `${this.model1.postInfo.title},${this.model1.postInfo.context}`
				uni.showLoading({
					title: '加载中'
				});
				this.$refs.uForm.validate().then(res => {
					//调用百度内容审核API接口，若返回合规则直接发送成功，不合规则弹框请重新编辑，疑似则提交至后台用户进行管理。
					uni.$u.http.post("https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined?access_token=24.5ad0345de5d7b3092ded668b39d1bc15.2592000.1684510068.282335-32035516"
						,{text:content},{header:{'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}}
						).then(res => {
							console.log(res)
							let conclusion = res.data.conclusion
							let message = null
							if(conclusion === "合规") {
								//若API判定内容通过，则用户所发帖会成功提交至数据库
								uni.showModal(
								{
									title:"提示",
									content:"发帖成功",
									showCancel:false,
									success:() => {
										uni.navigateTo({
											delta: 1
											});
									}
								})
							} else {
								conclusion =  res.data.data[0].conclusion
								message =  res.data.data[0].msg
								uni.showModal(
								{
									title:"提示",
									content:`发帖内容${message},请编辑后重新提交`,
									showCancel:false,
								})
							}
							console.log(conclusion,message)
							uni.hideLoading()
						}).catch(err => {
							console.log(err)
						})
				}).catch(errors => {
					uni.hideLoading()
					uni.showModal(
					{
						title:"提示",
						content:"请按规定填写内容",
						showCancel:false,
					})	
				})
			}
		},
		//兼容微信小程序，并且效验规则中的方法，通过setRules方法设置
		onReady() {
			//onReady 为uni-app支持的生命周期之一
		    this.$refs.uForm.setRules(this.rules)
		},
	}
</script>

<style lang="scss">
.sendpost-box {
	padding:20rpx 20rpx;
	.form-title {
		text-align: center;
		color:#12B5A1;
		font-size: 40rpx;
		font-weight: bold;
		padding:20rpx 0rpx;
	}
	.form-box {
		padding:20rpx 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		.form-itme-title{
			padding-left: 10px;
			padding-bottom: 10rpx;
			color:#636e72;
		}
	}
}
</style>
