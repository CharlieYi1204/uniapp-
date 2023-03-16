<template>
	<view class="user">
<!-- 		<view class="user-bg">
			<image src="../../static/img/user_bg.jpg" mode="aspectFill"></image>
		</view> -->
		<!-- 头部头像区域 -->
		<view class="top">
			<view class="usericon" @click="toLogin()">
					<image src="/static/img/user_bg.jpg" mode="aspectFill"></image>
					<view>请登录</view>
			</view>
		</view>
		<!-- 中部帖子、收藏数量栏目 -->
		<view class="user-newsnum">
			<view class="item" v-for="item in userNewsCollect">
				<view class="info-num" :style="{color: item.color}"> {{item.num}} </view>
				<view class="info-title">{{item.title}}</view>
			</view>
		</view>
		<!-- 下部，列表功能项 -->
			<view class="user-func">
				<view 
				v-for="(item,index) in userFunc"
				:key="index"
				class="row">
				<view class="func-icon">
					<image :src="item.icon" ></image>
				</view>
				<view class="func-text">{{item.title}}</view>
				</view>
			</view>
		<!-- 退出登录按钮 -->
		<view class="log-out">
			<button color="red">退出登录</button>
		</view>
	</view>
	
</template>

<script>
	export default {
		name:"userTopIcon",
		data() {
			return {
				userNewsCollect: [{
					title:"帖子",
					num:20,
					color:"rgb(116, 185, 255)"
				},{
					title:"收藏",
					num:35,
					color:"rgb(0, 206, 201)"
				},{
					title:"关注",
					num:10,
					color:"rgb(250, 177, 160)"
				},{
					title:"粉丝",
					num:12,
					color:"rgb(225, 112, 85)"
				}],
				userFunc:[{
					title:"修改个人信息",
					icon:"/static/icon/edit.png"
				},
				{
					title:"查看浏览历史",
					icon:"/static/icon/history.png"
				}]
			};
		},
		methods: {
			toLogin() {
				uni.redirectTo({
					url:"/pages/login/login"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  .user{
	  background: #DFE6E9;
	  padding:20rpx 20rpx;
	  // .user-bg {
		 //  position: absolute;
		 //  width: 100%;
		 //  height: 400rpx;
		 //  image {
			//   width: 100%;
			//   height: 100%;
			//   filter:opacity(0.5);
		 //  }
	  // }
	.top {
		  width: 100%;
		  height: 400rpx;
		  background-image: linear-gradient(to right bottom , #0164A7, #5EAF37);
		  background-image: (url("../../static/img/user_bg.jpg") rgba(0,0,0,0.5));
	
		  background-position:center;
		  border-radius: 30rpx;

		  color: white;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  .usericon {
			text-align: center;
		  	width: 300rpx;
		  	height: 150rpx;
			image {
				border: 3px solid #fff;
				border-radius: 150rpx;
				width: 150rpx;
				height: 100%;
			}
		  }
		}
		.user-newsnum {
			width: 100%;
			height: 200rpx;
			border-radius: 20rpx;
			margin-top: 20rpx;
			padding: 5rpx;
			display: flex;
			justify-content: space-around;
			background-color: #fff;
			.item {
				height: 100%;
				width: 150rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
			.info-num {
				font-size: 50rpx;
				font-weight: bold;
			}
			.info-title{
				font-size: 30rpx;
			}
			}
		}
		.user-func {
			font-size: 40rpx;
			padding:30rpx 40rpx;
			background: #fff;
			margin-top: 20rpx;
			border-radius: 20rpx;
			.row {
				width: 100%;
				height: 80rpx;
				padding:50rpx 0rpx;
				margin-bottom: 20rpx;
				border-bottom: 1px solid #DFE6E9;
				display: flex;
				align-items: center;
				.func-icon{
					width: 50rpx;
					height: 50rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.func-text {
					font-size: 40rpx;
					font-weight: bold;
					padding-left:30rpx
				}
			}
		}
		.log-out {
			margin-top: 20rpx;
			button {
				background: #12B5A1;
				color:white;
				border-radius: 20rpx;
			}
		}
		.enditem{
			border: none;
			color:red;
		}
  }
	

</style>