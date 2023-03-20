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
				globalImgBaseUrl: 'http://localhost:3000/'
			}
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
