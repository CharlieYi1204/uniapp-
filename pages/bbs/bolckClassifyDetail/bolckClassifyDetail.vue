<template>
	<view class="blockdetail">
		<view v-for="(item,index) in classifyData" :key="index">
			<blockClassify :classifyData="item" :classifyTitle="item.classify_name + '板块'" ></blockClassify>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classifyData:[],
			};
		},
		methods: {
			getClassify() {
				uni.$u.http.get("/bbs/getClassify").then(res => {
					this.classifyData = res.data
				})
			}
		},
		mounted() {
			this.getClassify()
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
