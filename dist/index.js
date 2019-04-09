module.exports=function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=8)}([function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}t.exports=function(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}},function(t,e,n){var o=n(5),r=n(6);t.exports=function(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?r(t):e}},function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},function(t,e,n){var o=n(7);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}},function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(e){return"function"==typeof Symbol&&"symbol"===n(Symbol.iterator)?t.exports=o=function(t){return n(t)}:t.exports=o=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":n(t)},o(e)}t.exports=o},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},function(t,e){function n(e,o){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,o)}t.exports=n},function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),i=n(1),l=n.n(i),s=n(2),u=n.n(s),a=n(3),c=n.n(a),f=n(4),d=n.n(f),p=function(){function t(){r()(this,t),this.defaultOpts={},this.listenerList={},window.addEventListener("scroll",this.throttle(this.handleScroll.bind(this),100,300))}return l()(t,[{key:"handleScroll",value:function(){var t=this.getScrollTop(),e=this.getWindowHeight();for(var n in this.listenerList)this.handleScrollOne(this.listenerList[n],t,e)}},{key:"handleScrollOne",value:function(t,e,n){}},{key:"listener",value:function(t,e){var n="",o=null;return("string"==typeof t||"undefined"!=typeof jQuery&&t instanceof jQuery)&&(t={el:t}),n=t.el,"undefined"!=typeof jQuery&&t.el instanceof jQuery?(t.el.data("selector")?n=t.el.data("selector"):(n="jQuery"+Math.random(),t.el.data("selector",n)),o=t.el.get(0)):o=document.querySelector(n),this.listenerList[n]||(this.listenerList[n]=[]),this.mixinMethod(o),this.listenerList[n].target=o,this.listenerList[n].push({opts:t,callBack:e}),this.handleScrollOne(this.listenerList[n],this.getScrollTop(),this.getWindowHeight()),this.listenerEnd&&this.listenerEnd(o,t),this}},{key:"throttle",value:function(t,e,n){var o=null,r=new Date;return function(){var i=this,l=arguments,s=new Date;clearTimeout(o),s-r>=n?(t.apply(i,l),r=s):o=setTimeout(function(){t.apply(i,l)},e)}}},{key:"getScrollTop",value:function(){var t=0;return document.documentElement&&document.documentElement.scrollTop?t=document.documentElement.scrollTop:document.body&&(t=document.body.scrollTop),t}},{key:"getWindowHeight",value:function(){var t=0;return t=window.innerHeight?window.innerHeight:document.body.clientHeight&&document.documentElement.clientHeight?document.body.clientHeight<document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight:document.body.clientHeight>document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight,Math.floor(t)}},{key:"mixinMethod",value:function(t){function e(t,e){var n=t.ownerDocument.defaultView;return n&&n.opener||(n=window),t.currentStyle?t.currentStyle[e]:n.getComputedStyle(t)[e]}t.hasClass=function(e){return t.classList.contains(e)},t.addClass=function(e){t.classList.add(e)},t.removeClass=function(e){t.classList.remove(e)},t.offset=function(){return function(t){var e={left:0,top:0};for(;t;)e.left+=t.offsetLeft,e.top+=t.offsetTop,t=t.offsetParent;return e}(t)},t.getHeight=function(){if(null!=t.style.height&&t.style.height.length>0)return parseFloat(t.style.height);if(parseFloat(e(t,"height"))>0)return parseFloat(e(t,"height"));if(t.offsetHeight>0){var n=e(t,"borderTopWidth"),o=e(t,"borderBottomWidth"),r=e(t,"paddingTop"),i=e(t,"paddingBottom"),l=parseFloat(t.offsetHeight)-parseFloat(n)-parseFloat(o)-parseFloat(r)-parseFloat(i);return parseFloat(l)}return 0}}}]),t}(),h=function(t){function e(){var t;return r()(this,e),(t=u()(this,c()(e).call(this))).defaultOpts={scrollClassName:"scroll-listened",trigger:1},t}return d()(e,t),l()(e,[{key:"handleScrollOne",value:function(t,e,n){var o=this,r=t.target;t.forEach(function(t){var i=t.callBack,l=t.opts,s=o.getStatus(r,e,n,l.trigger||o.defaultOpts.trigger),u=l.scrollClassName||o.defaultOpts.scrollClassName;switch(l.type){case"once":"enter"!==s||l.isListened||(l.isListened=!0,r.addClass(u),i&&i({target:r,status:s,scrollTop:e,windowHeight:n}));break;case"repeat":"enter"===s?l.isListened||(l.isListened=!0,r.addClass(u),i&&i({target:r,status:s,scrollTop:e,windowHeight:n})):"leave"===s&&l.isListened&&(l.isListened=!1,r.removeClass(u),i&&i({target:r,status:s,scrollTop:e,windowHeight:n}));break;default:i&&i({target:r,status:s,scrollTop:e,windowHeight:n})}})}},{key:"getStatus",value:function(t,e,n,o){var r=t.offset().top;return r<e+n/(1+o)&&t.getHeight()+r>e+n||t.getHeight()/(1+o)+r>e&&e>r||r>=e&&r+t.getHeight()<=e+n?"enter":"leave"}}]),e}(p),y=function(t){function e(){var t;return r()(this,e),(t=u()(this,c()(e).call(this))).defaultOpts={limit:{x:0,y:7},duration:.5},t}return d()(e,t),l()(e,[{key:"handleScrollOne",value:function(t,e,n){var o=this,r=t.target;t.forEach(function(t){var i,l=t.callBack,s=t.opts,u=r.offset().top,a=(n-r.getHeight())/2,c=1-(u-e)/a;s.limit=s.limit||{},i={x:(s.limit.x||o.defaultOpts.limit.x)*c*-1,y:(s.limit.y||o.defaultOpts.limit.y)*c*-1},o.setCss3(r,"transform","translate("+i.x+"px, "+i.y+"px)"),l&&l({target:r,parallax:i,scrollTop:e,windowHeight:n})})}},{key:"listenerEnd",value:function(t,e){this.setCss3(t,"transition","all "+(e.duration||this.defaultOpts.duration)+"s ease")}},{key:"setCss3",value:function(t,e,n){var o=e.charAt(0).toUpperCase()+e.substring(1);t.style["Webkit"+o]=n,t.style["Moz"+o]=n,t.style["ms"+o]=n,t.style["O"+o]=n,t.style[e]=n}}]),e}(p);e.default={ListenScroll:h,ScrollParallax:y}}]);
//# sourceMappingURL=index.js.map