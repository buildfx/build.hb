(function(){function i(){var a=window.location.hash,a=a&&0<a.length?a.slice(1,a.length):"";jQuery.browser.mozilla||(a=decodeURI(a));if(g(f,"location")!==a&&!f._skipRoute)SC.run.once(function(){f._skipPush=!0;j(f,"location",a);f._skipPush=!1});f._skipRoute=!1}function k(){var a=g(f,"baseURI"),b="/"===a.charAt(0)?document.location.pathname:document.location.href;if(b.slice(0,a.length)===a&&(b=b.slice(a.length+1,b.length),g(f,"location")!==b&&!f._skipRoute))SC.run.once(function(){f._skipPush=!0;j(f,
"location",b);f._skipPush=!1});f._skipRoute=!1}var g=SC.get,j=SC.set,m=!(!window.history||!window.history.pushState),n="onhashchange"in window&&(void 0===document.documentMode||7<document.documentMode),l=SC.Object.extend({target:null,method:null,staticRoutes:null,dynamicRoutes:null,wildcardRoutes:null,add:function(a,b,c){var d,a=SC.copy(a);if(!a||0===a.length)this.target=b,this.method=c;else{d=a.shift();switch(d.slice(0,1)){case ":":d=d.slice(1,d.length);if(!this.dynamicRoutes)this.dynamicRoutes=
{};this.dynamicRoutes[d]||(this.dynamicRoutes[d]=this.constructor.create());d=this.dynamicRoutes[d];break;case "*":d=d.slice(1,d.length);if(!this.wildcardRoutes)this.wildcardRoutes={};d=this.wildcardRoutes[d]=this.constructor.create();break;default:if(!this.staticRoutes)this.staticRoutes={};this.staticRoutes[d]||(this.staticRoutes[d]=this.constructor.create());d=this.staticRoutes[d]}d&&d.add(a,b,c)}},routeForParts:function(a,b){var c,d,e,a=SC.copy(a);if(!a||0===a.length)return this.method?this:null;
c=a.shift();if(this.staticRoutes&&this.staticRoutes[c]&&(e=this.staticRoutes[c].routeForParts(a,b)))return e;for(d in this.dynamicRoutes)if(e=this.dynamicRoutes[d].routeForParts(a,b))return b[d]=c,e;for(d in this.wildcardRoutes)return a.unshift(c),b[d]=a.join("/"),this.wildcardRoutes[d].routeForParts(null,b);return null}}),f=SC.routes=SC.Object.create({wantsHistory:!1,usesHistory:null,baseURI:document.baseURI,_didSetup:!1,_location:null,_firstRoute:null,_Route:l,_extractParametersAndRoute:function(a){var b=
{},c=a.route||"",d,e,f,g,i,h;d=0>c.indexOf("?")&&0<=c.indexOf("&")?"&":"?";e=c.split(d);c=e[0];1===e.length?e=[]:2===e.length?e=e[1].split("&"):2<e.length&&e.shift();g=e.length;for(f=0;f<g;++f)i=e[f].split("="),b[i[0]]=i[1];for(h in a)a.hasOwnProperty(h)&&"route"!==h&&(b[h]=""+a[h]);e=[];for(h in b)e.push([h,b[h]].join("="));b.params=d+e.join("&");b.route=c;return b},location:function(a,b){this._skipRoute=!1;return this._extractLocation(a,b)}.property(),_extractLocation:function(a,b){var c;if(void 0!==
b){null===b&&(b="");"object"===typeof b&&(c=this._extractParametersAndRoute(b),b=c.route+c.params);if(!this._skipPush&&(!SC.empty(b)||this._location&&this._location!==b))if(c=encodeURI(b),this.usesHistory)0<c.length&&(c="/"+c),window.history.pushState(null,null,g(this,"baseURI")+c);else if(0<c.length||0<window.location.hash.length)window.location.hash=c;this._location=b}return this._location},updateLocation:function(a){this._skipRoute=!0;return this._extractLocation("location",a)},ping:function(){if(!this._didSetup){this._didSetup=
!0;var a;if(g(this,"wantsHistory")&&m)this.usesHistory=!0,a=window.location.hash.slice(1),0<a.length&&window.history.replaceState(null,null,g(this,"baseURI")+("/"+a)),k(),jQuery(window).bind("popstate",k);else{this.usesHistory=!1;if(g(this,"wantsHistory")){var b=g(this,"baseURI");a=("/"===b.charAt(0)?document.location.pathname:document.location.href.replace(document.location.hash,"")).slice(b.length+1);if(0<a.length)window.location.href=b+"#"+a}if(n)i(),jQuery(window).bind("hashchange",i);else{var c=
function(){i();setTimeout(c,100)};c()}}}},add:function(a,b,c){if(!this._didSetup)SC.run.once(this,"ping");void 0===c&&"function"===SC.typeOf(b)?(c=b,b=null):"string"===SC.typeOf(c)&&(c=b[c]);if(!this._firstRoute)this._firstRoute=l.create();this._firstRoute.add(a.split("/"),b,c);return this},locationDidChange:function(){this.trigger()}.observes("location"),trigger:function(){var a=g(this,"location"),b;if(this._firstRoute)b=this._extractParametersAndRoute({route:a}),a=b.route,delete b.route,delete b.params,
(a=this.getRoute(a,b))&&a.method&&a.method.call(a.target||this,b)},getRoute:function(a,b){var c=this._firstRoute;null===b&&(b={});return c.routeForParts(a.split("/"),b)},exists:function(a,b){a=this.getRoute(a,b);return null!==a&&null!==a.method}})})();