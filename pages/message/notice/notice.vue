<template>
	<view class="notice-box">
		<view v-for="(item,index) in noticeData" :key="index" v-if="noticeData">
			<noticeCard :noticeData="item"></noticeCard>
		</view>
		<!-- <noticeCard :noticeData="noticeData[0]" v-if="noticeData"></noticeCard> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeData:null,
			};
		},
		methods: {
			getNoticeData() {
				uni.$u.http.get('/msg').then(res => {
					console.log(res.data.data)
					this.noticeData = res.data.data
					
				})
			}
		},
		mounted() {
			this.getNoticeData()
		}
	}
</script>

<style lang="scss">
.notice-box {
	padding:20rpx 20rpx
}
</style>
