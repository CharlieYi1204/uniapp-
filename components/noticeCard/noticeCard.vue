<template>
	<view class="notice-card" @click="toNoticeDetail">
		<!-- 顶部标题 -->
		<view class="notice-title">
			<view class="title-icon"><u-icon name="bell" color="#12B5A1" size="28"></u-icon>
			<view class="title-context">{{noticeData.title}}</view>
			</view>
			<view class="title-date">{{noticeData.create_time}}</view>
		</view>
		<!-- 分割线 -->
		<u-divider></u-divider>
		<view class="notice-content">
			{{noticeData.content}}
		</view>
		<!-- 查看详情 -->
		<view class="notice-bottom">
			<view>查看详情</view>
			<view>
				<u-icon name="arrow-right" size="15" color="727272"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"noticeCard",
		props: {
			noticeData: {
				type:Object,
				default(){
					return {
						title:"这里是公告标题",
						content:"这里是公告内容预览",
						create_time: "这里是时间",
						image:[]
					}
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			toNoticeDetail() {
				uni.navigateTo({
					url:`/pages/message/notice/noticedetail/noticedetail?id=${this.noticeData.id}`
				})
			}
		},
		mounted() {
			console.log(this.noticeData)
		}
	}
</script>

<style lang="scss">
.notice-card {
	padding:20rpx 20rpx;
	background-color: #fff;
	border-radius: 20rpx;
	width:100%;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin-bottom: 25rpx;
	.notice-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 29rpx;
		.title-icon {
			display: flex;
			width: 70%;
			align-items: center;
			.title-context {
				//文本超过1行后显示省略号
				color:#727272;
				overflow:hidden; 
				text-overflow:ellipsis;
				display:-webkit-box; 
				padding-left: 5rpx;
				-webkit-box-orient:vertical;
				-webkit-line-clamp:1; 
			}
		}
		.title-date {
			color:#727272;
		}
	}
	.notice-content {
		overflow:hidden;
		font-size: 30rpx;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.notice-bottom{
		display: flex;
		align-items: center;
		font-size: 25rpx;
		justify-content: space-between;
		padding-top: 20rpx;
	}
}
</style>