<template>
	<view class="map">
	 <view class="charts-box">
	    <qiun-data-charts 
	          type="map"
	          :opts="opts"
	          :chartData="chartData"
			  :loadingType = "2"
	        />
	  </view>
	</view>
</template>

<script>
	import mapdata from '@/static/test.json'
	export default {
		name:"cardInfoMap",
		 data() {
			 return {
				  chartData: {
					  series: [
					  ]
				  },
				  cityData: [{
					 code:"510100",
					 name:"成都市",
					 supportCard:true  
				  },{
					 code:"511400",
					 name:"眉山市",
					 supportCard:true  
				  },
				  {
				  	 code:"512000",
				  	 name:"资阳市",
				  	 supportCard:false  
				  }
				  ],
				  
				       //您可以通过修改 config-ucharts.js 文件中下标为 ['map'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				       opts: {
				         padding: [1,0,0,0],
				         enableScroll: true,
				         extra: {
				           map: {
				             border: true,
				             borderWidth: 1,
				             borderColor: "#666666",
				             fillOpacity: 0.6,
				             activeBorderColor: "#F04864",
				             activeFillColor: "#FACC14",
				             activeFillOpacity: 1
				           },
				         }
				       }
				     };
				   },
				   onReady() {
				     this.getServerData();
				   },
				   methods: {
					   //将地图数据和城市信息数据传递给组件进行渲染
					   renderMap(mapData,cityData){
						   const mapSeries = this.chartData.series[0]
						   mapSeries = cityData.map(city => {
							   const feature = mapData.feature.find(f => f.properties.adcode === city.code)
							   return {
								   
							   }
						   })
						   
					   },
				     getServerData() {
				       //模拟从服务器获取数据时的延时
				       // setTimeout(() => {
				       //   //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
				       //   let res = {series:{
				       //       说明: "地图数据遵循geoJson地图数据交换格式，引用方式请见插件市场示例项目：https://ext.dcloud.net.cn/plugin?id=271",
				       //       备注: "其他地图数据下载地址：http://datav.aliyun.com/tools/atlas/",
				       //       注意: "如果您引用数据的坐标系是WGS84地球坐标系，会导致图形变形，需要在【扩展配置】中开启【是否进行WGS84转墨卡托投影】功能（开启后因大量的数据运算tooltip可能会不跟手，建议自行转换为墨卡托坐标系，可参照源码内function lonlat2mercator()）"
				       //       }};
				       //   this.chartData = JSON.parse(JSON.stringify(res));
				       // }, 500);
					   
					   this.chartData.series = mapdata.features
				     },
			}	
		}
</script>

<style lang="scss" scoped>
.map{
	padding:20rpx 20rpx;
	.charts-box {
	    width: 100%;
	    height: 500px;
	  }
}
</style>