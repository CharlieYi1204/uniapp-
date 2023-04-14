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
									<uni-tag :text="item.name" v-if="item.isSupport" style="white-space: nowrap;" :custom-style="`background-color:${item.color};border:0`">
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
							<view class="tag" v-for="(item,index) in cardMethods" :key="index" v-if="item.isSupport">
								<uni-tag :text="item.name"  style="white-space: nowrap;" :custom-style="`background-color:${item.color};border:0`">
								</uni-tag>
								<view class="discount-txt" v-if="item.isSupport">{{item.discount}}</view>
								<u-divider v-if="!(index === 2)" text="分割线" :dot="true" lineColor="#e77f67"></u-divider>
							</view>
						</view>
					</view>
					<!-- 分割线 -->
					<view v-if="isSupprtArea" style="width: 100%; border-bottom:3px dashed #12B5A1;margin-top: 10rpx;"></view>
					<view v-if="isSupprtArea" class="unit-box">
						<view style="padding-bottom: 10rpx;font-size: 35rpx">
							支持路线:
						</view>
						<view style="padding:10rpx 20rpx;border-radius: 10rpx;background-color: #22a6b3;color: #fff;">
							{{discountData.unit}}
						</view>
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
			code: {
				type:Number,
				default:0
			},
			propCardMethods: {
				type:Array,
				default() {
					return [{
						name:"实体卡",
						color:"#575fcf",
						isSupport:false,
					},{
						name:"NFC卡",
						color:"#ef5777",
						isSupport:false
					},{
						name:"天府通APP二维码",
						color:"#0fbc59",
						isSupport:false
					}]
				}
			}
		},
		data() {
			return {
				cityData:[],
				discountData:[],
				cardMethods:this.propCardMethods
				};
		},
		methods: {
			//根据区县adcode获取该区域的支持方式、优惠政策、支持线路
			getCardDiscount(code) {
				this.discountData = []
				this.cardMethods.forEach(item => {
					item.isSupport = false
				})
				uni.$u.http.post("/map/getdiscount", { districtcode:code },{dataType: 'json'}).then(res => {
					let discountData = res.data.data[0]
					//由于code的唯一性，查出来数据只会有一条
					this.discountData = discountData
					//获取数据后来判断是否支持，若支持则将对应的优惠信息也放进去
					if(discountData.method_card){
						this.cardMethods[0].isSupport = true
						this.cardMethods[0].discount = discountData.card_discount
					}
					if(discountData.method_nfc) {
						this.cardMethods[1].isSupport = true
						this.cardMethods[1].discount = discountData.nfc_discount
					}
					if(discountData.method_qr){
						this.cardMethods[2].isSupport = true
						this.cardMethods[2].discount = discountData.qr_discount
					}
				})
			}
		},
		//监听code变化，变化后再次获取discount的数据
		watch: {
			code(newVal){
				this.getCardDiscount(newVal)
			}
		},
		mounted() {
			this.getCardDiscount(this.code)
		}
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
	.discount-box,.unit-box{
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