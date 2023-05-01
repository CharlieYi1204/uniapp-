<template>
	<view class="box">
		<view style="width: 100%;text-align: center;color:#12B5A1;font-size: 40rpx;font-weight: bold;">已赞帖子</view>
		<view v-for="(item,index) in postData" :key="index">
			<pageCard :propData="item"></pageCard>
		</view>
		<u-empty
		        mode="list"
		        text="暂无点赞记录"
				v-if="postData.length === 0"
		>
		</u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userID: null,
				postData:[],
				};
		},
		methods: {
			getLikePost() {
				console.log(this.userID)
				uni.$u.http.get("/bbs/getLikesPostByUserID",{params:{user_id:`${this.userID}`}}).then(res=> {
					console.log(res)
					this.postData = res.data
				})
			}
		},
		onLoad(data) {
			this.userID = data.user_id
		},
		mounted() {
			this.getLikePost()
		}
	}
</script>

<style lang="scss">
.box {
	padding:20rpx 20rpx;
}
</style>
