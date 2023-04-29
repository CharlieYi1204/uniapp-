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
		    <u-notice-bar :text="text1" mode="link" speed="150" url="/pages/message/notice/noticedetail/noticedetail" custom-style="margin-bottom:20rpx;border-radius: 20rpx;"></u-notice-bar>
		  </view>
		<!-- 板块专区 -->
		<blockClassify classifyTitle="热门板块" :moreBlock="true" :propBlockName="blockData"></blockClassify>
			<!-- 热门帖子 -->
			<u-divider text="热门帖子"></u-divider>
			<view v-for="(item,index) in pageData" :key="index">
				<pageCard :propData="item"></pageCard>
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
				    blockData:null,
			}
		},
		methods: {
			//获取热门板块
			getHotBlock(){
				uni.$u.http.get("/bbs/getHotBlock").then(res => {
					const data = res.data
					this.blockData = data.map(item => {
						return {
							id:item.id,
							name:item.name
						}
					})
					uni.$u.http.get("/bbs/getBlockPostNum").then(res => {
						let num = res.data
						// 遍历板块分类
						this.blockData.forEach(block => {
							// 在板块中有帖子的数据中查找
							let found = num.find(postnum => postnum.category_id === block.id)
							// 找到后,将对应的帖子数量赋值给板块对象中的属性
							if(found){
								block.num = found.post_num
							}else {
								block.num = 0
							}
						})
						this.$forceUpdate();
					console.log(this.blockData)
				 })
				})
			},

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
			const isLogin = uni.getStorageSync("isLogin")
			// consol.log(isLogin)
			 if (!isLogin) {
			      uni.reLaunch({
			        url: '/pages/user/login/login'
			      })
			    }
		},
		onLoad() {
			this.getSwiperData()
			this.getPageData()
			this.getHotBlock()
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
}
</style>
