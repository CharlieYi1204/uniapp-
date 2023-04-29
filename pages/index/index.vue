<template>
	<view class="cardinfo">
		<!-- 地图组件 -->
		<!-- 由于supportCity属性的值是从后台异步获取的，v-if用于判断获取值后再进行组件的渲染，这样就可以保证传值过去 -->
		<cardInfoMapLimit @getMapComponentsData="getMapComponentsData"  v-if="supportCity" :propSupportCity="supportCity" :propSupportDistrict="supportDistrict"></cardInfoMapLimit>
		<!-- 支持地区组件 -->
		<cardCityText v-if="!isDistrict" :cityName="cityName" :isProvince="isProvince" :cityData="supportDistrictName" :isSupprtArea="isSupportArea"></cardCityText>
		<!-- 优惠政策组件 -->
		<cardCityDiscount v-if="isDistrict" :title="cityName" :isSupprtArea="isSupportArea" :code="districtCode"></cardCityDiscount>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				cityName:null,
				//判断是否处于省级
				isProvince:true,
				//判断是否点击区县地区
				isDistrict:false,
				//判断该地区是否支持
				isSupportArea:true,
				//支持地区数据
				supportCity:null,
				supportDistrict:null,
				supportDistrictName:null,
				mapdata:null,
				districtCode:null
			}
		},
		methods: {
			//从地图组件获取当前点击的城市名称
			getMapComponentsData(city,isProvince,isDistrict,cardSupport,supportDistrict,clickDisCode) {
				this.cityName = city
				this.isProvince = isProvince
				this.isDistrict = isDistrict
				this.isSupportArea = cardSupport
				this.supportDistrictName = supportDistrict
				this.districtCode = clickDisCode
			},
			//获取支持城市数据
			getSupport() {
				uni.$u.http.get('/map/getSupportInfo').then(res => {
					const data = res.data.data
					//支持的地级市名称和code
					let supportCity = data.map(item => {
						return {
							code:item.citycode,
							name:item.cityname
						}
					})
					//支持的区（县）名称和code
					let supportDistrict = data.map(item => {
						return {
							city:item.cityname,
							name:item.districtname,
							code:item.districtcode
						}
					})
					this.supportDistrict = supportDistrict
					//去除相同的地级市
					supportCity = supportCity.filter((item,index)=> {
						return index === supportCity.findIndex(obj => {
							return JSON.stringify(obj) === JSON.stringify(item)
						})
					})
					this.supportCity = supportCity
					this.supportDistrictName = supportCity
				})
			}
			// //从高德地图行政区查询API获取数据
			// getMapData() {
			// 	uni.$u.http.get("https://restapi.amap.com/v3/config/district?parameters",{ params: {
			// 	key:"a2f1991e4040f24f532133df275069ec",keywords:"四川",subdistrict:2
			// 	}}).then(res => {
			// 		const data = res.data.districts[0].districts
			// 		this.mapdata = data.map(item => {
			// 			let citycode = item.citycode
			// 			let cityname = item.name
			// 			let mapdata = item.districts.map(dist => {
			// 				let districtname = dist.name
			// 				let districtcode = dist.citycode
			// 				return {
			// 					citycode:Number(citycode),
			// 					cityname:cityname,
			// 					districtname:districtname,
			// 					districtcode:Number(districtcode)
			// 				}
			// 			})
			// 			return mapdata
			// 		}).flat()
			// 		//根据adcode进行排序
			// 		this.mapdata.sort((a,b) => a.citycode - b.citycode)
			// 		console.log(this.mapdata)
			// 	})
			// },
			// sendDataB() {
			// 	this.mapdata.map(async item => {
			// 		await new Promise(resolve => 
			// 			setTimeout(resolve,5000))
			// 				await uni.$u.http.post("/map/addMapData",{
			// 					citycode:item.citycode,
			// 					cityname:item.cityname,
			// 					districtname:item.districtname,
			// 					districrtcode:item.districtcode,
			// 					},{dataType:'json'}).then(res => {
			// 					resolve(res)
			// 				}).catch(err => {
			// 					console.log(err)
			// 				})
			// 	})
			// }s
		},
		mounted() {
			//获取卡/码支持数据
			this.getSupport()
		},
		// onLoad() { 
		// 	// this.getMapData()
		// }
		onLoad(){
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
	
	.cardinfo{
		padding:20rpx 30rpx
	}

</style>
