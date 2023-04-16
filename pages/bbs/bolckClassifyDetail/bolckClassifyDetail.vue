<template>
	<view class="blockdetail">
		<blockClassify classifyTitle="城市板块"></blockClassify>
		<blockClassify classifyTitle="支付方式板块" :blockName="blockMethos"></blockClassify>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				blockMethos: [{
						name:"实体卡"
					},
					{
						name:"NFC"
					},
					{
						name:"天府通APP"
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
