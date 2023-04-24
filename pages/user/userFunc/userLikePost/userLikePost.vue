<template>
	<view>
		这里是赞过的帖子
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
