<template>
	<view>
		<view class="topinfo">
			<!-- 标题栏 -->
				<view class="title">
					<view v-if="isProvince && isSupprtArea ">成都都市圈·天府通<p>一卡通刷、一码通乘、优惠共享</p></view>
					<view v-if="!isProvince && isSupprtArea">天府通卡/码<p>{{cityName}}·支持概况</p></view>
					<view v-if="!isSupprtArea">天府通卡/码<p>暂不支持·<text style='color:#12B5A1'>{{cityName}}</text></p></view>
				</view>
				<!-- 分割线 -->
				<view style="width: 100%; border-bottom:3px dashed #12B5A1;margin-top: 30rpx;"></view>
				<view v-if="!isSupprtArea" style="font-size: 30rpx;color:#888 ;padding:20rpx 0rpx;text-align: center;">
					该区域待扩展，感谢您的等待和支持[]
				</view>
				<!-- 内容	 -->
				<view class="content" v-if="isSupprtArea">
						<text style="display: inline-block;padding-bottom: 10rpx;">现已支持：</text>
						<view class="tagbox">
							<view class="tag_view" v-for="(item,index) in cityData" :key="index">
								<uni-tag :text="item.name"  style="white-space: nowrap;" custom-style="background-color:#e77f67;border:0">
								</uni-tag>
							</view>
						</view>
						<!-- 分割线 -->
						<view style="width: 100%; border-bottom:3px dashed #12B5A1;margin-top: 10rpx;"></view>
						<!-- 余额查询按钮 -->
						<view class="bottm-content">
							<u-button  type="default" text="卡片余额查询" color="#12B5A1" @click="goToCardBalance" shape="circle"></u-button>
							<u-button type="default" v-if="cityName === '成都市'" text="公交次数查询" color="#12B5A1" @click="goToCardTimesbalance" shape="circle" customStyle="margin-top:20rpx"></u-button>
							<view class="tipstext">请点击地图区域，以获取更详细信息</view>
						</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"cardCityText",
		props:{
			isProvince: {
				type:Boolean,
				default: true
			},
			cityName: {
				type:String,
				default:'<请输入城市>'
			},
			isSupprtArea: {
				type:Boolean,
				default:true
			},
			cityData: {
				type:Array,
				default() {
					return [{
						name:"城市1"
					},{
						name:"城市2"
					}]
				}
			}
		},
		data() {
			return {
			};
		},
		methods: {
			//跳转到天府通余额查询在线页面，由于naviagateTo只能跳转本地网页，所以在地址后面带参数，传递过去用WebView进行显示，便于返回到主页，传递过去onLoad接受
			goToCardBalance() {
				uni.navigateTo({
					url:"/pages/index/cardBalanceQuery/cardBalanceQuery?url=http://tftzhgl.cdtft.cn/tft/jsp/wx/search.jsp"
				})
			},
			goToCardTimesbalance() {
				uni.navigateTo({
					url:"/pages/index/cardTimesbalance/cardTimesbalance?url=https://cdtftwxxcx.cdtft.cn/buscardH5/#/homePage"
				})
				
			}
		},
	}
</script>

<style lang="scss">
.topinfo{
	border: 1rpx solid #12B5A1;
	border-radius: 20rpx;
	padding:40rpx 40rpx 20rpx 40rpx;
	.title{
		font-size: 40rpx;
		text-align: center;
	}
	.content {
		padding: 20rpx 10rpx 0rpx 10rpx;
		.tagbox {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			width: 100%;
			.tag_view {
				padding-left: 10rpx;
				padding-bottom: 20rpx;
			}
		}
	}
	
	.bottm-content{
		padding-top:20rpx;
		.tipstext {
			padding-top:20rpx;
			font-size: 30rpx;
			color:#888;
			text-align: center;
		}
	}
	}
</style>