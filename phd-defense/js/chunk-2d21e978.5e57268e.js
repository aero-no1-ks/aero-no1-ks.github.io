(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21e978"],{d5e6:function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"resize",rawName:"v-resize",value:t.onResize,expression:"onResize"}],ref:"chart",staticClass:"chartFull"})},i=[];r("96b0"),r("8388"),r("e13f");const a=["#37A2DA","#FFCE22","#E062AE","#32C5E9","#67E0E3","#9FE6B8","#ff9f7f","#fb7293","#E690D1","#e7bcf3","#9d96f5","#8378EA","#96BFFF"],s=t=>{const e=Number(t);return e+96<180?e+96:e+96===180?179.99:e+96-360},n=[[-145.2,59.57],[-125.5,46.4],[-125.8,37.3],[-120.1,31.5],[-95.2,27.6],[-84.3,28.6],[-80.34,24.8],[-80.46,28.92],[-79.6,30.8],[-75.9,34.2],[-72.7,39.3],[-67.32,43.68],[-66.94,19.76],[145.62,13.85],[-156.16,21.49]].map(t=>[s(t[0]),t[1]]),l=[[-108.32,20.97],[-88.64,12.25],[-80.21,1.33],[-82.02,-4.33],[-78.61,-12.24],[-72.53,-33.14],[-54.63,-35.82],[-42.77,-24.17],[-34.39,-4.98],[-59.43,11.03],[-70.51,12.44],[-79.44,11.11],[-94.3,19.14],[-86.49,22.61],[-71.74,22.49],[4.47,59.27],[-5.5,51.21],[-9.95,38.74],[2.51,41.07],[33.32,32.56],[129.53,37.93],[125.49,31.58],[123.6,26.32],[115.01,21.57],[122.7,15.33],[138.13,34.26],[141.1,36.02],[151.98,-34.08],[149.04,-38.74],[176.24,-36.35]].map(t=>[s(t[0]),t[1]]),c={type:"effectScatter",coordinateSystem:"geo",symbolSize:10};var h={data:()=>({chart:null}),computed:{WP(){return[{...c,data:n,itemStyle:{color:a[0]},label:{show:!0,formatter:({dataIndex:t})=>t,position:"left",textStyle:{color:"black",fontSize:16,fontWeight:600}}}]},WP2(){return[{...c,data:l,symbolSize:8,itemStyle:{color:"#46C673"},label:{show:!0,formatter:({dataIndex:t})=>t+15,position:"left",textStyle:{color:"black",fontSize:15,fontWeight:600}}}]},lines(){return[]},geo(){return{map:"world",show:!0,zoom:1,roam:!0,silent:!0,itemStyle:{borderWidth:.5,borderColor:"black"},x:0,x2:0,y:0,y2:0}},option(){return{color:a,tooltip:{},geo:this.geo,series:[...this.WP,...this.WP2]}}},methods:{drawChart(){this.chart&&(this.chart.setOption(this.option),this.chart.resize())},onResize(t=100){this.chart&&_.debounce(this.chart.resize,t)()}},mounted(){this.chart=echarts.init(this.$refs.chart),this.drawChart()}},d=h,f=r("2877"),u=r("269a"),m=r.n(u),p=r("dc22"),b=Object(f["a"])(d,o,i,!1,null,null,null);e["default"]=b.exports;m()(b,{Resize:p["a"]})}}]);