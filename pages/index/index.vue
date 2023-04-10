<template>
	<view class="cardinfo">
		<!-- 地图组件 -->
		<cardInfoMapLimit @getMapComponentsData="getMapComponentsData"></cardInfoMapLimit>
		<!-- 支持地区组件 -->
		<cardCityText v-if="!isDistrict" :cityName="cityName" :isProvince="isProvince" :cityData="supportCityData" :isSupprtArea="isSupportArea"></cardCityText>
		<!-- 优惠政策组件 -->
		<cardCityDiscount v-if="isDistrict" :title="cityName" :isSupprtArea="isSupportArea"></cardCityDiscount>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				cityName:"",
				//判断是否处于省级
				isProvince:true,
				//判断是否点击区县地区
				isDistrict:false,
				//判断该地区是否支持
				isSupportArea:true,
				//支持地区数据
				supportCityData:[{
					name:"成都市",
					code:510100,
				},
				{
					name:"德阳市",
					code:510600,
				},{
					name:"雅安市",
					code:511800,
				},{
					name:"资阳市",
					code:512000,
				},{
					name:"眉山市",
					code:511400,
				}],
			}
		},
		methods: {
			//从地图组件获取当前点击的城市名称
			getMapComponentsData(city,isProvince,isDistrict,cardSupport,supportDistrict) {
				this.cityName = city
				this.isProvince = isProvince
				this.isDistrict = isDistrict
				this.isSupportArea = cardSupport
				this.supportCityData = supportDistrict
			}
		}
	}
</script>

<style lang="scss">
	
	.cardinfo{
		padding:20rpx 30rpx
	}

</style>
