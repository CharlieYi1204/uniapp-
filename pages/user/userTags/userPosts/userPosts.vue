<template>
	<view class="postbox">
		<!-- 标题 -->
		<view v-for="(item,index) in postData" :key="index">
			<pageCard :propData="item" :deletshow="true" :userCard="true"></pageCard>
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userID:null, 
				postData:null
			};
		},
		methods: {
			getData() {
			uni.$u.http.get('/bbs/getPostByUserID', {params: {user_id:`${this.userID}`}}).then(res => {
				this.postData = res.data.data
				console.log(this.postData)
			})
			}
		},
		onLoad(data){
			this.userID = data.user_id
		},
		mounted() {
			this.getData()
		}
		
	}
</script>

<style lang="scss">
.postbox {
	padding:20rpx 20rpx;
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
