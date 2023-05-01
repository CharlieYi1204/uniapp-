<template>
	<view class="box">
		<!-- 清除浏览历史 -->
		<view v-if="postData.length !== 0">
			<u-button type="primary" 
			text="清除所有记录" 
			icon="edit-pen" 
			plain 
			shape="circle" 
			color="#12B5A1" 
			@click="clearHistory"
			>
			</u-button>
		</view>
		<view v-for="(item,index) in postData" :key="index">
			<pageCard :propData="item" :dateTimeShow="false"></pageCard>
		</view>
		<u-empty
		        mode="history"
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
				postData:[]
			};
		},
		methods: {
			getVisitedPost() {
				uni.$u.http.get("/bbs/getVisitByUserID",{params:{user_id:this.userID}}).then(res => {
					this.postData = res.data
					uni.hideLoading();
				})
			},
			clearHistory() {
				uni.showLoading({
					title: '删除中'
				});
				const userID = this.userID
				const self = this
				uni.showModal({
					title: '提示',
					content: '确定要清空历史记录吗',
					success: function (res) {
						if (res.confirm) {
							uni.$u.http.get("/bbs/clearVisit",{params:{user_id:userID}}).then(res => {
								console.log(userID)
								console.log(res)
								self.getVisitedPost()
								uni.hideLoading();
								uni.showToast({
									title: '已清空',
									duration: 800,
									type:'success'
								});
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			}
		},
		onLoad(data) {
			this.userID = data.user_id
			console.log(this.userID)
		},
		mounted() {
			this.getVisitedPost()
			uni.showLoading({
				title: '加载中'
			});
		},
		onShow() {
			this.getVisitedPost()
		}
	}
</script>

<style lang="scss">
.box {
	padding:20rpx 20rpx;
}
</style>
