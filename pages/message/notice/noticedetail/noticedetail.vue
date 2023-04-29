<template>
	<view class="detail-box">
		<!-- 标题 -->
		<view class="title">这里是公告标题</view>
		<!-- 时间 -->
		<view class="datetime">这里显示时间</view>
		<!-- 公告内容 -->
		<view class="content">
			近日，天府通公共交通出行又有新进展。11月，天府通顺利实现卡/码乘车服务在米易的上线，为持有天府通卡或使用天府通APP乘车码的两地市民提供便利。
			
			2013年，天府通与攀枝花以“市民卡”为纽带，实现两地公共交通互联互通。多年来，天府通持续巩固成攀互通成果。
			
			前期，在成都、米易两地政府和交通主管部门的领导和支持下，伴随米易全域城市公交升级换代，天府通卡/码乘车服务正式上线米易，成为继落地攀枝花市区后，第二个与成都公共交通互通的攀枝花城市，也意味着米易本地乘客可享受天府通便捷的支付方式和乘车优惠服务。
		<view class="image-box">
			<u-album :urls="imgUrl" previewFullImage multipleSize="95" singleSize="320"></u-album>
			</view>
		</view>
		<!-- 公告图片 -->
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:["http://localhost:3000/images/yaan2.jpg",
				"http://localhost:3000/images/yaan2.jpg",
				"http://localhost:3000/images/yaan2.jpg"]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.detail-box {
		padding:20rpx 40rpx;
		.title{
			font-weight: bold;
			font-size:40rpx;
			text-align: center;
		}
		.datetime {
			color:#888;
			text-align: center;
			padding: 20rpx 0rpx;
		}
		.content {
			padding:40rpx 40rpx;
			margin-top: 30rpx;
			border-radius: 20rpx;
			background-color: #fff;
			text-indent: 2em;
			text-align: justify;
			line-height: 50rpx;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			.image-box {
				padding-top: 20rpx;
				text-align: center;
			}
		}
	}

</style>
