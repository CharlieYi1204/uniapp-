<template>
	<view>
		<view class="bbs-blockbox">
			<view class="blocktitle">
				{{classifyTitle}}
			<text style="font-size: 25rpx;color:#888;margin-left: 330rpx;" @click="toBlockClassifyDetail" v-if="moreBlock"> >>更多板块</text>
			<u-divider></u-divider>
			</view>
				<view class="content-box">
					<view class="content-view" v-for="(item,index) in blockName" :key="index" @click="toBlockDetail(item.name)">
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
			classifyTitle:{
				type:String,
				default:"分类名称"
			},
			blockName: {
				type:Array,
				default() {
					return  [{
					name:"成都市",
					num:4
				},
				{
					name:"德阳市",
					num:6
				},
				{
					name:"眉山市",
					num:2
				},
				{
					name:"资阳市",
					num:10
				},{
					name:"雅安市",
					num:3
				}]
				}
			},
			moreBlock: {
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
			};
		},
		methods: {
			//跳转至该板块详情页，把点击的参数带过去
			toBlockDetail(name) {
				uni.navigateTo({
					url:`/pages/bbs/blockDetail/blockDetail?blockname=${name}`
				})
			},
			//跳转至更多板块页面
			toBlockClassifyDetail() {
				uni.navigateTo({
					url:"/pages/bbs/bolckClassifyDetail/bolckClassifyDetail"
				})
			}
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