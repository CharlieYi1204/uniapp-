<template>
	<view class="chat-box">
		<!-- 消息box -->
		<view v-for="(item,index) in messageList" :key="index">
			<view class="message-box"  v-if="item.uid === 51">
				<view class="message-from">
					<view class="useravatar">
						<image :src="item.src"></image>
					</view>
					<view class="content-text">{{item.value}}</view>
				</view>
			</view>
			<view class="message-box" v-if="item.uid === 1003">
				<view class="message-to">
					<view class="content-text">
						{{item.value}}
					</view>
					<view class="useravatar">
						<image :src="item.src"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="input-bottom">
			<view class="bottom-input">
				 <u--input
					v-model="value"
				    border="surround"
				  ></u--input>
			</view>
			<view>
				<u-button type="primary" text="回复" color="#12B5A1" @click="sendMessage"></u-button>
			</view>
		</view>
		<!-- 占位符，防止页面挡住 -->
		<view class="pleceHolder">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:"",
				messageList:[{
					uid:51,
					src:'http://localhost:3000/images/avater2.png',
					value:"你好，请问一下，眉山现在可以使用成都的交通卡进行乘车吗？"	
				},{
					uid:1003,
					src:'http://localhost:3000/images/user_bg.jpg',
					value:"可以的"	
				}]
			};
		},
		methods: {
			sendMessage() {
				this.messageList.push({
					uid:1003,
					src:'http://localhost:3000/images/user_bg.jpg',
					value:this.value
				})
				this.value = ''
			}
		}
	}
</script>

<style lang="scss">
.chat-box {
	padding: 20rpx 30rpx;
	padding-top: 40rpx;
	.message-box {
		width: 100%;
		padding-bottom: 20rpx;
		.message-from {
			display:flex;
			.useravatar {
				width: 80rpx;
				height:80rpx;
				image {
					border-radius: 50%;
					width: 100%;
					height:100%;
				}
			}
			.content-text{
				margin-left: 10rpx;
				padding:20rpx 20px;
				width: 50%;
				background-color: #fff;
				border-radius: 20rpx;
				
			}
		}
		.message-to {
			display:flex;
			justify-content: flex-end;
			.useravatar {
				width: 80rpx;
				height:80rpx;
				image {
					border-radius: 50%;
					width: 100%;
					height:100%;
				}
			}
			.content-text{
				text-align: right;
				margin-right: 10rpx;
				padding:20rpx 20px;
				background-color: #fff;
				width: 50%;
				border-radius: 20rpx;
			}
		}
	}
	
	
	.input-bottom {
			height:150rpx;
			width: 100%;
			position: fixed;
			bottom:0;
			left:0;
			background-color: #fff;
			padding:20rpx 20rpx 0rpx 20rpx;
			display: flex;
			justify-content: space-around;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			.bottom-input{
				width: 80%;
			}
		}
		.pleceHolder{
			height: 150rpx;
		}
}

</style>
