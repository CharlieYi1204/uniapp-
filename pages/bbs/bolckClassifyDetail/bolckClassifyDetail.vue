<template>
	<view class="blockdetail">
		<blockClassify classifyTitle="城市板块" ></blockClassify>
		<blockClassify classifyTitle="支付方式板块" :blockName="blockMethos"></blockClassify>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				blockMethos: [{
						name:"实体卡",
						num:12
					},
					{
						name:"NFC",
						num:16
					},
					{
						name:"天府通APP",
						num:11
					},
				]
			};
		}
	}
</script>

<style lang="scss">
.blockdetail {
	padding:20rpx 15rpx;
	.title {
		
	}
}
</style>
