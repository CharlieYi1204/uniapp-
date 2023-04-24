<template>
	<view>
		这里是板块关注
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userID: null,
			};
		},
		onload(data) {
			this.userID = data.user_id
		}
	}
</script>

<style lang="scss">

</style>
