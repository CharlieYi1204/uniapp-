// 页面白名单,不收拦截
const whiteList = [
	"/pages/index/index",
	"/pages/user/login/signup/signup"
	// "/pages/index/cardBalanceQuery/cardBalanceQuery",
	// "/pages/index/cardTimesbalance/cardTimesbalance"
]
// 获取storge中存储的token

async function checkToken(token) {
		if (token) {
		uni.$u.http.get("/users/verifyToken", {
			header: {
				Authorization: `Bearer ${token}`
			}
		}).then(res => {
			const {
				code,
				message,
				user
			} = res.data;
			if (code == 200) {
				// 获取用户信息成功，更新页面数据)
				//this.useInfo.username = user.username
				return true
			} else {
				//token过期则清除token
				uni.removeStorageSync('user_token');
				uni.removeStorageSync('user_id');
				uni.setStorageSync('isLogin', false);
				return false
			}
		}).catch(err => {
			console.log(err)
		})
	} else {
		uni.setStorageSync('isLogin', false);
		return false
		}
}

const token = uni.getStorageSync("user_token")

function hasPermission(url) {
	//获取当前已存在的token
	const isLogin =  false
	// const token = uni.getStorageSync("user_token")
	// 判断token是否存在，若存在即向后台验证

	// 在白名单中或有登录判断条件可以直接跳转
	if (whiteList.indexOf(url) !== -1 || isLogin) {
		return true
	}
	return false
}

//使用uniapp自带的拦截器，进行登录拦截，用户在没登录的情况下无法进行其他操作
uni.addInterceptor('navigateTo', {
	invoke(e) {
		console.log(e)
		if(!hasPermission(e.url)){
			uni.reLaunch({
				url:"/pages/user/login/login"
			})
			return false
		}
		return true
	},
	success(e){
		
	}
})

uni.addInterceptor('switchTab', {
	invoke(e) {
		if(!hasPermission(e.url)){
			uni.reLaunch({
				url:"/pages/user/login/login"
			})
			return false
		}
		return true
	},
	success(e){
	}
})