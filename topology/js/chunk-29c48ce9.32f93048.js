(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29c48ce9"],{"269a":function(e,t){e.exports=function(e,t){var i="function"===typeof e.exports?e.exports.extendOptions:e.options;for(var n in"function"===typeof e.exports&&(i.directives=e.exports.options.directives),i.directives=i.directives||{},t)i.directives[n]=i.directives[n]||t[n]}},"2ee2":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"resize",rawName:"v-resize",value:e.onResize,expression:"onResize"}],ref:"chart",staticClass:"chartFull"})},o=[];const s=[462729,541451,604541,717406,839912].map(e=>e/1e3),a=[7619,10319,11972,15614,20196].map(e=>e/1e3),r={color:["#37A2DA","#D24C60"],tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{left:60,y:0},xAxis:{type:"category",data:[2025,2030,2040,2050],name:"year".toUpperCase(),nameLocation:"center",nameGap:25,nameTextStyle:{fontSize:15,fontWeight:600}},yAxis:{name:"demand (*1000)".toUpperCase(),nameLocation:"center",nameGap:35,nameTextStyle:{fontSize:15,fontWeight:600},max:800},grid:{containLabel:!0,x:25,x2:10,y:25,y2:25},series:[{type:"line",name:"core network".toUpperCase(),data:s,label:{show:!0,position:"top",formatter:({value:e})=>e.toString().slice(0,3)+"K"}},{type:"line",name:"sst network".toUpperCase(),data:a,label:{show:!0,position:"top",formatter:({value:e})=>e.toString().slice(0,3)+"K"}}]};var c={data:()=>({chart:null}),methods:{onResize(){this.chart&&_.debounce(this.chart.resize,200)()}},mounted(){this.chart=echarts.init(this.$refs.chart,"macarons"),this.chart.setOption(r)},beforeDestroy(){this.chart.dispose()}},p=c,l=i("2877"),d=i("269a"),u=i.n(d),f=i("dc22"),m=Object(l["a"])(p,n,o,!1,null,null,null);t["default"]=m.exports;u()(m,{Resize:f["a"]})},dc22:function(e,t,i){"use strict";function n(e,t){const i=t.value,n=t.options||{passive:!0};window.addEventListener("resize",i,n),e._onResize={callback:i,options:n},t.modifiers&&t.modifiers.quiet||i()}function o(e){if(!e._onResize)return;const{callback:t,options:i}=e._onResize;window.removeEventListener("resize",t,i),delete e._onResize}const s={inserted:n,unbind:o};t["a"]=s}}]);