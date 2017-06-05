/*! ngTable v0.8.3 by Vitalii Savchuk(esvit666@gmail.com) - https://github.com/esvit/ng-table - New BSD License */

//!function(a,b){"use strict";return"function"==typeof define&&define.amd?void define(["angular"],function(a){return b(a)}):b(a)}(window.angular||null,function(a){"use strict";var b=a.module("ngTable",[]);return function(){function b(b){function c(b,c){var f=b.charAt(0).toUpperCase()+b.substring(1),g={};return g["on"+f]=d(b),g["publish"+f]=e(b),a.extend(c,g)}function d(c){return function(d){var e=a.identity,g=b;if(2===arguments.length?a.isFunction(arguments[1].$new)?g=arguments[1]:e=arguments[1]:arguments.length>2&&(g=arguments[1],e=arguments[2]),a.isObject(e)){var h=e;e=function(a){return a===h}}return g.$on("ngTable:"+c,function(a,b){if(!b.isNullInstance){var c=f(arguments,2),g=[b].concat(c);e.apply(this,g)&&d.apply(this,g)}})}}function e(a){return function(){var c=["ngTable:"+a].concat(Array.prototype.slice.call(arguments));b.$broadcast.apply(b,c)}}function f(a,b){return Array.prototype.slice.call(a,null==b?1:b)}var g={};return g=c("afterCreated",g),g=c("afterReloadData",g),g=c("datasetChanged",g),g=c("pagesChanged",g)}a.module("ngTable").factory("ngTableEventsChannel",b),b.$inject=["$rootScope"]}(),function(){function b(){function b(){c()}function c(){f=g}function d(b){var c=a.extend({},f,b);c.aliasUrls=a.extend({},f.aliasUrls,b.aliasUrls),f=c}function e(){function b(a,b){return-1!==a.indexOf("/")?a:e.getUrlForAlias(a,b)}function c(a){return f.aliasUrls[a]||f.defaultBaseUrl+a+f.defaultExt}var d,e={config:d,getTemplateUrl:b,getUrlForAlias:c};return Object.defineProperty(e,"config",{get:function(){return d=d||a.copy(f)},enumerable:!0}),e}var f,g={defaultBaseUrl:"ng-table/filters/",defaultExt:".html",aliasUrls:{}};this.$get=e,this.resetConfigs=c,this.setConfig=d,b(),e.$inject=[]}a.module("ngTable").provider("ngTableFilterConfig",b),b.$inject=[]}(),function(){function b(){function a(a){function c(c,d){if(null==c)return[];var e=d.hasFilter()?a(b.filterFilterName)(c,d.filter(!0)):c,f=d.orderBy(),g=f.length?a(b.sortingFilterName)(e,f):e,h=g.slice((d.page()-1)*d.count(),d.page()*d.count());return d.total(g.length),h}return c}var b=this;b.$get=a,b.filterFilterName="filter",b.sortingFilterName="orderBy",a.$inject=["$filter"]}a.module("ngTable").provider("ngTableDefaultGetData",b),b.$inject=[]}(),function(){function b(a){function b(b){return function(){var c=a.defer(),d=b.apply(this,[c].concat(Array.prototype.slice.call(arguments)));return d||(d=c.promise),d}}return b}a.module("ngTable").factory("ngTableGetDataBcShim",b),b.$inject=["$q"]}(),b.value("ngTableDefaults",{params:{},settings:{}}),b.factory("NgTableParams",["$q","$log","ngTableDefaults","ngTableGetDataBcShim","ngTableDefaultGetData","ngTableEventsChannel",function(b,c,d,e,f,g){var h=function(a){return!isNaN(parseFloat(a))&&isFinite(a)},i=function(i,j){function k(){var a=s.getDataFnAdaptor(s.getData);return b.when(a.call(s,o))}function l(){var a=s.getGroupsFnAdaptor(s.getGroups);return b.when(a.call(s,s.groupBy,o))}function m(a){var c=s.interceptors||[];return c.reduce(function(a,c){var d=c.response&&c.response.bind(c)||b.when,e=c.responseError&&c.responseError.bind(c)||b.reject;return a.then(function(a){return d(a,o)},function(a){return e(a,o)})},a())}"boolean"==typeof i&&(this.isNullInstance=!0);var n,o=this,p=!1,q=function(){s.debugMode&&c.debug&&c.debug.apply(this,arguments)};this.data=[],this.parameters=function(b,c){if(c=c||!1,a.isDefined(b)){for(var d in b){var e=b[d];if(c&&d.indexOf("[")>=0){for(var f=d.split(/\[(.*)\]/).reverse(),g="",i=0,j=f.length;j>i;i++){var k=f[i];if(""!==k){var l=e;e={},e[g=k]=h(l)?parseFloat(l):l}}"sorting"===g&&(r[g]={}),r[g]=a.extend(r[g]||{},e[g])}else r[d]=h(b[d])?parseFloat(b[d]):b[d]}return q("ngTable: set parameters",r),this}return r},this.settings=function(b){if(a.isDefined(b)){a.isArray(b.data)&&(b.total=b.data.length),b.getData&&b.getData.length>1&&(b.getDataFnAdaptor=e),b.getGroups&&b.getGroups.length>2&&(b.getGroupsFnAdaptor=e);var c=s.data;s=a.extend(s,b);var d=b.hasOwnProperty("data")&&b.data!=c;return d&&(p&&this.page(1),p=!1,g.publishDatasetChanged(this,b.data,c)),q("ngTable: set settings",s),this}return s},this.page=function(b){return a.isDefined(b)?this.parameters({page:b}):r.page},this.total=function(b){return a.isDefined(b)?this.settings({total:b}):s.total},this.count=function(b){return a.isDefined(b)?this.parameters({count:b,page:1}):r.count},this.filter=function(b){if(a.isDefined(b)&&a.isObject(b))return this.parameters({filter:b,page:1});if(b===!0){for(var c=Object.keys(r.filter),d={},e=0;e<c.length;e++){var f=r.filter[c[e]];null!=f&&""!==f&&(d[c[e]]=f)}return d}return r.filter},this.sorting=function(b){if(2==arguments.length){var c={};return c[b]=arguments[1],this.parameters({sorting:c}),this}return a.isDefined(b)?this.parameters({sorting:b}):r.sorting},this.isSortBy=function(b,c){return void 0!==c?a.isDefined(r.sorting[b])&&r.sorting[b]==c:a.isDefined(r.sorting[b])},this.orderBy=function(){var a=[];for(var b in r.sorting)a.push(("asc"===r.sorting[b]?"+":"-")+b);return a},this.getData=function(a){return f(this.data,a)},this.getGroups=function(b){return k().then(function(c){var d={};a.forEach(c,function(c){var e=a.isFunction(b)?b(c):c[b];d[e]=d[e]||{data:[]},d[e].value=e,d[e].data.push(c)});var e=[];for(var f in d)e.push(d[f]);return q("ngTable: refresh groups",e),e})},this.generatePagesArray=function(a,b,c,d){arguments.length||(a=this.page(),b=this.total(),c=this.count());var e,f,g,h,i;if(d=d&&6>d?6:d,i=[],h=Math.ceil(b/c),h>1){i.push({type:"prev",number:Math.max(1,a-1),active:a>1}),i.push({type:"first",number:1,active:a>1,current:1===a}),f=Math.round((s.paginationMaxBlocks-s.paginationMinBlocks)/2),g=Math.max(2,a-f),e=Math.min(h-1,a+2*f-(a-g)),g=Math.max(2,g-(2*f-(e-g)));for(var j=g;e>=j;)i.push(j===g&&2!==j||j===e&&j!==h-1?{type:"more",active:!1}:{type:"page",number:j,active:a!==j,current:a===j}),j++;i.push({type:"last",number:h,active:a!==h,current:a===h}),i.push({type:"next",number:Math.min(h,a+1),active:h>a})}return i},this.isDataReloadRequired=function(){return!p||!a.equals(r,n)},this.hasFilter=function(){return Object.keys(this.filter(!0)).length>0},this.hasFilterChanges=function(){return!a.equals(r&&r.filter,n&&n.filter)},this.url=function(b){b=b||!1;var c=b?[]:{};for(var d in r)if(r.hasOwnProperty(d)){var e=r[d],f=encodeURIComponent(d);if("object"==typeof e){for(var g in e)if(!a.isUndefined(e[g])&&""!==e[g]){var h=f+"["+encodeURIComponent(g)+"]";b?c.push(h+"="+e[g]):c[h]=e[g]}}else a.isFunction(e)||a.isUndefined(e)||""===e||(b?c.push(f+"="+encodeURIComponent(e)):c[f]=encodeURIComponent(e))}return c},this.reload=function(){var c=this,d=null;s.$loading=!0,n=a.copy(r),p=!0,d=m(s.groupBy?l:k),q("ngTable: reload data");var e=c.data;return d.then(function(a){return s.$loading=!1,c.data=a,g.publishAfterReloadData(c,a,e),c.reloadPages(),s.$scope&&s.$scope.$emit("ngTableAfterReloadData"),a})["catch"](function(a){return n=null,p=!1,b.reject(a)})},this.reloadPages=function(){var b;return function(){var c=b,d=o.generatePagesArray(o.page(),o.total(),o.count());a.equals(c,d)||(b=d,g.publishPagesChanged(this,d,c))}}();var r={page:1,count:1,filter:{},sorting:{},group:{},groupBy:null};a.extend(r,d.params);var s={$scope:null,$loading:!1,data:null,total:0,defaultSort:"desc",filterDelay:750,counts:[10,25,50,100],interceptors:[],paginationMaxBlocks:11,paginationMinBlocks:5,sortingIndicator:"span",getDataFnAdaptor:a.identity,getGroupsFnAdaptor:a.identity,getGroups:this.getGroups,getData:this.getData};return this.settings(d.settings),this.settings(j),this.parameters(i,!0),g.publishAfterCreated(this),this};return i}]),b.factory("ngTableParams",["NgTableParams",function(a){return a}]),function(){function b(a,b){a.config=b}a.module("ngTable").controller("ngTableFilterRowController",b),b.$inject=["$scope","ngTableFilterConfig"]}(),function(){function b(a){function b(b,c){var d=b.sortable&&b.sortable();if(d){var e=a.params.settings().defaultSort,f="asc"===e?"desc":"asc",g=a.params.sorting()&&a.params.sorting()[d]&&a.params.sorting()[d]===e,h=c.ctrlKey||c.metaKey?a.params.sorting():{};h[d]=g?f:e,a.params.parameters({sorting:h})}}a.sortBy=b}a.module("ngTable").controller("ngTableSorterRowController",b),b.$inject=["$scope"]}(),b.controller("ngTableController",["$scope","NgTableParams","$timeout","$parse","$compile","$attrs","$element","ngTableColumn","ngTableEventsChannel",function(b,c,d,e,f,g,h,i,j){function k(a){if(a){b.params.settings().$scope=b;var c=b.params;if(c.hasFilterChanges()){var d=function(){c.page(1),c.reload()};c.settings().filterDelay?m(d,c.settings().filterDelay):d()}else c.reload()}}function l(){function a(a,c){a.settings().groupBy?b.$groups=c:b.$data=c}function c(a,c){b.pages=c}function d(a){return b.params===a}j.onAfterReloadData(a,b,d),j.onPagesChanged(c,b,d)}b.$filterRow={},b.$loading=!1,b.hasOwnProperty("params")||(b.params=new c(!0)),b.params.settings().$scope=b;var m=function(){var a=0;return function(b,c){d.cancel(a),a=d(b,c)}}();b.$watch("params",function(a,b){a!==b&&a&&a.reload()},!1),b.$watch("params.isDataReloadRequired()",k),this.compileDirectiveTemplates=function(){if(!h.hasClass("ng-table")){b.templates={header:g.templateHeader?g.templateHeader:"ng-table/header.html",pagination:g.templatePagination?g.templatePagination:"ng-table/pager.html"},h.addClass("ng-table");var c=null,d=!1;a.forEach(h.children(),function(a){"THEAD"===a.tagName&&(d=!0)}),d||(c=a.element(document.createElement("thead")).attr("ng-include","templates.header"),h.prepend(c));var e=a.element(document.createElement("div")).attr({"ng-table-pagination":"params","template-url":"templates.pagination"});h.after(e),c&&f(c)(b),f(e)(b)}},this.loadFilterData=function(c){a.forEach(c,function(c){var d;return d=c.filterData(b,{$column:c}),d?a.isObject(d)&&a.isObject(d.promise)?(delete c.filterData,d.promise.then(function(b){a.isArray(b)||a.isFunction(b)||a.isObject(b)?a.isArray(b)&&b.unshift({title:"",id:""}):b=[],c.data=b})):c.data=d:void delete c.filterData})},this.buildColumns=function(a){return a.map(function(a){return i.buildColumn(a,b)})},this.parseNgTableDynamicExpr=function(a){if(!a||a.indexOf(" with ")>-1){var b=a.split(/\s+with\s+/);return{tableParams:b[0],columns:b[1]}}throw new Error("Parse error (expected example: ng-table-dynamic='tableParams with cols')")},this.setupBindingsToInternalScope=function(c){var d=e(c);b.$watch(d,function(c){a.isUndefined(c)||(b.paramsModel=d,b.params=c)},!1),g.showFilter&&b.$parent.$watch(g.showFilter,function(a){b.show_filter=a}),g.disableFilter&&b.$parent.$watch(g.disableFilter,function(a){b.$filterRow.disabled=a})},l()}]),b.factory("ngTableColumn",[function(){function b(b,d){var e=Object.create(b);for(var f in c)void 0===e[f]&&(e[f]=c[f]),a.isFunction(e[f])||!function(a){e[a]=function(){return b[a]}}(f),function(a){var c=e[a];e[a]=function(){return 0===arguments.length?c.call(b,d):c.apply(b,arguments)}}(f);return e}var c={"class":function(){return""},filter:function(){return!1},filterData:a.noop,headerTemplateURL:function(){return!1},headerTitle:function(){return""},sortable:function(){return!1},show:function(){return!0},title:function(){return""},titleAlt:function(){return""}};return{buildColumn:b}}]),b.directive("ngTable",["$q","$parse",function(b,c){return{restrict:"A",priority:1001,scope:!0,controller:"ngTableController",compile:function(b){var d=[],e=0,f=null;return a.forEach(a.element(b.find("tr")),function(b){b=a.element(b),b.hasClass("ng-table-group")||f||(f=b)}),f?(a.forEach(f.find("td"),function(b){var f=a.element(b);if(!f.attr("ignore-cell")||"true"!==f.attr("ignore-cell")){var g=function(a){return f.attr("x-data-"+a)||f.attr("data-"+a)||f.attr(a)},h=function(b){var e=g(b);return e?function(b,f){return c(e)(b,a.extend(f||{},{$columns:d}))}:void 0},i=g("title-alt")||g("title");i&&f.attr("data-title-text","{{"+i+"}}"),d.push({id:e++,title:h("title"),titleAlt:h("title-alt"),headerTitle:h("header-title"),sortable:h("sortable"),"class":h("header-class"),filter:h("filter"),headerTemplateURL:h("header"),filterData:h("filter-data"),show:f.attr("ng-if")?function(a){return c(f.attr("ng-if"))(a)}:void 0})}}),function(a,b,c,e){a.$columns=d=e.buildColumns(d),e.setupBindingsToInternalScope(c.ngTable),e.loadFilterData(d),e.compileDirectiveTemplates()}):void 0}}}]),b.directive("ngTableDynamic",["$parse",function(){return{restrict:"A",priority:1001,scope:!0,controller:"ngTableController",compile:function(b){var c;return a.forEach(a.element(b.find("tr")),function(b){b=a.element(b),b.hasClass("ng-table-group")||c||(c=b)}),c?(a.forEach(c.find("td"),function(b){var c=a.element(b),d=function(a){return c.attr("x-data-"+a)||c.attr("data-"+a)||c.attr(a)},e=d("title");e||c.attr("data-title-text","{{$columns[$index].titleAlt(this) || $columns[$index].title(this)}}");var f=c.attr("ng-if");f||c.attr("ng-if","$columns[$index].show(this)")}),function(a,b,c,d){var e=d.parseNgTableDynamicExpr(c.ngTableDynamic);d.setupBindingsToInternalScope(e.tableParams),d.compileDirectiveTemplates(),a.$watchCollection(e.columns,function(b){a.$columns=d.buildColumns(b),d.loadFilterData(a.$columns)})}):void 0}}}]),function(){function b(){var a={restrict:"E",replace:!0,templateUrl:"ng-table/filterRow.html",scope:!0,controller:"ngTableFilterRowController"};return a}a.module("ngTable").directive("ngTableFilterRow",b),b.$inject=[]}(),function(){function b(){var a={restrict:"E",replace:!0,templateUrl:"ng-table/sorterRow.html",scope:!0,controller:"ngTableSorterRowController"};return a}a.module("ngTable").directive("ngTableSorterRow",b),b.$inject=[]}(),b.directive("ngTablePagination",["$compile","ngTableEventsChannel",function(b,c){return{restrict:"A",scope:{params:"=ngTablePagination",templateUrl:"="},replace:!1,link:function(d,e){c.onAfterReloadData(function(a){d.pages=a.generatePagesArray()},d,function(a){return a===d.params}),d.$watch("templateUrl",function(c){if(!a.isUndefined(c)){var f=a.element(document.createElement("div"));f.attr({"ng-include":"templateUrl"}),e.append(f),b(f)(d)}})}}}]),a.module("ngTable").run(["$templateCache",function(a){a.put("ng-table/filterRow.html",'<tr ng-show="show_filter" class="ng-table-filters"> <th data-title-text="{{$column.titleAlt(this) || $column.title(this)}}" ng-repeat="$column in $columns" ng-if="$column.show(this)" class="filter"> <div ng-repeat="(name, filter) in $column.filter(this)"> <div ng-include="config.getTemplateUrl(filter)"></div> </div> </th> </tr> '),a.put("ng-table/filters/number.html",'<input type="number" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control"/> '),a.put("ng-table/filters/select-multiple.html",'<select ng-options="data.id as data.title for data in $column.data" ng-disabled="$filterRow.disabled" multiple ng-multiple="true" ng-model="params.filter()[name]" class="filter filter-select-multiple form-control" name="{{name}}"> </select> '),a.put("ng-table/filters/select.html",'<select ng-options="data.id as data.title for data in $column.data" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="filter filter-select form-control" name="{{name}}"> <option style="display:none" value=""></option> </select> '),a.put("ng-table/filters/text.html",'<input type="text" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control"/> '),a.put("ng-table/header.html","<ng-table-sorter-row></ng-table-sorter-row> <ng-table-filter-row></ng-table-filter-row> "),a.put("ng-table/pager.html",'<div class="ng-cloak ng-table-pager" ng-if="params.data.length"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div> '),a.put("ng-table/sorterRow.html",'<tr> <th title="{{$column.headerTitle(this)}}" ng-repeat="$column in $columns" ng-class="{ \'sortable\': $column.sortable(this), \'sort-asc\': params.sorting()[$column.sortable(this)]==\'asc\', \'sort-desc\': params.sorting()[$column.sortable(this)]==\'desc\' }" ng-click="sortBy($column, $event)" ng-if="$column.show(this)" ng-init="template=$column.headerTemplateURL(this)" class="header {{$column.class(this)}}"> <div ng-if="!template" class="ng-table-header" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'div\'}"> <span ng-bind="$column.title(this)" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'span\'}"></span> </div> <div ng-if="template" ng-include="template"></div> </th> </tr> ')}]),b});
//# sourceMappingURL=ng-table.min.js.map










/*! ngTable v0.8.3 by Vitalii Savchuk(esvit666@gmail.com) - https://github.com/esvit/ng-table - New BSD License */ ! function(a, b) {
    "use strict";
    return "function" == typeof define && define.amd ? void define(["angular"], function(a) {
        return b(a)
    }) : b(a)
}(window.angular || null, function(a) {
    "use strict";
    var b = a.module("ngTable", []);
    return function() {
            function b(b) {
                function c(b, c) {
                    var f = b.charAt(0).toUpperCase() + b.substring(1),
                        g = {};
                    return g["on" + f] = d(b), g["publish" + f] = e(b), a.extend(c, g)
                }

                function d(c) {
                    return function(d) {
                        var e = a.identity,
                            g = b;
                        if (2 === arguments.length ? a.isFunction(arguments[1].$new) ? g = arguments[1] : e = arguments[1] : arguments.length > 2 && (g = arguments[1], e = arguments[2]), a.isObject(e)) {
                            var h = e;
                            e = function(a) {
                                return a === h
                            }
                        }
                        return g.$on("ngTable:" + c, function(a, b) {
                            if (!b.isNullInstance) {
                                var c = f(arguments, 2),
                                    g = [b].concat(c);
                                e.apply(this, g) && d.apply(this, g)
                            }
                        })
                    }
                }

                function e(a) {
                    return function() {
                        var c = ["ngTable:" + a].concat(Array.prototype.slice.call(arguments));
                        b.$broadcast.apply(b, c)
                    }
                }

                function f(a, b) {
                    return Array.prototype.slice.call(a, null == b ? 1 : b)
                }
                var g = {};
                return g = c("afterCreated", g), g = c("afterReloadData", g), g = c("datasetChanged", g), g = c("pagesChanged", g)
            }
            a.module("ngTable").factory("ngTableEventsChannel", b), b.$inject = ["$rootScope"]
        }(),
        function() {
            function b() {
                function b() {
                    c()
                }

                function c() {
                    f = g
                }

                function d(b) {
                    var c = a.extend({}, f, b);
                    c.aliasUrls = a.extend({}, f.aliasUrls, b.aliasUrls), f = c
                }

                function e() {
                    function b(a, b) {
                        return -1 !== a.indexOf("/") ? a : e.getUrlForAlias(a, b)
                    }

                    function c(a) {
                        return f.aliasUrls[a] || f.defaultBaseUrl + a + f.defaultExt
                    }
                    var d, e = {
                        config: d,
                        getTemplateUrl: b,
                        getUrlForAlias: c
                    };
                    return Object.defineProperty(e, "config", {
                        get: function() {
                            return d = d || a.copy(f)
                        },
                        enumerable: !0
                    }), e
                }
                var f, g = {
                    defaultBaseUrl: "ng-table/filters/",
                    defaultExt: ".html",
                    aliasUrls: {}
                };
                this.$get = e, this.resetConfigs = c, this.setConfig = d, b(), e.$inject = []
            }
            a.module("ngTable").provider("ngTableFilterConfig", b), b.$inject = []
        }(),
        function() {
            function b() {
                function a(a) {
                    function c(c, d) {
                        if (null == c) return [];
                        var e = d.hasFilter() ? a(b.filterFilterName)(c, d.filter(!0)) : c,
                            f = d.orderBy(),
                            g = f.length ? a(b.sortingFilterName)(e, f) : e,
                            h = g.slice((d.page() - 1) * d.count(), d.page() * d.count());
                        return d.total(g.length), h
                    }
                    return c
                }
                var b = this;
                b.$get = a, b.filterFilterName = "filter", b.sortingFilterName = "orderBy", a.$inject = ["$filter"]
            }
            a.module("ngTable").provider("ngTableDefaultGetData", b), b.$inject = []
        }(),
        function() {
            function b(a) {
                function b(b) {
                    return function() {
                        var c = a.defer(),
                            d = b.apply(this, [c].concat(Array.prototype.slice.call(arguments)));
                        return d || (d = c.promise), d
                    }
                }
                return b
            }
            a.module("ngTable").factory("ngTableGetDataBcShim", b), b.$inject = ["$q"]
        }(), b.value("ngTableDefaults", {
            params: {},
            settings: {}
        }), b.factory("NgTableParams", ["$q", "$log", "ngTableDefaults", "ngTableGetDataBcShim", "ngTableDefaultGetData", "ngTableEventsChannel", function(b, c, d, e, f, g) {
            var h = function(a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                },
                i = function(i, j) {
                    function k() {
                        var a = s.getDataFnAdaptor(s.getData);
                        return b.when(a.call(s, o))
                    }

                    function l() {
                        var a = s.getGroupsFnAdaptor(s.getGroups);
                        return b.when(a.call(s, s.groupBy, o))
                    }

                    function m(a) {
                        var c = s.interceptors || [];
                        return c.reduce(function(a, c) {
                            var d = c.response && c.response.bind(c) || b.when,
                                e = c.responseError && c.responseError.bind(c) || b.reject;
                            return a.then(function(a) {
                                return d(a, o)
                            }, function(a) {
                                return e(a, o)
                            })
                        }, a())
                    }
                    "boolean" == typeof i && (this.isNullInstance = !0);
                    var n, o = this,
                        p = !1,
                        q = function() {
                            s.debugMode && c.debug && c.debug.apply(this, arguments)
                        };
                    this.data = [], this.parameters = function(b, c) {
                        if (c = c || !1, a.isDefined(b)) {
                            for (var d in b) {
                                var e = b[d];
                                if (c && d.indexOf("[") >= 0) {
                                    for (var f = d.split(/\[(.*)\]/).reverse(), g = "", i = 0, j = f.length; j > i; i++) {
                                        var k = f[i];
                                        if ("" !== k) {
                                            var l = e;
                                            e = {}, e[g = k] = h(l) ? parseFloat(l) : l
                                        }
                                    }
                                    "sorting" === g && (r[g] = {}), r[g] = a.extend(r[g] || {}, e[g])
                                } else r[d] = h(b[d]) ? parseFloat(b[d]) : b[d]
                            }
                            return q("ngTable: set parameters", r), this
                        }
                        return r
                    }, this.settings = function(b) {
                        if (a.isDefined(b)) {
                            a.isArray(b.data) && (b.total = b.data.length), b.getData && b.getData.length > 1 && (b.getDataFnAdaptor = e), b.getGroups && b.getGroups.length > 2 && (b.getGroupsFnAdaptor = e);
                            var c = s.data;
                            s = a.extend(s, b);
                            var d = b.hasOwnProperty("data") && b.data != c;
                            return d && (p && this.page(1), p = !1, g.publishDatasetChanged(this, b.data, c)), q("ngTable: set settings", s), this
                        }
                        return s
                    }, this.page = function(b) {
                        return a.isDefined(b) ? this.parameters({
                            page: b
                        }) : r.page
                    }, this.total = function(b) {
                        return a.isDefined(b) ? this.settings({
                            total: b
                        }) : s.total
                    }, this.count = function(b) {
                        return a.isDefined(b) ? this.parameters({
                            count: b,
                            page: 1
                        }) : r.count
                    }, this.filter = function(b) {
                        if (a.isDefined(b) && a.isObject(b)) return this.parameters({
                            filter: b,
                            page: 1
                        });
                        if (b === !0) {
                            for (var c = Object.keys(r.filter), d = {}, e = 0; e < c.length; e++) {
                                var f = r.filter[c[e]];
                                null != f && "" !== f && (d[c[e]] = f)
                            }
                            return d
                        }
                        return r.filter
                    }, this.sorting = function(b) {
                        if (2 == arguments.length) {
                            var c = {};
                            return c[b] = arguments[1], this.parameters({
                                sorting: c
                            }), this
                        }
                        return a.isDefined(b) ? this.parameters({
                            sorting: b
                        }) : r.sorting
                    }, this.isSortBy = function(b, c) {
                        return void 0 !== c ? a.isDefined(r.sorting[b]) && r.sorting[b] == c : a.isDefined(r.sorting[b])
                    }, this.orderBy = function() {
                        var a = [];
                        for (var b in r.sorting) a.push(("asc" === r.sorting[b] ? "+" : "-") + b);
                        return a
                    }, this.getData = function(a) {
                        return f(this.data, a)
                    }, this.getGroups = function(b) {
                        return k().then(function(c) {
                            var d = {};
                            a.forEach(c, function(c) {
                                var e = a.isFunction(b) ? b(c) : c[b];
                                d[e] = d[e] || {
                                    data: []
                                }, d[e].value = e, d[e].data.push(c)
                            });
                            var e = [];
                            for (var f in d) e.push(d[f]);
                            return q("ngTable: refresh groups", e), e
                        })
                    }, this.generatePagesArray = function(a, b, c, d) {
                        arguments.length || (a = this.page(), b = this.total(), c = this.count());
                        var e, f, g, h, i;
                        if (d = d && 6 > d ? 6 : d, i = [], h = Math.ceil(b / c), h > 1) {
                            i.push({
                                type: "prev",
                                number: Math.max(1, a - 1),
                                active: a > 1
                            }), i.push({
                                type: "first",
                                number: 1,
                                active: a > 1,
                                current: 1 === a
                            }), f = Math.round((s.paginationMaxBlocks - s.paginationMinBlocks) / 2), g = Math.max(2, a - f), e = Math.min(h - 1, a + 2 * f - (a - g)), g = Math.max(2, g - (2 * f - (e - g)));
                            for (var j = g; e >= j;) i.push(j === g && 2 !== j || j === e && j !== h - 1 ? {
                                type: "more",
                                active: !1
                            } : {
                                type: "page",
                                number: j,
                                active: a !== j,
                                current: a === j
                            }), j++;
                            i.push({
                                type: "last",
                                number: h,
                                active: a !== h,
                                current: a === h
                            }), i.push({
                                type: "next",
                                number: Math.min(h, a + 1),
                                active: h > a
                            })
                        }
                        return i
                    }, this.isDataReloadRequired = function() {
                        return !p || !a.equals(r, n)
                    }, this.hasFilter = function() {
                        return Object.keys(this.filter(!0)).length > 0
                    }, this.hasFilterChanges = function() {
                        return !a.equals(r && r.filter, n && n.filter)
                    }, this.url = function(b) {
                        b = b || !1;
                        var c = b ? [] : {};
                        for (var d in r)
                            if (r.hasOwnProperty(d)) {
                                var e = r[d],
                                    f = encodeURIComponent(d);
                                if ("object" == typeof e) {
                                    for (var g in e)
                                        if (!a.isUndefined(e[g]) && "" !== e[g]) {
                                            var h = f + "[" + encodeURIComponent(g) + "]";
                                            b ? c.push(h + "=" + e[g]) : c[h] = e[g]
                                        }
                                } else a.isFunction(e) || a.isUndefined(e) || "" === e || (b ? c.push(f + "=" + encodeURIComponent(e)) : c[f] = encodeURIComponent(e))
                            }
                        return c
                    }, this.reload = function() {
                        var c = this,
                            d = null;
                        s.$loading = !0, n = a.copy(r), p = !0, d = m(s.groupBy ? l : k), q("ngTable: reload data");
                        var e = c.data;
                        return d.then(function(a) {
                            return s.$loading = !1, c.data = a, g.publishAfterReloadData(c, a, e), c.reloadPages(), s.$scope && s.$scope.$emit("ngTableAfterReloadData"), a
                        })["catch"](function(a) {
                            return n = null, p = !1, b.reject(a)
                        })
                    }, this.reloadPages = function() {
                        var b;
                        return function() {
                            var c = b,
                                d = o.generatePagesArray(o.page(), o.total(), o.count());
                            a.equals(c, d) || (b = d, g.publishPagesChanged(this, d, c))
                        }
                    }();
                    var r = {
                        page: 1,
                        count: 1,
                        filter: {},
                        sorting: {},
                        group: {},
                        groupBy: null
                    };
                    a.extend(r, d.params);
                    var s = {
                        $scope: null,
                        $loading: !1,
                        data: null,
                        total: 0,
                        defaultSort: "desc",
                        filterDelay: 750,
                        counts: [10, 25, 50, 100],
                        interceptors: [],
                        paginationMaxBlocks: 11,
                        paginationMinBlocks: 5,
                        sortingIndicator: "span",
                        getDataFnAdaptor: a.identity,
                        getGroupsFnAdaptor: a.identity,
                        getGroups: this.getGroups,
                        getData: this.getData
                    };
                    return this.settings(d.settings), this.settings(j), this.parameters(i, !0), g.publishAfterCreated(this), this
                };
            return i
        }]), b.factory("ngTableParams", ["NgTableParams", function(a) {
            return a
        }]),
        function() {
            function b(a, b) {
                a.config = b
            }
            a.module("ngTable").controller("ngTableFilterRowController", b), b.$inject = ["$scope", "ngTableFilterConfig"]
        }(),
        function() {
            function b(a) {
                function b(b, c) {
                    var d = b.sortable && b.sortable();
                    if (d) {
                        var e = a.params.settings().defaultSort,
                            f = "asc" === e ? "desc" : "asc",
                            g = a.params.sorting() && a.params.sorting()[d] && a.params.sorting()[d] === e,
                            h = c.ctrlKey || c.metaKey ? a.params.sorting() : {};
                        h[d] = g ? f : e, a.params.parameters({
                            sorting: h
                        })
                    }
                }
                a.sortBy = b
            }
            a.module("ngTable").controller("ngTableSorterRowController", b), b.$inject = ["$scope"]
        }(), b.controller("ngTableController", ["$scope", "NgTableParams", "$timeout", "$parse", "$compile", "$attrs", "$element", "ngTableColumn", "ngTableEventsChannel", function(b, c, d, e, f, g, h, i, j) {
            function k(a) {
                if (a) {
                    b.params.settings().$scope = b;
                    var c = b.params;
                    if (c.hasFilterChanges()) {
                        var d = function() {
                            c.page(1), c.reload()
                        };
                        c.settings().filterDelay ? m(d, c.settings().filterDelay) : d()
                    } else c.reload()
                }
            }

            function l() {
                function a(a, c) {
                    a.settings().groupBy ? b.$groups = c : b.$data = c
                }

                function c(a, c) {
                    b.pages = c
                }

                function d(a) {
                    return b.params === a
                }
                j.onAfterReloadData(a, b, d), j.onPagesChanged(c, b, d)
            }
            b.$filterRow = {}, b.$loading = !1, b.hasOwnProperty("params") || (b.params = new c(!0)), b.params.settings().$scope = b;
            var m = function() {
                var a = 0;
                return function(b, c) {
                    d.cancel(a), a = d(b, c)
                }
            }();
            b.$watch("params", function(a, b) {
                a !== b && a && a.reload()
            }, !1), b.$watch("params.isDataReloadRequired()", k), this.compileDirectiveTemplates = function() {
                if (!h.hasClass("ng-table")) {
                    b.templates = {
                        header: g.templateHeader ? g.templateHeader : "ng-table/header.html",
                        pagination: g.templatePagination ? g.templatePagination : "ng-table/pager.html"
                    }, h.addClass("ng-table");
                    var c = null,
                        d = !1;
                    a.forEach(h.children(), function(a) {
                        "THEAD" === a.tagName && (d = !0)
                    }), d || (c = a.element(document.createElement("thead")).attr("ng-include", "templates.header"), h.prepend(c));
                    var e = a.element(document.createElement("div")).attr({
                        "ng-table-pagination": "params",
                        "template-url": "templates.pagination"
                    });
                    h.after(e), c && f(c)(b), f(e)(b)
                }
            }, this.loadFilterData = function(c) {
                a.forEach(c, function(c) {
                    var d;
                    return d = c.filterData(b, {
                        $column: c
                    }), d ? a.isObject(d) && a.isObject(d.promise) ? (delete c.filterData, d.promise.then(function(b) {
                        a.isArray(b) || a.isFunction(b) || a.isObject(b) ? a.isArray(b) && b.unshift({
                            title: "",
                            id: ""
                        }) : b = [], c.data = b
                    })) : c.data = d : void delete c.filterData
                })
            }, this.buildColumns = function(a) {
                return a.map(function(a) {
                    return i.buildColumn(a, b)
                })
            }, this.parseNgTableDynamicExpr = function(a) {
                if (!a || a.indexOf(" with ") > -1) {
                    var b = a.split(/\s+with\s+/);
                    return {
                        tableParams: b[0],
                        columns: b[1]
                    }
                }
                throw new Error("Parse error (expected example: ng-table-dynamic='tableParams with cols')")
            }, this.setupBindingsToInternalScope = function(c) {
                var d = e(c);
                b.$watch(d, function(c) {
                    a.isUndefined(c) || (b.paramsModel = d, b.params = c)
                }, !1), g.showFilter && b.$parent.$watch(g.showFilter, function(a) {
                    b.show_filter = a
                }), g.disableFilter && b.$parent.$watch(g.disableFilter, function(a) {
                    b.$filterRow.disabled = a
                })
            }, l()
        }]), b.factory("ngTableColumn", [function() {
            function b(b, d) {
                var e = Object.create(b);
                for (var f in c) void 0 === e[f] && (e[f] = c[f]), a.isFunction(e[f]) || ! function(a) {
                        e[a] = function() {
                            return b[a]
                        }
                    }(f),
                    function(a) {
                        var c = e[a];
                        e[a] = function() {
                            return 0 === arguments.length ? c.call(b, d) : c.apply(b, arguments)
                        }
                    }(f);
                return e
            }
            var c = {
                "class": function() {
                    return ""
                },
                filter: function() {
                    return !1
                },
                filterData: a.noop,
                headerTemplateURL: function() {
                    return !1
                },
                headerTitle: function() {
                    return ""
                },
                sortable: function() {
                    return !1
                },
                show: function() {
                    return !0
                },
                title: function() {
                    return ""
                },
                titleAlt: function() {
                    return ""
                }
            };
            return {
                buildColumn: b
            }
        }]), b.directive("ngTable", ["$q", "$parse", function(b, c) {
            return {
                restrict: "A",
                priority: 1001,
                scope: !0,
                controller: "ngTableController",
                compile: function(b) {
                    var d = [],
                        e = 0,
                        f = null;
                    return a.forEach(a.element(b.find("tr")), function(b) {
                        b = a.element(b), b.hasClass("ng-table-group") || f || (f = b)
                    }), f ? (a.forEach(f.find("td"), function(b) {
                        var f = a.element(b);
                        if (!f.attr("ignore-cell") || "true" !== f.attr("ignore-cell")) {
                            var g = function(a) {
                                    return f.attr("x-data-" + a) || f.attr("data-" + a) || f.attr(a)
                                },
                                h = function(b) {
                                    var e = g(b);
                                    return e ? function(b, f) {
                                        return c(e)(b, a.extend(f || {}, {
                                            $columns: d
                                        }))
                                    } : void 0
                                },
                                i = g("title-alt") || g("title");
                            i && f.attr("data-title-text", "{{" + i + "}}"), d.push({
                                id: e++,
                                title: h("title"),
                                titleAlt: h("title-alt"),
                                headerTitle: h("header-title"),
                                sortable: h("sortable"),
                                "class": h("header-class"),
                                filter: h("filter"),
                                headerTemplateURL: h("header"),
                                filterData: h("filter-data"),
                                show: f.attr("ng-if") ? function(a) {
                                    return c(f.attr("ng-if"))(a)
                                } : void 0
                            })
                        }
                    }), function(a, b, c, e) {
                        a.$columns = d = e.buildColumns(d), e.setupBindingsToInternalScope(c.ngTable), e.loadFilterData(d), e.compileDirectiveTemplates()
                    }) : void 0
                }
            }
        }]), b.directive("ngTableDynamic", ["$parse", function() {
            return {
                restrict: "A",
                priority: 1001,
                scope: !0,
                controller: "ngTableController",
                compile: function(b) {
                    var c;
                    return a.forEach(a.element(b.find("tr")), function(b) {
                        b = a.element(b), b.hasClass("ng-table-group") || c || (c = b)
                    }), c ? (a.forEach(c.find("td"), function(b) {
                        var c = a.element(b),
                            d = function(a) {
                                return c.attr("x-data-" + a) || c.attr("data-" + a) || c.attr(a)
                            },
                            e = d("title");
                        e || c.attr("data-title-text", "{{$columns[$index].titleAlt(this) || $columns[$index].title(this)}}");
                        var f = c.attr("ng-if");
                        f || c.attr("ng-if", "$columns[$index].show(this)")
                    }), function(a, b, c, d) {
                        var e = d.parseNgTableDynamicExpr(c.ngTableDynamic);
                        d.setupBindingsToInternalScope(e.tableParams), d.compileDirectiveTemplates(), a.$watchCollection(e.columns, function(b) {
                            a.$columns = d.buildColumns(b), d.loadFilterData(a.$columns)
                        })
                    }) : void 0
                }
            }
        }]),
        function() {
            function b() {
                var a = {
                    restrict: "E",
                    replace: !0,
                    templateUrl: "ng-table/filterRow.html",
                    scope: !0,
                    controller: "ngTableFilterRowController"
                };
                return a
            }
            a.module("ngTable").directive("ngTableFilterRow", b), b.$inject = []
        }(),
        function() {
            function b() {
                var a = {
                    restrict: "E",
                    replace: !0,
                    templateUrl: "ng-table/sorterRow.html",
                    scope: !0,
                    controller: "ngTableSorterRowController"
                };
                return a
            }
            a.module("ngTable").directive("ngTableSorterRow", b), b.$inject = []
        }(), b.directive("ngTablePagination", ["$compile", "ngTableEventsChannel", function(b, c) {
            return {
                restrict: "A",
                scope: {
                    params: "=ngTablePagination",
                    templateUrl: "="
                },
                replace: !1,
                link: function(d, e) {
                    c.onAfterReloadData(function(a) {
                        d.pages = a.generatePagesArray()
                    }, d, function(a) {
                        return a === d.params
                    }), d.$watch("templateUrl", function(c) {
                        if (!a.isUndefined(c)) {
                            var f = a.element(document.createElement("div"));
                            f.attr({
                                "ng-include": "templateUrl"
                            }), e.append(f), b(f)(d)
                        }
                    })
                }
            }
        }]), a.module("ngTable").run(["$templateCache", function(a) {
            a.put("ng-table/filterRow.html", '<tr ng-show="show_filter" class="ng-table-filters"> <th data-title-text="{{$column.titleAlt(this) || $column.title(this)}}" ng-repeat="$column in $columns" ng-if="$column.show(this)" class="filter"> <div ng-repeat="(name, filter) in $column.filter(this)"> <div ng-include="config.getTemplateUrl(filter)"></div> </div> </th> </tr> '), a.put("ng-table/filters/number.html", '<input type="number" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control"/> '), a.put("ng-table/filters/select-multiple.html", '<select ng-options="data.id as data.title for data in $column.data" ng-disabled="$filterRow.disabled" multiple ng-multiple="true" ng-model="params.filter()[name]" class="filter filter-select-multiple form-control" name="{{name}}"> </select> '), a.put("ng-table/filters/select.html", '<select ng-options="data.id as data.title for data in $column.data" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="filter filter-select form-control" name="{{name}}"> <option style="display:none" value=""></option> </select> '), a.put("ng-table/filters/text.html", '<input type="text" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control"/> '), a.put("ng-table/header.html", "<ng-table-sorter-row></ng-table-sorter-row> <ng-table-filter-row></ng-table-filter-row> "), a.put("ng-table/pager.html", '<div class="ng-cloak ng-table-pager" ng-if="params.data.length">  <div style="float: right;"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group" style="float: left; margin-top: 20px; margin-right: 20px;"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div> </div> '), a.put("ng-table/sorterRow.html", '<tr> <th title="{{$column.headerTitle(this)}}" ng-repeat="$column in $columns" ng-class="{ \'sortable\': $column.sortable(this), \'sort-asc\': params.sorting()[$column.sortable(this)]==\'asc\', \'sort-desc\': params.sorting()[$column.sortable(this)]==\'desc\' }" ng-click="sortBy($column, $event)" ng-if="$column.show(this)" ng-init="template=$column.headerTemplateURL(this)" class="header {{$column.class(this)}}"> <div ng-if="!template" class="ng-table-header" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'div\'}"> <span ng-bind="$column.title(this)" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'span\'}"></span> </div> <div ng-if="template" ng-include="template"></div> </th> </tr> ')
        }]), b
});
//# sourceMappingURL=ng-table.min.js.map