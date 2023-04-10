<template>
	<view>
		<view class="topinfo">
			<!-- 标题栏 -->
				<view class="title">
					<view v-if="isSupprtArea">{{title}}·支持方式及优惠</view>
					<view v-if="!isSupprtArea">天府通卡/码<p>暂不支持·<text style='color:#12B5A1'>{{title}}</text></p></view>
						<!-- 分割线 -->
					<view style="width: 100%; border-bottom:3px dashed #12B5A1;margin-top: 30rpx;"></view>
					<view v-if="!isSupprtArea" style="font-size: 30rpx;color:#888 ;padding:20rpx 0rpx">
						该区域待扩展，感谢您的等待和支持
					</view>
				</view>
				<!--内容栏-->
				<view class="content" v-if="isSupprtArea">
					<!-- 支付方式内容 -->
					<view>
						<view style="padding-bottom: 10rpx;font-size: 35rpx">支持支付方式:</view>
							<view class="tagbox">
								<view class="tag_view" v-for="(item,index) in cardMethods" :key="index">
									<uni-tag :text="item.name"  style="white-space: nowrap;" :custom-style="`background-color:${item.color};border:0`">
									</uni-tag>
								</view>
							</view>
						</view>
					</view>
				<!-- 分割线 -->
				<view v-if="isSupprtArea" style="width: 100%; border-bottom:3px dashed #12B5A1;margin-top: 10rpx;"></view>
				<!-- 优惠政策内容 -->
				<view v-if="isSupprtArea" class="discount-box" >
					<view style="padding-bottom: 20rpx;font-size: 35rpx">各方式优惠政策：</view>
						<view class="discount-tag">
							<view class="tag" v-for="(item,index) in cardMethods" :key="index">
								<uni-tag :text="item.name"  style="white-space: nowrap;" :custom-style="`background-color:${item.color};border:0`">
								</uni-tag>
								<view class="discount-txt" v-if="item.name === '实体卡'">成都公交地铁9折，次数卡5折，两小时内可在5+1地区公交线路进行免费换乘3次，地铁有长距离优惠</view>
								<view class="discount-txt" v-if="item.name !=='实体卡'">成都公交地铁9折，地铁有长距离优惠，不支持次数卡换乘</view>
								<u-divider v-if="!(index === 2)" text="分割线" :dot="true" lineColor="#e77f67"></u-divider>
							</view>
						</view>
					</view>
					<!-- 分割线 -->
					<view v-if="isSupprtArea" style="width: 100%; border-bottom:3px dashed #12B5A1;margin-top: 10rpx;"></view>
					<view v-if="isSupprtArea" class="discount-box">
						<view style="padding-bottom: 20rpx;font-size: 35rpx">
					</view>支持路线：
					
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"cardCityText",
		props:{
			isSupprtArea: {
				type:Boolean,
				default:true
			},
			title: {
				type:String,
				default:'<区县名称>'
			},
			cardMethods: {
				type:Array,
				default() {
					return [{
						name:"实体卡",
						color:"#575fcf"
					},{
						name:"NFC卡",
						color:"#ef5777"
					},{
						name:"天府通APP二维码",
						color:"#0fbc59"
					}]
				}
			}
		},
		data() {
			return {
				cityData:[{
					name:"阿坝藏族羌族自治州",
					},{
					name:"成都市"
					},
					{
					name:"德阳市"
					},
					{
					name:"眉山市"
					},
					{
					name:"雅安市"
					},
					{
					name:"攀枝花市"
					},
					{
					name:"攀枝花市"
					},
					{
					name:"雅安市"
					},
				]
			};
		},
		methods: {
			//跳转到天府通余额查询在线页面，由于naviagateTo只能跳转本地网页，所以在地址后面带参数，传递过去用WebView进行显示，便于返回到主页，传递过去onLoad接受
			goToCardBalance() {
				console.log('111')
				uni.navigateTo({
					url:"/pages/CardBalanceQuery/CardBalanceQuery?url=http://tftzhgl.cdtft.cn/tft/jsp/wx/search.jsp"
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
			justify-content: space-around;
			flex-wrap: wrap;
			.tag_view {
				padding-top:10rpx;
				padding-bottom:20rpx;
			}
		}
	}
	.discount-box{
		padding: 20rpx 10rpx 0rpx 10rpx;
		.discount-tag {
			padding-bottom: 20rpx;
			.tag  {
				.discount-txt {
					padding-top: 20rpx;
					font-size: 30rpx;
					text-indent: 20rpx;
					line-height: 60rpx;
				}
			}
		}
	}
	.bottm-content{
		padding-top:20rpx;
		.tipstext {
			padding-top:20px;
			font-size: 30rpx;
			color:#888;
			text-align: center;
		}
	}
	}
</style>