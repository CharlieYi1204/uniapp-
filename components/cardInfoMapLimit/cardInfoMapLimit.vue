<template>
	<view class="map">
		<view class="charts-box">
			<u-button type="primary" text="<返回" @click="registerMap()" size="mini" v-if="isCity"></u-button>
			<l-echart ref="chart" ></l-echart>
		</view>
	</view>
</template>

<script>
	import * as echarts from 'echarts'
	import {CanvasRenderer} from 'echarts/renderers';
	import mapData from '@/static/geo/sichuan.json'
	import {LabelLayout,UniversalTransition} from 'echarts/features';
	export default {
		data() {
			return {
				cityData:{
					
				},
				isCity:false
			}
		},
		mounted() {
			//初始化echart实例
			this.registerMap()
			this.getcityData("成都市")
		},
		methods: {
			//请求地图的JSONGeo数据
			registerMap() {
				this.isCity = false
				this.$refs.chart.init(echarts,async chart => {
					//加载动画
					chart.showLoading()
					//获取地图数据
					const data = await this.getData("四川省")
					console.log(data)
					//隐藏加载动画
					chart.hideLoading()
					//使用获取到的GeoJSON数据进行地图名称注册
					echarts.registerMap('四川省', data);
					//遍历json数据，放到option里面方便数据
					const provinceSeriesData = data.features.map(item => {
						return {
							name:item.properties.name,
							value:item.properties.adcode
						}
					})
					
					chart.on('click',(params) => {
						if(params.componentType === 'series' && params.seriesType === 'map') {
							// 获取点击区域的名称和值
							          const name = params.name;
							          const value = params.value;
							          //判断是否需要下钻
									  //点击城市后，异步获取该城市下的区县数据
									   setTimeout(async()=> {
										   if(!this.isCity){
											   chart.showLoading()
											   this.cityData = await this.getcityData(name)
											   chart.hideLoading()
											   this.isCity = true
										   }
										   const citySeriesData = this.cityData.features.map(item => {
											   return {
												   name:item.properties.name,
												   value:item.properties.adcode
											   }
										   })
										   echarts.registerMap(name,this.cityData)
										    chart.setOption({
										    				 title: {
										    						text: name,
										    						subtext: '支持详情'
										    					},
										    	              series: [
										    	                {
										    	                  type: 'map',
										    	                  map: name,
																  data:citySeriesData
										    	                },
										    	              ],
										    	            });
									   },100)
									   
									   
									  // this.$refs.chart.init(echarts,async chart => {
										 //  const cityData =  await this.getcityData(name)
										 //  console.log(cityData)
										 //  console.log(name)
										 //  echarts.registerMap(name,cityData)
										 //  chart.setOption({
										 //  				 title: {
										 //  						text: name,
										 //  						subtext: '支持详情'
										 //  					},
										 //  	              series: [
										 //  	                {
										 //  	                  type: 'map',
										 //  	                  map: name,
										 //  	                },
										 //  	              ],
										 //  	            });
										 //  })
										
										 //当前是四川省地图，则下钻到该地区的市级地图
										// const geoJsons = require.context()
							          console.log('您点击了' + name + '，值为' + value);
						}
					})
					//对echarts的样式、标题等进行设置
					const option = {
						title: {
							text: '成都市都市圈',
							subtext: '交通卡/码支持概况'
						},
						series: [
							{
							name: '成都公交卡支持情况',
							type: 'map',
							map: '四川省',
							data: provinceSeriesData,
							label:{
								show: true,	//显示地名
								fontSize:8,
								},
							itemStyle: {
									  areaColor:'#73c0de'
								},
							}
						],
					}
					
					chart.setOption(option);
				})
			},
			getData(name) {
				return new Promise(resolve => {
						uni.$u.http.get('/geo',{params:{filename: `${name}.json`}}).then(res => {
							resolve(res.data)
						}).catch(err => {
							console.log(err)
						})
				});
			},
			getcityData(name) {
				return new Promise(resolve => {
					uni.$u.http.get('/geo',{params:{filename: `${name}.json`}}).then(res => {
						resolve(res.data)
					}).catch(err => {
						console.log(err)
					})
				})
						
			}
		}
	}
</script>

<style lang="scss" scoped>
.map{
	padding:20rpx 20rpx;
	.charts-box {
	    width: 100%;
	    height: 800rpx;
	  }
}
</style>