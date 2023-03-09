<template>
	<view>
		111
		<u-button text="月落"></u-button>
		<text class="u-line-1">是日也，天朗气清，惠风和畅，仰观宇宙之大，俯察品类之盛</text>
		<u-tabbar
			:value="value6"
			@change="name => value6 = name"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
			:border="false"
			class="tabbar"
		>
			<u-tabbar-item text="查询" icon="home" ></u-tabbar-item>
			<u-tabbar-item text="交流" icon="photo" ></u-tabbar-item>
			<u-tabbar-item text="消息" icon="play-right" ></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" ></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value6: 0,
			}
		}
	}
</script>

<style lang="scss">
	.tabbar{
		background-color: #546;
	}
</style>
