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
			<u-search placeholder="点击进行搜索" :showAction="false" @click="toSearch" disabled height="70rpx"></u-search>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-box">
			  <u-swiper
                :list="list3"
                previousMargin="30"
                nextMargin="30"
                circular
                :autoplay="true"
				keyName="image"
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
			<view v-for="(item,index) in pageData" :key="index">
				<pageCard :propUserHeadImgSrc="UserHeadImgSrc" :propData="item"></pageCard>
			</view>
		</view>
		
</template>

<script>
	export default {
		data() {
			return {
					text1:"成都交通卡/码联盟+1,攀枝花市米易县也可以刷卡啦",
					pageData: [],
					modalShow:false,
					isActive:false,
					modalTitle:"提示",
					modalContent:"要去发送新帖子吗？",
				   list3: [],
				city: [{
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
				}],
				UserHeadImgSrc:`${this.$imgBaseUrl}images/user_bg.jpg`
			}
		},
		methods: {
			//获取轮播图数据 
			getSwiperData() {
				uni.$u.http.get("bbs/getWonderfulPost").then(res => {
					let data = res.data.data
					let swpierData = data.map(item =>{
						return {
							id:item.id,
							image:item.image[0],
							title:item.title,
						}
					})
					this.list3 = swpierData
				})
			},
			//点击跳转至搜索页面
			toSearch() {
				uni.navigateTo({
					url:"/pages/bbs/search/search"
				})
			},
			//点击轮播图跳转至帖子详情页
			toPageDetail(index){
				let postID = this.list3[index].id
				uni.navigateTo({
					url:`/pages/bbs/pageDetail/pageDetail?postID=${postID}`
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
			},
			//请求数据
			getPageData() {
				uni.$u.http.get('/bbs').then(res => {
					let data = res.data.data 
					this.pageData = data
				})
			},
		},
		onShow(){
			this.getPageData()
		},
		onLoad() {
			this.getSwiperData()
			this.getPageData()
			uni.showLoading({
					title: '加载中'
				});
		},
		onReady() {
			uni.hideLoading();
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
