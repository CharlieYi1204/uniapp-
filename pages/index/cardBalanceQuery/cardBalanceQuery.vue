<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:"",
			};
		},
		onLoad(option){
			this.url = option.url
			console.log(this.url)
		}
	}
</script>

<style lang="scss">

</style>
