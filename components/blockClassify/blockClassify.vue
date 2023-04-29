<template>
	<view>
		<view class="bbs-blockbox">
			<view class="blocktitle">
				{{classifyTitle}}
			<text style="font-size: 25rpx;color:#888;margin-left: 330rpx;" @click="toBlockClassifyDetail" v-if="moreBlock"> >>更多板块</text>
			<u-divider></u-divider>
			</view>
				<view class="content-box">
					<view class="content-view" v-for="(item,index) in blockName" :key="index" @click="toBlockDetail(item.name,item.id,item.num)">
						<view class="left-img">
							<u-avatar
								size="45"
								:text="item.name.slice(0, 1)"
								fontSize="25"
								bg-color="#12B5A1">
							</u-avatar>
						</view>
						<view class="right-txt">
							<view>
								{{item.name}}
							</view>
							<view style="font-size: 20rpx;color:#888;padding-top:20rpx">
								帖子数量：{{item.num}}
							</view>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		name:"blockClassify",
		props:{
			classifyData: {
				type:Object,
				default(){
					return null
				}
			},
			classifyTitle:{
				type:String,
				default:"分类名称"
			},
			propBlockName: {
				type:Array
			},
			moreBlock: {
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				blockName:this.propBlockName
			};
		},
		//监听父组件传递过来的值
		watch: {
			propBlockName(newVal,oldVal) {
				this.blockName = newVal
			}
		},
		methods: {
			//获取分块大类中的板块明细
			getBlockName() {
				uni.showLoading({
					title: '加载中'
				});
				uni.$u.http.get("/bbs/getBlockName",{params:{classifyID: this.classifyData.classify}}).then(res => {
					this.blockName = res.data
					//获取板块中的帖子数量，如果没有则显示为0
					uni.$u.http.get("/bbs/getBlockPostNum").then(res => {
						let num = res.data
						// 遍历板块分类
						this.blockName.forEach(block => {
							// 在板块中有帖子的数据中查找
							let found = num.find(postnum => postnum.category_id === block.id)
							// 找到后,将对应的帖子数量赋值给板块对象中的属性
							if(found){
								block.num = found.post_num
							}else {
								block.num = 0
							}
						})
						// 	强制更新组件
						 this.$forceUpdate();
						uni.hideLoading();
					})
				})
			},
			//跳转至该板块详情页，把点击的参数带过去
			toBlockDetail(name,id,num) {
				console.log(1111)
				uni.navigateTo({
					url:`/pages/bbs/blockDetail/blockDetail?blockname=${name}&blockID=${id}&num=${num}`
				})
			},
			//跳转至更多板块页面
			toBlockClassifyDetail() {
				uni.navigateTo({
					url:"/pages/bbs/bolckClassifyDetail/bolckClassifyDetail"
				})
			}
		},
		mounted() {
			this.getBlockName()
		}
	}
</script>

<style lang="scss">
	.bbs-blockbox{
		background-color: #fff;
		padding:15rpx 15rpx;
		border-radius: 20rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		margin-bottom: 20rpx;
		.blocktitle {
			padding:15rpx 15rpx;
			font-size:40rpx;
			font-weight: bold;
			color:#12B5A1;	
		}
		.content-box {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: flex-start;
			width: 100%;
			padding:0rpx 10rpx;
			padding-left: 20rpx;
			.content-view{
				width: 50%;
				display: flex;
				align-items: center;
				padding-bottom:20rpx;
				padding-left: 20rpx;
				height:120rpx;
			}
			.right-txt {
				padding-left:20rpx;
			}
		}
		}
</style>