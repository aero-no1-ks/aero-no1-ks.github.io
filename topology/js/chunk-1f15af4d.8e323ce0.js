(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f15af4d"],{"269a":function(e,t){e.exports=function(e,t){var i="function"===typeof e.exports?e.exports.extendOptions:e.options;for(var a in"function"===typeof e.exports&&(i.directives=e.exports.options.directives),i.directives=i.directives||{},t)i.directives[a]=i.directives[a]||t[a]}},8969:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"resize",rawName:"v-resize",value:e.onResize,expression:"onResize"}],ref:"chart",staticClass:"chartFull"})},n=[];const s=_.times(26,e=>e+1993),o=[492,484,492,523,548,637,597,629,569,553,578,646,687,713,739,701,644,637,643,641,660,684,724,790,842,968],r=[588,577,581,599,606,588,665,686,647,685,707,725,730,709,743,721,706,729,740,748,746,769,796,777,758,808],c=[84,82,86,83,77,89,82,100,94,109,119,151,146,156,160,161,154,220,193,213,231,228,259,289,301,259],l=[64,64,74,70,69,77,96,104,100,74,85,97,92,93,76,81,76,133,81,78,68,54,54,58,52,26],d=[49,58,61,63,68,52,49,45,43,43,36,38,42,38,38,36,35,27,26,23,23,24,20,20,21,20],p={fontWeight:500,fontSize:15},m={alignWithLabel:1,interval:0},h={type:"category",name:"YEAR",nameTextStyle:p,axisTick:m,nameLocation:"center",nameGap:23,data:s},u={width:3,opacity:1},y={shadowBlur:1,shadowColor:"rgba(0, 0, 0, 0.2)"},x={barBorderRadius:[3,3,0,0],shadowBlur:1,shadowColor:"rgba(0, 0, 0, 0.2)"},f={backgroundColor:"white",tooltip:{trigger:"axis",axisPointer:{type:"shadow",label:{precision:0}}},legend:{y:0,x:80,itemGap:20},grid:{containLabel:!0,x:25,x2:25,y:25,y2:25},xAxis:h,yAxis:[{type:"value",name:"VOLUME (*1000)",nameLocation:"center",nameGap:40,splitArea:{show:0},nameTextStyle:p,max:2100},{type:"value",name:"NUMBER OF AIRLINES",nameLocation:"center",nameGap:30,splitArea:{show:0},nameTextStyle:p,position:"right",splitLine:{show:0}}],series:[{name:"NUMBER OF AIRLINES",type:"line",data:d,xAxisIndex:0,yAxisIndex:1,symbolSize:8,lineStyle:u},{name:"DIRECT (MAJOR)",type:"bar",stack:3,data:o,itemStyle:y},{name:"INDIRECT (MAJOR)",type:"bar",stack:3,data:r,itemStyle:y},{name:"DIRECT (MINOR)",type:"bar",stack:3,data:c,itemStyle:y},{name:"INDIRECT (MINOR)",type:"bar",stack:3,data:l,itemStyle2:x}]};var v={data:()=>({chart:null}),methods:{onResize(){this.chart&&_.debounce(this.chart.resize,200)()}},mounted(){this.chart=echarts.init(this.$refs.chart,"macarons2"),this.chart.setOption(f)},beforeDestroy(){this.chart.dispose()}},R=v,w=i("2877"),b=i("269a"),z=i.n(b),I=i("dc22"),E=Object(w["a"])(R,a,n,!1,null,null,null);t["default"]=E.exports;z()(E,{Resize:I["a"]})},dc22:function(e,t,i){"use strict";function a(e,t){const i=t.value,a=t.options||{passive:!0};window.addEventListener("resize",i,a),e._onResize={callback:i,options:a},t.modifiers&&t.modifiers.quiet||i()}function n(e){if(!e._onResize)return;const{callback:t,options:i}=e._onResize;window.removeEventListener("resize",t,i),delete e._onResize}const s={inserted:a,unbind:n};t["a"]=s}}]);