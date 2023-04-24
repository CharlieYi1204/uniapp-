(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/userTopIcon/userTopIcon"],{"1d69":function(n,e,t){"use strict";(function(n){var o=t("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=o(t("66fd")),i={name:"userTopIcon",props:{isLogin:{type:Boolean,default:!1},userInfo:{type:Object,default:function(){return{username:"默认用户名",icon:"/images/user_bg.jpg"}}}},data:function(){return{$imgBaseUrl:u.default.prototype.$imgBaseUrl}},methods:{toLogin:function(){n.navigateTo({url:"/pages/user/login/login"})},imgUrl:function(){console.log(this.imgsrc)}},computed:{notSetNickname:function(){return""==this.userInfo.nickname||null==this.userInfo.nickname},imgsrc:function(){return this.$imgBaseUrl+this.userInfo.icon}}};e.default=i}).call(this,t("543d")["default"])},5890:function(n,e,t){"use strict";t.r(e);var o=t("1d69"),u=t.n(o);for(var i in o)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(i);e["default"]=u.a},"616c":function(n,e,t){"use strict";t.r(e);var o=t("ad71"),u=t("5890");for(var i in u)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return u[n]}))}(i);t("d8a8");var r=t("f0c5"),a=Object(r["a"])(u["default"],o["b"],o["c"],!1,null,"20a1bbde",null,!1,o["a"],void 0);e["default"]=a.exports},ad71:function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return u})),t.d(e,"a",(function(){}));var o=function(){var n=this.$createElement;this._self._c},u=[]},d8a8:function(n,e,t){"use strict";var o=t("ebac"),u=t.n(o);u.a},ebac:function(n,e,t){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/userTopIcon/userTopIcon-create-component',
    {
        'components/userTopIcon/userTopIcon-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("616c"))
        })
    },
    [['components/userTopIcon/userTopIcon-create-component']]
]);
