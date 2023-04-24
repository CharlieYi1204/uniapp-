<template>
	<view class="collect-box">
		<!-- 标题 -->
		<view v-for="(item,index) in postData" :key="index">
			<pageCard :propData="item" :userCard="true" :collectCard="true"></pageCard>
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userID:null, 
				postData:null
			}
		},
		methods: {
			getData() {
			uni.$u.http.post('/bbs/getPostsByID', {user_id:`${this.userID}`}).then(res => {
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

<style>
.collect-box {
	padding:20rpx 20rpx;
}
</style>
