<template>
	<view class="detail-box">
		<!-- 标题 -->
		<view class="title">{{noticeData.title}}</view>
		<!-- 时间 -->
		<view class="datetime">{{noticeData.create_time}}</view>
		<!-- 公告内容 -->
		<view class="content">
			{{noticeData.content}}
		<view class="image-box">
			<u-album :urls="noticeData.image" previewFullImage multipleSize="85" singleSize="300"></u-album>
			</view>
		</view>
		<!-- 公告图片 -->
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:["http://localhost:3000/images/yaan2.jpg",
				"http://localhost:3000/images/yaan2.jpg",
				"http://localhost:3000/images/yaan2.jpg"],
				noticeID:null,
				noticeData:null
			}
		},
		methods: {
			getNoiceData(){
				uni.$u.http.get('/msg/getNoticeByID',{params:{notice_id:this.noticeID}}).then(res => {
					console.log(res)
					this.noticeData = res.data.data[0]
					console.log(this.noticeData)
				})
			}
		},
		onLoad(data) {
			this.noticeID = data.id
			console.log(this.noticeID)
		},
		mounted() {
			this.getNoiceData()
		}
	}
</script>

<style lang="scss">
	.detail-box {
		padding:20rpx 40rpx;
		.title{
			font-weight: bold;
			font-size:40rpx;
			text-align: center;
		}
		.datetime {
			color:#888;
			text-align: center;
			padding: 20rpx 0rpx;
		}
		.content {
			padding:40rpx 40rpx;
			margin-top: 30rpx;
			border-radius: 20rpx;
			background-color: #fff;
			text-indent: 2em;
			text-align: justify;
			line-height: 50rpx;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			.image-box {
				padding-top: 20rpx;
				text-align: center;
			}
		}
	}

</style>
