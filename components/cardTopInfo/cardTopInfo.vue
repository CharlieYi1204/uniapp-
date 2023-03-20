<template>
	<view class="topinfo">
		<view class="title_bg_img">
<!-- 			<image :src="imgUrl"></image> -->
			<view>成都交通卡/码互惠互通查询</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"cardTopInfo",
		data() {
			return {
				
			};
		},
		methods: {
			getUrl() {
				console.log(this.$imgBaseUrl)
			}
		},
	}
</script>

<style lang="scss">
.topinfo{
	padding:20rpx 20rpx;
	.title_bg_img{
		width: 100%;
		height: 400rpx;
		border: 1rpx solid chocolate;
		border-radius: 20rpx;
		font-size: 50rpx;
		color:#12B5A1;
		text-align: center;
		line-height: 400rpx;
		
	}
}
</style>