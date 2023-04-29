
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		data() {
			return {
				globalImgBaseUrl: 'http://192.168.8.147:3000',
			}
		},
		onLoad() {
			
		}
		
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
	view { 
		box-sizing: border-box;
	}
	page {
			background-color: #DFE6E9;
	}
</style>
