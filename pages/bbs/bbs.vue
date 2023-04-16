<template>
	<view class="bbs">
		<!-- 发帖按钮 -->
		<view class="sendpost" @click="showModal" :class="isActive ? 'sendpostActive' : 'sendpost'">
			<image src="../../static/icon/addition.png"></image>
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

		<!-- 搜索栏 -->
		<view class="search-box">
			<u-search placeholder="键入你想查找的内容" v-model="keyword"></u-search>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-box">
			  <u-swiper
                :list="list3"
                previousMargin="30"
                nextMargin="30"
                circular
				keyName="image"
                :autoplay="true"
				showTitle
                radius="5"
				bgColor="#DFE6E9"
				height="180"
				@click="toPageDetail"
        ></u-swiper>
		</view>	
		<!-- 公告通知小喇叭 -->
		 <view>
		    <u-notice-bar :text="text1" mode="link" speed="150" url="/pages/componentsB/tag/tag" custom-style="margin-bottom:20rpx;border-radius: 20rpx;"></u-notice-bar>
		  </view>
		<!-- 板块专区 -->
		<blockClassify classifyTitle="热门板块" :moreBlock="true" :blockName="city"></blockClassify>
		
			<!-- 热门帖子 -->
			<u-divider text="热门帖子"></u-divider>
			<pageCard :propUserHeadImgSrc="UserHeadImgSrc"></pageCard>
			<pageCard :propUserHeadImgSrc="UserHeadImgSrc"></pageCard>
		</view>
		
</template>

<script>
	export default {
		data() {
			return {
					text1:"成都交通卡/码联盟+1,攀枝花市米易县也可以刷卡啦",
					modalShow:false,
					isActive:false,
					modalTitle:"提示",
					modalContent:"要去发送新帖子吗？",
				   list3: [{
					   image:`${this.$imgBaseUrl}/images/tft2.jpg`,
					   title: '天府通，伴你出行哈哈哈哈哈哈哈',
				   },
				   {
						image:`${this.$imgBaseUrl}/images/tft3.jpg`,
						title: '小天出行',
				   },
				   {
					   image:`${this.$imgBaseUrl}/images/tft4.jpg`,
					   title: '智慧出行',
				   }
                ],
				city: [{
					name:"成都市"
				},
				{
					name:"德阳市"
				},
				{
					name:"眉山市"
				},
				{
					name:"资阳市"
				}],
				keyword:'' ,
				UserHeadImgSrc:`${this.$imgBaseUrl}images/user_bg.jpg`
			}
		},
		methods: {
			//点击轮播图跳转至帖子详情页
			toPageDetail(index){
				uni.navigateTo({
					url:`/pages/bbs/pageDetail/pageDetail?pageID=${index}`
				})
			},
			//跳转到板块详情页
			toBlockClassifyDetail() {
				uni.navigateTo({
					url:"/pages/bbs/bolckClassifyDetail/bolckClassifyDetail"
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
	}
</script>

<style lang="scss">
.bbs {
	.sendpost {
		width:120rpx;
		height:120rpx;
		background-color: #fff;
		border-radius: 50%;
		position: fixed;
		z-index: 9999;
		right:20rpx;
		bottom: 20rpx;
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
	.search-box {
		padding-bottom: 20rpx;
	}
	.swiper-box {
		padding-bottom: 20rpx;
	}
	.notice-box{
		padding-bottom: 20rpx;
		
	}
	.bbs-blockbox{
		background-color: #fff;
		padding:15rpx 15rpx;
		border-radius: 20rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
			justify-content: space-around;
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
}
</style>
