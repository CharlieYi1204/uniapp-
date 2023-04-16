(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/userTopIcon/userTopIcon"],{1627:function(n,t,e){},"1d69":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={name:"userTopIcon",props:{isLogin:{type:Boolean,default:!1},userInfo:{type:Object,default:function(){return{username:"默认用户名",icon:"/static/img/user_bg.jpg"}}}},data:function(){return{}},methods:{toLogin:function(){n.navigateTo({url:"/pages/user/login/login"})},imgUrl:function(n){return"http://localhost:3000/"+n}},computed:{notSetNickname:function(){return""==this.userInfo.nickname||null==this.userInfo.nickname},imgsrc:function(){return this.$imgBaseUrl+this.userInfo.icon}}};t.default=e}).call(this,e("543d")["default"])},"511c":function(n,t,e){"use strict";var u=e("1627"),o=e.n(u);o.a},5890:function(n,t,e){"use strict";e.r(t);var u=e("1d69"),o=e.n(u);for(var i in u)["default"].indexOf(i)<0&&function(n){e.d(t,n,(function(){return u[n]}))}(i);t["default"]=o.a},"616c":function(n,t,e){"use strict";e.r(t);var u=e("77eb"),o=e("5890");for(var i in o)["default"].indexOf(i)<0&&function(n){e.d(t,n,(function(){return o[n]}))}(i);e("511c");var r=e("f0c5"),c=Object(r["a"])(o["default"],u["b"],u["c"],!1,null,"f490c988",null,!1,u["a"],void 0);t["default"]=c.exports},"77eb":function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){}));var u=function(){var n=this.$createElement;this._self._c},o=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/userTopIcon/userTopIcon-create-component',
    {
        'components/userTopIcon/userTopIcon-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("616c"))
        })
    },
    [['components/userTopIcon/userTopIcon-create-component']]
]);
