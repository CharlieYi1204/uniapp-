<template>
	<view class="search-box">
		<!-- 搜索栏 -->
		<view class="search">
			<u-search placeholder="点击进行搜索" :showAction="true" v-model="keyWords" height="70rpx" @custom="getSearchData()"></u-search>
		</view>
		<!-- 搜索类别 -->
		<view class="content-category">
			<view class="category" :class="navIndex === 0 ? 'activecate' : '' " @click="changeCateState(0)">帖子</view>
			<view class="category" :class="navIndex === 1 ? 'activecate' : '' " @click="changeCateState(1)">用户</view>
		</view>
			<pageCard v-if="navIndex === 0" title="【卡面上新】华为钱包×腾讯手游13张卡面正式来袭！" content="喜欢玩游戏的华为钱包天府通用户们有福气啦！本周华为钱包来给各位天府通小伙伴送夏日卡面福利啦！"></pageCard>
			<userTitle v-if="navIndex === 1" :sex="0"></userTitle>
			<userTitle v-if="navIndex === 1" :sex="1"></userTitle>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords:"",
				navIndex:0
			}
		},
		methods: {
			changeCateState(index) {
				if (index === 1) {
					this.navIndex = 1
				}
				else {
					this.navIndex = 0
				}
			},
			getSearchData() {
				console.log(this.keywords)
			}
		}
	}
</script>

<style lang="scss">
.search-box { 
	padding:20rpx 20rpx;
	.search {
		padding-bottom: 20rpx;
	}
	.content-category {
		display: flex;
		padding: 30rpx 0rpx;
		.category {
			padding:0rpx 20rpx;
			font-size: 30rpx;
		}
		.activecate {
			color:#12B5A1;
		}
	}
}
</style>
