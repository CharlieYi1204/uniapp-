<template>
	<view class="blockdetail-box">
		<!-- 顶部板块详情页 -->
			<view class="block-title">
				<view class="title-left">
					<view class="block-icon">
						<u-avatar
							size="60"
							:text="name.slice(0, 1)"
							fontSize="35"
							bg-color="#12B5A1">
						</u-avatar>
					</view>
					<view class="blocktext">
						<view class="block-name">{{name}}</view>
						 <view class="info-box">
							 <view class="block-info" style="color:#888;font-size: 20rpx;">发帖数：{{postNum}}</view>
							 <view class="block-info" style="color:#888;font-size: 20rpx;padding-left: 20rpx;">关注人数：{{postNum}}</view>
							 
						 </view>
						 	<view class="block-notice">
						 		板块信息公告:<view style="text-indent: 40rpx;">成都市12+2主城区和绝大多数郊县已全面支持天府通产品，请尽情使用。交流用户需严格遵守社区管理规则，禁止发布非法、色情信息，否则管理员将对其进行封禁处理</view>
						 	</view>
					</view>
					
				</view>
				<view class="title-right">
					<view class="focus-button">
						<u-button type="primary" size="mini" text="关注" icon="plus" plain shape="circle" color="#12B5A1" @click="isFoucs" v-if="!isfouced"></u-button>
						<u-button type="primary" size="mini" text="已关注" icon="checkmark" plain shape="circle" color="#888" @click="isFoucs" v-if="isfouced"></u-button>
					</view>
				</view>
			</view>
			<!-- 精选置顶帖 -->
			<view class="sticky-box">
				<view class="sticky-title">精选内容</view>
				<view class="sticky-row" v-for="(item,index) in postTitle" :key="index" @click="toPageDetail">
					<view class="sticky-icon">
						<image src="/static/icon/sticky.png"></image>
					</view>
					<view class="post-title">{{item.title}}</view>
				</view>
			</view>
			<!-- 最新帖子卡片 -->
			<u-divider text="最新帖子"></u-divider>
			<pageCard></pageCard>
	</view>
</template>

<script>
	export default {
		props: {
			blockName:{
				type:String,
				default:"成都市"
			},
			postNum: {
				type:Number,
				default:15
			},
				
			postTitle: {
				type:Array,
				default:[{
					title:"小天钱包来啦,各种乘车福利等你来拿！"
				},{
					title:"都江堰公交全面支持天府通支付体系"
				},{
					title:"天府通APP成都·重庆 双城记"	
				},{
					title:"乘车福利支付宝天府通乘车码低至一分钱乘公交！"	
				},{
					title:"天府通 X 漫威系列正版授权联名卡,正式发售！"
				}]
			}
		},
		data() {
			return {
				name:'城市名称',
				isfouced:false
				
			};
		},
		methods: {
			isFoucs(){
					this.isfouced = !this.isfouced
				},
			toPageDetail() {
				uni.navigateTo({
					url:"/pages/bbs/pageDetail/pageDetail"
				})
			}
		},
		onLoad(data) {
			this.name = data.blockname
		}
	}
</script>

<style lang="scss">
 .blockdetail-box {
	padding:20rpx 20rpx;
		.block-title{
			width: 100%;
			display: flex;
			border-radius: 20rpx;
			justify-content: space-between;
			background-color:#fff;
			padding:30rpx 30rpx;
			.title-left{
				display: flex;
				flex:1;
				.blocktext{
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding-left: 20rpx;
					.info-box {
						display: flex;
					}
					.block-name {
						font-size: 40rpx;
						font-weight: bold;
					}
					.block-info{
						
					}
					.block-notice{
						margin-top: 15rpx;
						padding:15rpx 15rpx;
						background-color: #eee;
						width: 100%;
						color:#888;
						font-size: 20rpx;
						border-radius: 20rpx;
						
					}
				}
			}
			.title-right {
				.focus-button {
					
				}
			}
		}
		.sticky-box{
			background-color:#fff;
			padding:30rpx 30rpx;
			border-radius: 20rpx;
			margin-top: 20rpx;
			.sticky-title {
				font-weight: bold;
				font-size: 30rpx;
				padding-bottom: 20rpx;
			}
			.sticky-row {
				display: flex;
				padding:10rpx 0rpx;
				align-items: center;
				.sticky-icon{
					padding-left:5rpx;
					width: 50rpx;
					height: 50rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.post-title {
					padding-left: 20rpx;
					flex:1;
					//文本超过两行后显示省略号
					overflow:hidden; 
					text-overflow:ellipsis;
					display:-webkit-box; 
					-webkit-box-orient:vertical;	
					-webkit-line-clamp:1;
				}
			}

		}
	}
</style>
