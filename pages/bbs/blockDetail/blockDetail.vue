<template>
	<view class="blockdetail-box">
		<!-- 发帖按钮 -->
		<view class="sendpost" @click="showModal" :class="isActive ? 'sendpostActive' : 'sendpost'">
			<image src="../../../static/icon/addition.png"></image>
		</view>
		<!-- 点击按钮后，弹出模态框确认是否进行发帖操作 -->
		<view>
				<u-modal :show="modalShow" 
				:title="modalTitle" 
				:content='modalContent' 
				cancelText='取消' 
				showCancelButton
				buttonReverse
				@cancel="hiddenModal"
				@confirm="toSendPost"
				></u-modal>
		</view>
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
						 		板块信息公告:<view style="text-indent: 40rpx;">成都市12+2主城区和绝大多数郊县已全面支持成都交通卡/码，请尽情使用。交流用户需严格遵守社区管理规则，禁止发布非法、色情信息，否则管理员将对其进行封禁处理</view>
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
			<pageCard title="【卡面上新】华为钱包×腾讯手游13张卡面正式来袭！" content="喜欢玩游戏的华为钱包天府通用户们有福气啦！本周华为钱包来给各位天府通小伙伴送夏日卡面福利啦！《英雄联盟》手游、《穿越火线》手游、《使命召唤》手游、《QQ飞车》手游，4款炙手可热的手游卡面上线啦！13款精美绝伦的卡面限时免费送啦！前往华为钱包现在领取，部分卡片永久有效哦！"></pageCard>
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
				modalShow:false,
				isActive:false,
				modalTitle:"提示",
				modalContent:"要去发送新帖子吗？",
				name:'城市名称',
				isfouced:false,
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
			},
			//隐藏模态框
				showModal() {
					this.modalShow = true
					this.isActive = true
				},
				//显示模态框
				hiddenModal() {
					this.modalShow = false
					this.isActive = false
				},
				//模态框确认后跳转
				toSendPost() {
					uni.navigateTo({
						url:"/pages/bbs/sendPost/sendPost"
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
	 .sendpost {
	 	width:120rpx;
	 	height:120rpx;
	 	background-color: #fff;
	 	border-radius: 50%;
	 	position: fixed;
	 	z-index: 9999;
	 	right:20rpx;
	 	bottom: 100rpx;
	 	transform: rotate(0deg);
	 	transition: transform 0.5s ease;
	 	image {
	 		width:100%;
	 		height:100%;
	 	}
	 }
	 .sendpostActive {
	 	transform: rotate(45deg);
	 }
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
