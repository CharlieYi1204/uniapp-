(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/userMessageCard/userMessageCard"],{2893:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return u}));var u={uAvatar:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(e.bind(null,"9706"))},uBadge:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-badge/u-badge")]).then(e.bind(null,"d8ae"))}},a=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.showDot=!1})},o=[]},"5ce1":function(t,n,e){"use strict";e.r(n);var u=e("7b43"),a=e.n(u);for(var o in u)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return u[t]}))}(o);n["default"]=a.a},"7b43":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"userCard",data:function(){return{userData:null,showDot:!0,text:"你好，想请问一下雅安雨城区13路可以使用天府通吗？"}},methods:{getUserData:function(){var n=this;t.$u.http.get("/users/getIDTargetUser",{params:{user_id:51}}).then((function(t){console.log(t),n.userData=t.data.data[0]}))},toChat:function(){t.navigateTo({url:"/pages/bbs/chat/chat"})}},mounted:function(){this.getUserData()}};n.default=e}).call(this,e("543d")["default"])},"9a1c":function(t,n,e){"use strict";var u=e("9bf0"),a=e.n(u);a.a},"9b8f":function(t,n,e){"use strict";e.r(n);var u=e("2893"),a=e("5ce1");for(var o in a)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("9a1c");var r=e("f0c5"),i=Object(r["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],void 0);n["default"]=i.exports},"9bf0":function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/userMessageCard/userMessageCard-create-component',
    {
        'components/userMessageCard/userMessageCard-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9b8f"))
        })
    },
    [['components/userMessageCard/userMessageCard-create-component']]
]);