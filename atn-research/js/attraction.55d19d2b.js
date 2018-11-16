(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["attraction"],{"1ccb":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"echartsMapPaneConnection",staticStyle:{width:"100%",height:"100%"}})},i=[],s=a("2f62"),o={props:["isArrival","center","items","map","large","slider"],data:()=>({chart:null,series:null,option:null}),computed:{...Object(s["c"])(["airport","color","areaColor","effectLines"])},methods:{drawChart2d(t=!1,e=!1,a="usa"){this.series&&!t||(this.series=[{name:this.center.ap,type:"effectScatter",effectType:"glare",coordinateSystem:"geo",rippleEffect:{brushType:"stroke"},label:{normal:{show:!0,position:"right",formatter:"{b}",distance:10}},symbolSize:8,tooltip:{formatter:`{b} - ${this.center.tau}`},data:[{name:this.center.ap,value:[...this.getCoords(this.center.ap),100]}]},..._.map(this.items,(t,e)=>({name:t.ap,type:"effectScatter",coordinateSystem:"geo",rippleEffect:{brushType:"stroke"},label:{normal:{show:!0,position:"right",formatter:"{b}",distance:10}},symbolSize:5,tooltip:{formatter:`{b} - ${t.tau} (${t.ratio}%)`},data:[{name:t.ap,value:[...this.getCoords(t.ap),_.min([_.max([20,t.ratio]),80])]}]})),..._.map(this.items,(t,e)=>({name:t.ap,type:"lines",zlevel:3,symbol:["none","arrow"],symbolSize:6,effect:{...this.effectLines,constantSpeed:15},large:!0,largeThreshold:50,tooltip:{formatter:`{a}{b}{c} - ${t.tau} (${t.ratio}%)`},lineStyle:{width:1.5,curveness:0,opacity:.7},data:this.isArrival?this.convertData(this.center.ap,t.ap):this.convertData(t.ap,this.center.ap)}))]),this.option&&!t||(this.option={textStyle:{fontFamily:"Poppins, sans-serif",fontSize:14,fontWeight:"bold"},title:{text:`${this.center.ap} (total: ${this.center.tau})`,bottom:5,left:5,fontSize:12,textStyle:{color:"#FFFFFF"}},tooltip:{trigger:"item"},geo:{map:a,label:{emphasis:{show:!1}},center:this.getCoords(this.center.ap),roam:!0,zoom:1.6,itemStyle:{normal:{areaColor:this.areaColor,borderColor:"#989898"},emphasis:{areaColor:this.$vuetify.theme.primary}}},series:this.series}),this.chart.setOption(this.option,e)},getCoords(t){const e=_.find(this.airport,e=>e.code===t);return[e.lon,e.lat]},convertData(t,e){const a=e||this.center.ap,r=this.getCoords(a),i=this.getCoords(t);return[{fromName:a,toName:t,coords:[r,i]}]}},watch:{items(t){this.drawChart2d(!0,!0)},large(t){_.delay(this.chart.resize,200)},map(t){this.drawChart2d(!1,!1,t?"world":"usa")}},mounted(){_.delay(()=>{this.chart=echarts.init(this.$refs.echartsMapPaneConnection,"chalk"),this.drawChart2d(!1,!0),window.addEventListener("resize",debounce(this.chart.resize,200))},1)},beforeDestroy(){window.removeEventListener("resize",debounce(this.chart.resize,200))}},n=o,l=a("2877"),c=Object(l["a"])(n,r,i,!1,null,null,null);c.options.__file="MapPane.vue";e["a"]=c.exports},"272b":function(t,e,a){},"7bbb":function(t,e,a){"use strict";var r=a("272b"),i=a.n(r);i.a},f2e5:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-layout",{staticClass:"pa-1",attrs:{row:"",wrap:""}},[a("v-flex",{staticClass:"px-1",attrs:{xs12:""}},[a("v-btn-toggle",{staticClass:"ma-0 pa-0",attrs:{mandatory:""},model:{value:t.index,callback:function(e){t.index=e},expression:"index"}},t._l(t.tooltipItems,function(e,r){return a("v-tooltip",{key:r,attrs:{bottom:"",color:"primary"}},[a("v-btn",{attrs:{slot:"activator",flat:""},slot:"activator"},[t._v("\n          "+t._s(e.title)+"\n        ")]),a("span",[t._v(t._s(e.description))])],1)})),a("v-menu",{attrs:{"offset-y":""}},[a("v-btn",{staticClass:"mx-2",attrs:{slot:"activator",color:"primary",dark:""},slot:"activator"},[t._v("\n        Enlarge\n      ")]),a("v-list",t._l(["Shrink"].concat(t.desArrFull),function(e,r){return a("v-list-tile",{key:r,on:{click:function(e){t.large=r-1}}},[a("v-list-tile-title",[t._v(t._s(e))])],1)}))],1),a("v-menu",{attrs:{"offset-y":""}},[a("v-btn",{staticClass:"mx-0",attrs:{slot:"activator",color:"primary",dark:""},slot:"activator"},[t._v("\n        Top "+t._s(t.slider)+" travels\n      ")]),a("v-list",t._l(t.cut,function(e){return a("v-list-tile",{key:e,on:{click:function(a){t.slider=e}}},[a("v-list-tile-title",[t._v(t._s(e))])],1)}))],1)],1),a("v-flex",{attrs:{xs12:""}},[a("v-layout",{attrs:{row:"",wrap:""}},[t._l(t.items,function(e,r){return[a("v-flex",{key:r,staticClass:"pa-1",style:t.setShow(r),attrs:{xs4:!t.isLarge(r),xs12:t.isLarge(r)}},[a("v-card",{attrs:{dark:""}},[a("app-map-pane",{style:t.largeStyle(r),attrs:{isArrival:1,center:t.getCenter(t.center[r]),items:e,map:t.map,large:t.large,slider:t.slider}})],1)],1)]})],2)],1)],1)},i=[],s=a("2f62"),o=a("1ccb"),n={data:()=>({index:0,cut:10,map:!1,isRelative:!1,large:-1,slider:10,tooltipItems:[{title:"Total",icon:"looks_3",description:"total rankings"},{title:"Direct arrival",icon:"looks_one",description:"airport is the final destination from origins"},{title:"Indirect arrival",icon:"looks_two",description:"airort is the final destination from hubs"}]}),computed:{...Object(s["c"])(["desArr","dataDes"]),...Object(s["b"])(["desArrFull"]),center(){return _.map(this.desArr,t=>_.find(this.dataDes,e=>t===e.ap))},prop(){return["total","stopx","stopy"][this.index]},items(){return _.map(this.center,(t,e)=>_.map(_.slice(t[this.prop],0,this.slider),t=>({ap:t.ap,tau:t.tau,ratio:_.round(t.tau/this.center[e].tau*100,2)})))}},methods:{isLarge(t){return this.large===t},largeStyle(t){return{height:this.isLarge(t)?"calc(100vh - 66px - 56px - 6px)":"calc(50vh - 66px - 2px)"}},setShow(t){return{display:-1===this.large||this.isLarge(t)?"":"none"}},getCenter(t){return{ap:t.ap,tau:t.tau}}},watch:{},created(){},mounted(){},components:{"app-map-pane":o["a"]}},l=n,c=(a("7bbb"),a("2877")),p=Object(c["a"])(l,r,i,!1,null,null,null);p.options.__file="_Attraction.vue";e["default"]=p.exports}}]);