<template>
	<view class="map">
		<view class="charts-box">
			<view class="button-box">
				<view class="back-button">
					<u-button text="返回" @click="registerMap();sendData()" size="mini" v-if="isCity"
						color="#12B5A1"></u-button>
				</view>
			</view>
			<l-echart ref="chart"></l-echart>
		</view>
	</view>
</template>

<script>
	import * as echarts from 'echarts'
	import {
		CanvasRenderer
	} from 'echarts/renderers';
	import {
		LabelLayout,
		UniversalTransition
	} from 'echarts/features';
	export default {
		props: {
			propProvinceSeriesData: {
				type: Object,
				default () {
					return {}
				}
			},
			propCitySeriesData: {
				type: Object,
				default () {
					return {}
				}
			},
			propIsCity: {
				type: Boolean,
				default: false
			},
			propIsDistrict: {
				type: Boolean,
				default: false
			},
			propSupportCity: {
				type: Array,
				default () {
					return [{
						name: "成都市",
						code: 510100,
					}]
				}
			},
			propSupportDistrict: {
				type: Array,
				default () {
					return [{
							city: "成都市",
							name: "新都区",
							code: 510114
						}, {
							city: "成都市",
							name: "青白江区",
							code: 510113
						},
						{
							city: "雅安市",
							name: "雨城区",
							code: 511802
						},
						{
							city: "雅安市",
							name: "名山区",
							code: 511803
						},
						{
							city: "成都市",
							name: "成华区",
							code: 510108
						}
					]
				}
			},
		},
		data() {
			return {
				//用于存储四川省内所有城市支持情况，包含了城市名称，code，supportCard，系列颜色
				provinceSeriesData: this.propProvinceSeriesData,
				//存储点击后的地级市得行政区
				citySeriesData: this.propCitySeriesData,
				//地图下钻后返回四川省的按钮判断，若下钻后即为true让他显示，若为四川省地图则为false不显示
				isCity: this.propIsCity,
				cityName: '',
				cardSupport: null,
				supportDistrictData: [{
					name: ''
				}],
				isDistrict: this.propIsDistrict,
				//支持城市列表，该数据从后台数据库获取
				supportCity: this.propSupportCity,
				supportDistrict: this.propSupportDistrict,
				//传递给父组件的值，当前点击区县的命名
				clickDisCode: null
			}
		},
		mounted() {
			//初始化echart实例
			this.registerMap()
		},
		methods: {
			//请求地图的JSONGeo数据
			registerMap() {
				//返回省级地图，使两个变量初始化
				this.cityName = "四川省"
				this.isDistrict = false
				this.isCity = false
				this.cardSupport = true
				this.supportDistrictData = this.propSupportCity
				this.$refs.chart.init(echarts, async chart => {
					//加载动画
					chart.showLoading()
					//获取地图数据，调用getMapData()方法
					const data = await this.getMapData("四川省")
					//隐藏加载动画
					chart.hideLoading()
					//使用获取到的GeoJSON数据进行地图名称注册
					echarts.registerMap('四川省', data);
					//遍历json数据，provinceSeriesData市放到option里面的数据，用于后续点击时返回城市的名称和它的城市code
					this.provinceSeriesData = data.features.map(item => {
						return {
							name: item.properties.name,
							value: item.properties.adcode,
							parent: item.properties.parent.adcode
						}
					})
					//用于加入支持城市颜色区分判断
					this.provinceSeriesData.forEach(item => {
						let cityCode = item.value
						//判断当前城市是否在支持城市列表中
						let result = this.supportCity.find(city => city.code === cityCode)
						//若为真，即支持，让它的背景以主题色显示，cardSupport属性用于后面点击后显示展示下面具体支持数据
						if (result !== undefined) {
							item.cardSupport = true
							item.itemStyle = {
								areaColor: "#12B5A1"
							}
						}
						//若不支持，则以#eee用作区分
						else {
							item.cardSupport = false
							item.itemStyle = {
								areaColor: "#eee"
							}
						}
					})
					//监听map点击事件，回调params中包含所点击区域的各类参数
					chart.on('click', (params) => {
						if (params.componentType === 'series' && params.seriesType === 'map') {
							// 获取点击区域的名称和值
							const name = params.name;
							const value = params.value;
							const parent = params.data.parent
							const cardSupport = params.data.cardSupport
							//传递给父组件的属性赋值
							this.cityName = name
							//用于传给父组件判断该地区是否支持成都交通卡/码
							this.cardSupport = cardSupport
							//判断是否需要下钻
							//点击城市后，异步获取该城市下的区县数据
							setTimeout(async () => {
								if (!this.isCity) {
									chart.showLoading()
									//获取所点地级市的GeoJSON数据
									this.cityData = await this.getMapData(name)
									//获取成功就隐藏加载动画
									chart.hideLoading()
									//并表示当前定位已为地级市
									this.isCity = true
								}
								//citySeriesData放在option便于点击具体区（县）级显示名称及code
								this.citySeriesData = this.cityData.features.map(item => {
									return {
										name: item.properties.name,
										value: item.properties.adcode,
										parent: item.properties.parent.adcode
									}
								})
								// 用于加入支持城市颜色区分判断
								this.citySeriesData.forEach(item => {
									let districtCode = item.value
									//判断该市内区（县）级行政区中是否在支持的区县列表当中
									let result = this.supportDistrict.find(item =>
										item.code === districtCode)
									//若能在支持列表中找到，让它的背景以主题色显示，cardSupport属性用于后面点击后显示展示下面具体支持数据
									if (result) {
										item.cardSupport = true
										item.itemStyle = {
											areaColor: "#12B5A1"
										}
									}
									//若不支持，则以#eee用作区分
									else {
										item.cardSupport = false
										item.itemStyle = {
											areaColor: "#eee"
										}
									}
								})
								//筛选出符合条件的区县，以方便传给父组件
								this.supportDistrictData = this.citySeriesData.filter(
									item => item.cardSupport === true).map(item => {
									return {
										name: item.name
									}
								})
								if (parent !== 510000) {
									this.isDistrict = true
								}
								//获取到市级数据，注册地图
								if (!this.isDistrict) {
									echarts.registerMap(name, this.cityData)
									const option = {
										title: {
											text: name,
											subtext: '支持详情'
										},
										series: [{
											type: 'map',
											map: name,
											data: this.citySeriesData,
											itemStyle: {
												normal: {
													areaColor: '#0466A3'
												},
												emphasis: {
													areaColor: '#0466A3'
												}
											},
										}],
									};
									chart.setOption(option);

								}
								if (this.isDistrict) {
									this.clickDisCode = value
								}
								this.sendData()
							}, 100)
							//如果当前为区县，则将code赋值，方便传递给父组件
							// console.log('您点击了' + name + '，值为' + value);
						}
					})
					//对echarts的样式、标题等进行设置
					const option = {
						title: {
							text: '成都市都市圈',
							subtext: '交通卡/码互惠互通概况'
						},
						series: [{
							name: '天府通在省内支持概况',
							type: 'map',
							map: '四川省',
							data: this.provinceSeriesData,
							label: {
								show: true, //显示地名
								fontSize: 8,
							},
							itemStyle: {
								normal: {
									areaColor: '#0466A3'
								},
								emphasis: {
									areaColor: '#0466A3'
								}
							}
						}],
					}
					chart.setOption(option);
				})

			},
			getMapData(name) {
				//创建一个Promise构造函数，异步获取数据，配合await和async使用
				return new Promise(resolve => {
					uni.$u.http.get('/geo', {
						params: {
							filename: `${name}.json`
						}
					}).then(res => {
						resolve(res.data)
					}).catch(err => {
						console.log(err)
					})
				});
			},
			getcityData(name) {
				return new Promise(resolve => {
					uni.$u.http.get('/geo', {
						params: {
							filename: `${name}.json`
						}
					}).then(res => {
						resolve(res.data)
					}).catch(err => {
						console.log(err)
					})
				})
			},
			//为index.vue父组件传值
			sendData() {
				this.$emit('getMapComponentsData', this.cityName, !this.isCity, this.isDistrict, this.cardSupport, this
					.supportDistrictData, this.clickDisCode)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.map {
		padding: 20rpx 20rpx;

		.charts-box {
			.button-box {
				width: 100%;
				text-align: right;
				padding-right: 50rpx;

				.back-button {
					display: inline-block;
				}
			}

			width: 100%;
			height: 720rpx;
		}
	}
</style>