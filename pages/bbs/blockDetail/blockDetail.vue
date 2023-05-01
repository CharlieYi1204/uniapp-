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
						 </view>
						 	<view class="block-notice" v-if="blockData.description">
						 		板块信息公告:<view style="text-indent: 40rpx;">{{blockData.description}}</view>
						 	</view>
							<view class="block-notice" v-if="!blockData.description">
								暂无公告信息内容
							</view>
					</view>
					
				</view>
				<!-- <view class="title-right">
					<view class="focus-button">
						<u-button type="primary" size="mini" text="关注" icon="plus" plain shape="circle" color="#12B5A1" @click="isFoucs" v-if="!isfouced"></u-button>
						<u-button type="primary" size="mini" text="已关注" icon="checkmark" plain shape="circle" color="#888" @click="isFoucs" v-if="isfouced"></u-button>
					</view>
				</view> -->
			</view>
			<!-- 精选置顶帖 -->
			<view class="sticky-box" v-if="isTopPost.length !== 0">
				<view class="sticky-title">精选内容</view>
				<view class="sticky-row" v-for="(item,index) in isTopPost" :key="index" @click="toPageDetail(item.id)">
					<view class="sticky-icon">
						<image src="/static/icon/sticky.png"></image>
					</view>
					<view class="post-title">{{item.title}}</view>
				</view>
			</view>
			<!-- 最新帖子卡片 -->
			<u-divider text="最新帖子" v-if="notTopPost.length !== 0"></u-divider>

			<!-- 显示出发帖信息 -->
			<view v-for="(item,index) in notTopPost" :key ="index">
			<pageCard :propData="item"></pageCard>	
			</view>
			<u-empty
			        mode="list"
					text="暂无最新帖子,快来发帖~"
					v-if="notTopPost.length === 0"
			>
			</u-empty>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				blockID:null,
				blockData:{},
				postNum:null,
				modalShow:false,
				isActive:false,
				modalTitle:"提示",
				modalContent:"要去发送新帖子吗？",
				name:'城市名称',
				isfouced:false,
				isTopPost:[],
				notTopPost:[],
				
			};
		},
		methods: {
			
			//获取当前板块的发帖量
			getPostNum() {
				uni.$u.http.get("/bbs/getTargetBlockPostNum",{params: {block_id:`${this.blockID}`}}).then(res => {
					this.postNum = res.data[0].post_num
					})
			},
			//获取帖子数据
			getPostData() {
				uni.$u.http.get("/bbs/getPostByBlock",{params: {block_id:`${this.blockID}`}}).then(res => {
					let data = res.data
					//筛选出置顶的帖子
					let isTopPost = data.filter(item => {
						return item.is_top === 1
					})
					this.isTopPost = isTopPost
					//筛选出不是置顶的帖子
					let notTopPost = data.filter(item => {
						return item.is_top === 0
					})
					console.log(notTopPost)
					this.notTopPost = notTopPost
				})
			},
			//获取板块详细信息
			getBlockData() {
				uni.$u.http.get("/bbs/getBlockInfoByID",{params:{block_id:`${this.blockID}`}}).then(res =>{
					this.blockData = res.data[0]
					console.log(this.blockData)
				})
			},
			isFoucs(){
					this.isfouced = !this.isfouced
				},
			toPageDetail(id) {
				uni.navigateTo({
					url:`/pages/bbs/pageDetail/pageDetail?postID=${id}`
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
			this.blockID = data.blockID
		},
		mounted() {
			this.getPostData()
			this.getBlockData()
			this.getPostNum()
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
