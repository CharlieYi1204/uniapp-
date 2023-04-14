<template>
	<view class="bbs">
		<!-- 发帖按钮 -->
		
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
        ></u-swiper>
		</view>	
		<!-- 公告通知小喇叭 -->
		 <view>
		    <u-notice-bar :text="text1" mode="link" speed="150" url="/pages/componentsB/tag/tag" custom-style="margin-bottom:20rpx;border-radius: 20rpx;"></u-notice-bar>
		  </view>
		<!-- 板块专区 -->
		<view class="bbs-blockbox">
			<view class="blocktitle">
				板块分类
			<text style="font-size: 25rpx;color:#888;margin-left: 330rpx;"> >>更多板块</text>
			<u-divider></u-divider>
			</view>
				<view class="content-box">
					<view class="content-view" v-for="(item,index) in city" :key="index">
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
								帖子数量：
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 最新发帖 -->
			<u-divider text="热门帖子"></u-divider>
			<pageCard></pageCard>
		</view>
		
</template>

<script>
	export default {
		data() {
			return {
					text1:"成都交通卡/码联盟+1,攀枝花市米易县也可以刷卡啦",
				   list3: [{
					   image:'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					   title: '昨夜星辰昨夜风，画楼西畔桂堂东',
				   },
				   {
						image:'https://cdn.uviewui.com/uview/swiper/swiper2.png',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东',
				   },
				   {
					   image:'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					   title: '昨夜星辰昨夜风，画楼西畔桂堂东',
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
				keyword:''  
			}
		}
	}
</script>

<style lang="scss">
.bbs {
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
