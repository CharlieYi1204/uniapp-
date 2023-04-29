<template>
	<view class="search-box">
		<!-- 搜索栏 -->
		<view class="search">
			<u-search placeholder="输入关键词以搜索" :showAction="true" v-model="keywords" height="70rpx" @search="getData" @custom="getData"></u-search>
		</view>
		<!-- 搜索类别 -->
		<view class="content-category">
			<view class="category" :class="navIndex === 0 ? 'activecate' : '' " @click="changeCateState(0)">帖子</view>
			<view class="category" :class="navIndex === 1 ? 'activecate' : '' " @click="changeCateState(1)">用户</view>
		</view>
		<view v-for="(item,index) in postData" :key="index" v-if="navIndex === 0">
			<pageCard  :propData="item"></pageCard>
		</view>
		<view v-if="navIndex === 1" v-for="(item,index) in userData" :key="index">
			<userTitle :userData="item"></userTitle>
		</view>
		<u-empty
		    mode="search"
			v-if="postData.length === 0 && navIndex === 0"
		>
		</u-empty>	
		<u-empty
		    mode="search"
			v-if="userData.length === 0 && navIndex === 1"
		>
		</u-empty>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords:null,
				navIndex:0,
				postData:[],
				userData:[]
			}
		},
		methods: {
			getData(value) {
				if(this.keywords === null || this.keywords === "") {
					uni.showToast({
						title: '请输入关键词 ',
						duration: 1000,
						icon: "error"
					});
				} else {
					if(this.navIndex === 0) {
						//根据关键词搜索帖子
						uni.showLoading({
							title: '加载中'
						});
						uni.$u.http.post("/bbs/searchPost",{keywords:value}).then(res =>{
							console.log(res.data)
							this.postData = res.data
							uni.hideLoading();
						})
						//进行用户数据请求
					} else {
						uni.showLoading({
							title: '加载中'
						});
						uni.$u.http.get("/users/searchUser",{params:{keywords:value}}).then(res =>{
							this.userData = res.data
							uni.hideLoading();
						})
						//进行帖子数据请求时
					}
				}
				
			},
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
		},
		mounted() {
			
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
