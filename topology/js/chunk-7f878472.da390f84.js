(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f878472"],{"269a":function(e,t){e.exports=function(e,t){var i="function"===typeof e.exports?e.exports.extendOptions:e.options;for(var n in"function"===typeof e.exports&&(i.directives=e.exports.options.directives),i.directives=i.directives||{},t)i.directives[n]=i.directives[n]||t[n]}},dc22:function(e,t,i){"use strict";function n(e,t){const i=t.value,n=t.options||{passive:!0};window.addEventListener("resize",i,n),e._onResize={callback:i,options:n},t.modifiers&&t.modifiers.quiet||i()}function s(e){if(!e._onResize)return;const{callback:t,options:i}=e._onResize;window.removeEventListener("resize",t,i),delete e._onResize}const o={inserted:n,unbind:s};t["a"]=o},fa47:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"resize",rawName:"v-resize",value:e.onResize,expression:"onResize"}],ref:"chart",staticClass:"chartFull"})},s=[];let[o,a,r]=[[],[],1917];while(r<2019)a.push(0),o.push(r++);const[c,p,l]=[.000102127462541126,-.391953213740446,376.06587238426],h=o.map(e=>c*Math.pow(e,2)+p*e+l),u=[1927,1936,1959,1963,1967,1968,1983,1992],d=[1,2,3,4,6,8,9,10],f=[...a];for(let k=0,R=u.length;k<R;k++){const e=o.indexOf(u[k]);for(let t=e,i=o.length;t<i;t++)f[t]+=k?d[k]-d[k-1]:d[k]}const v={backgroundColor:"white",xAxis:[{type:"value",name:"year".toUpperCase(),nameLocation:"center",nameGap:25,nameTextStyle:{fontWeight:600,fontSize:15},axisTick:{show:!1},min:0,max:1}],yAxis:[{type:"value",name:"number of aircraft types".toUpperCase(),nameLocation:"center",nameGap:5,nameTextStyle:{fontSize:15,fontWeight:600},axisTick:{show:!1},axisLabel:{show:!1}},{type:"value",position:"right"}],tooltip:{trigger:"axis",axisPointer:{type:"cross"}},grid:[{containLabel:1,x:25,x2:10,y:10,y2:20}],legend:{show:!0,top:100,right:200,textStyle:{fontWeight:500,fontSize:15},orient:"vertical"},series:[{type:"line",data:f.map((e,t)=>[h[t],e]),symbolSize:0}]};var m={data:()=>({chart:null}),methods:{onResize(){this.chart&&_.debounce(this.chart.resize,200)()}},mounted(){this.chart=echarts.init(this.$refs.chart,"macarons"),this.chart.setOption(v)},beforeDestroy(){this.chart.dispose()}},x=m,w=i("2877"),y=i("269a"),z=i.n(y),b=i("dc22"),g=Object(w["a"])(x,n,s,!1,null,null,null);t["default"]=g.exports;z()(g,{Resize:b["a"]})}}]);