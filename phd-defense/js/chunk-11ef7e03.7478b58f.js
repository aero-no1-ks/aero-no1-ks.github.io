(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11ef7e03"],{"269a":function(e,t){e.exports=function(e,t){var i="function"===typeof e.exports?e.exports.extendOptions:e.options;for(var s in"function"===typeof e.exports&&(i.directives=e.exports.options.directives),i.directives=i.directives||{},t)i.directives[s]=i.directives[s]||t[s]}},db62:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"resize",rawName:"v-resize",value:e.onResize,expression:"onResize"}],ref:"chart",staticClass:"chartFull"})},n=[];let[o,r,a]=[[],[],1917];while(a<2019)r.push(0),o.push(a++);const c=[1,1,2,3,3,3,5,5,6,11,19,32,37,41,48,48,48,50,51,55,80,98,101,172,189,226,251,268,273,288,305,315,325,334,338,342,345,346,349,352,353,356,360,362,365,366,372,374,377,380,384,386,388,394,397,397,398,402,402,402,402,402,403,404,404,404,405,405,405,406,408,411,411,411,411,411,413,413,413,414,415,415,416,416,417,418,418,419,420,420,421,423,423,424,425,425,425,425,425,425,425,425],[l,p,h]=[.000102127462541126,-.391953213740446,376.06587238426],d=o.map(e=>l*Math.pow(e,2)+p*e+h),u=[1927,1936,1959,1963,1967,1968,1983,1992],f=[1,2,3,4,6,8,9,10],x=[...r];for(let R=0,L=u.length;R<L;R++){const e=o.indexOf(u[R]);for(let t=e,i=o.length;t<i;t++)x[t]+=R?f[R]-f[R-1]:f[R]}const v={tooltip:{trigger:"axis",axisPointer:{type:"cross",lineStyle:{type:"dashed"}}},backgroundColor:"white",xAxis:[{type:"value",axisTick:{show:!1},axisLabel:{show:!1},min:0,max:425}],yAxis:[{type:"value",name:"DEMAND FRACTION",nameLocation:"center",nameGap:25,nameTextStyle:{fontSize:15,fontWeight:600},axisTick:{show:!1},min:0,max:1},{type:"value",position:"right",axisTick:{show:!1},axisLabel:{show:!1},splitLine:{show:!1}}],tooltip:{trigger:"axis",axisPointer:{type:"cross"}},grid:[{containLabel:1,x:25,x2:10,y:10,y2:20}],legend:{show:!0,top:100,right:200,textStyle:{fontWeight:500,fontSize:15},orient:"vertical"},series:[{type:"line",symbolSize:0,data:c.map((e,t)=>[e,d[t]])}]};var w={data:()=>({chart:null}),methods:{onResize(){this.chart&&_.debounce(this.chart.resize,200)()}},mounted(){this.chart=echarts.init(this.$refs.chart,"macarons"),this.chart.setOption(v)},beforeDestroy(){this.chart.dispose()}},m=w,y=i("2877"),z=i("269a"),b=i.n(z),g=i("dc22"),k=Object(y["a"])(m,s,n,!1,null,null,null);t["default"]=k.exports;b()(k,{Resize:g["a"]})},dc22:function(e,t,i){"use strict";function s(e,t){const i=t.value,s=t.options||{passive:!0};window.addEventListener("resize",i,s),e._onResize={callback:i,options:s},t.modifiers&&t.modifiers.quiet||i()}function n(e){if(!e._onResize)return;const{callback:t,options:i}=e._onResize;window.removeEventListener("resize",t,i),delete e._onResize}const o={inserted:s,unbind:n};t["a"]=o}}]);