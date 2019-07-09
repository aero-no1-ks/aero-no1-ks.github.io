(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["view-subs-papers-Card"],{"2bb5":function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"ppCard"},[i("v-card",{staticClass:"cursor pa-1",attrs:{hover:t.$vuetify.breakpoint.smAndUp}},[i("v-card-title",{staticClass:"pa-2 ma-1",attrs:{"primary-title":""}},[i("div",[i("p",{staticClass:"mt-0 mb-1 grey--text text--darken-1 subheading"},[t._v(t._s(t.info.author))]),i("p",{staticClass:"b600 mb-2 primary--text",staticStyle:{"font-size":"18px"}},[t._v("\n          "+t._s(t.info.title)+"\n        ")]),i("p",{staticClass:"my-1 grey--text text--darken-2 b600",staticStyle:{"font-size":"15px"}},[t._v(t._s(t.info.where))]),i("p",{staticClass:"my-1 grey--text text--darken-2"},[t._v("Vol. "+t._s(t.info.vol)+","+t._s(t.info.no?" No. "+t.info.no+",":"")+" pp. "+t._s(t.info.pp)+", "+t._s(t.info.year)+".")]),i("p",{staticClass:"mt-2 mb-2 pb-1 caption text-weight-light grey--text text--darken-2"},[i("span",[t._v("DOI: "+t._s(t.info.doi)+".")]),t.info.cited?i("span",{staticClass:"ml-2"},[t._v("인용: "+t._s(t.info.cited)+"회 (2019년 6월 10일 현재)")]):t._e()]),i("v-divider",{staticClass:"mb-2"}),i("p",{staticClass:"mt-0 mb-2 grey--text text--darken-1 subheading"},[t._v("\n          Abstract\n          "),i("v-btn",{staticClass:"body-1 my-0 b600",attrs:{flat:"",small:"",color:"primary"},on:{click:t.onLangA}},[i("v-icon",{staticClass:"mr-2",attrs:{small:""}},[t._v("fa-language")]),t._v("\n            "+t._s(t.isKRA?"영어":"한글")+"로 보기\n          ")],1)],1),i("v-slide-y-reverse-transition",[t.abs.length>0?i("div",{directives:[{name:"show",rawName:"v-show",value:t.showA,expression:"showA"}]},t._l(t.abs,function(s,a){return i("p",{key:a,staticClass:"my-1 px-1 grey--text text--darken-3",staticStyle:{"font-size":"15px","text-align":"justify","line-height":"1.3","font-family":'"Roboto"'}},[i("v-icon",{staticClass:"caption mr-2",staticStyle:{"vertical-align":"middle"},attrs:{color:"primary"}},[t._v("fa-check")]),t._v(t._s(s)+"\n            ")],1)}),0):t._e()]),i("v-divider",{staticClass:"mt-3 mb-2"}),t.hgt.length>0?[t.hgt.length>0?i("p",{staticClass:"mt-0 mb-2 grey--text text--darken-1 subheading"},[t._v("\n            Highlights\n            "),i("v-btn",{staticClass:"body-1 my-0 b600",attrs:{flat:"",small:"",color:"primary"},on:{click:t.onLangH}},[i("v-icon",{staticClass:"mr-2",attrs:{small:""}},[t._v("fa-language")]),t._v("\n              "+t._s(t.isKRH?"영어":"한글")+"로 보기\n            ")],1)],1):t._e(),i("v-slide-y-reverse-transition",[t.hgt.length>0?i("div",{directives:[{name:"show",rawName:"v-show",value:t.showH,expression:"showH"}]},t._l(t.hgt,function(s,a){return i("p",{key:a,staticClass:"my-1 px-1 grey--text text--darken-3",staticStyle:{"font-size":"15px","text-align":"justify","line-height":"1.3","font-family":'"Roboto"'}},[i("v-icon",{staticClass:"caption mr-2",staticStyle:{"vertical-align":"middle"},attrs:{color:"primary"}},[t._v("fa-check")]),t._v(t._s(s)+"\n              ")],1)}),0):t._e()]),i("v-divider",{staticClass:"mt-3 mb-2"})]:t._e(),i("p",{staticClass:"mt-0 mb-2 grey--text text--darken-1 subheading"},[t._v("\n          Key statements\n          "),i("v-btn",{staticClass:"body-1 my-0 b600",attrs:{flat:"",small:"",color:"primary"},on:{click:t.onLangK}},[i("v-icon",{staticClass:"mr-2",attrs:{small:""}},[t._v("fa-language")]),t._v("\n            "+t._s(t.isKRK?"영어":"한글")+"로 보기\n          ")],1)],1),i("v-slide-y-reverse-transition",[i("div",{directives:[{name:"show",rawName:"v-show",value:t.showK,expression:"showK"}]},t._l(t.key,function(s,a){return i("p",{key:a,staticClass:"my-1 px-1 grey--text text--darken-3",staticStyle:{"font-size":"15px","text-align":"justify","line-height":"1.3","font-family":'"Roboto"'}},[i("v-icon",{staticClass:"caption mr-2",staticStyle:{"vertical-align":"middle"},attrs:{color:"primary"}},[t._v("fa-check")]),t._v(t._s(s)+"\n            ")],1)}),0)])],2)]),i("v-card-actions",{staticClass:"mt-0 pt-0"},[i("v-btn",{attrs:{flat:"",color:"primary"},on:{click:t.onInfo}},[i("v-icon",{staticClass:"body-1 mr-2"},[t._v("fa-binoculars")]),t._v("\n        저널 페이지\n      ")],1),i("v-btn",{attrs:{flat:"",color:"primary"},on:{click:t.onDown}},[i("v-icon",{staticClass:"body-1 mr-2"},[t._v("fa-cloud-download")]),t._v("\n        다운로드 페이지\n      ")],1)],1)],1)],1)},e=[],n={props:["info"],data:()=>({showA:!0,showH:!0,showK:!0,abs:[],hgt:[],key:[],isKRA:!1,isKRH:!1,isKRK:!1}),computed:{ppYesNoD(){return this.$vuetify.breakpoint.mdAndUp},colorClass(){return{"grey--text":this.info.isPain,"text--darken-2":this.info.isPain,"primary--text":!this.info.isPain}}},methods:{onLangA(){this.showA=!1,_.delay(()=>{this.isKRA=!this.isKRA,this.abs=this.isKRA?this.info.abs.kr:this.info.abs.en,this.showA=!0},300)},onLangH(){this.showH=!1,_.delay(()=>{this.isKRH=!this.isKRH,this.hgt=this.isKRH?this.info.hgt.kr:this.info.hgt.en,this.showH=!0},300)},onLangK(){this.showK=!1,_.delay(()=>{this.isKRK=!this.isKRK,this.key=this.isKRK?this.info.key.kr:this.info.key.en,this.showK=!0},300)},onInfo(){window.open(this.info.url)},onDown(){window.open(this.info.down)}},mounted(){this.abs=this.info.abs.en,this.hgt=this.info.hgt.en,this.key=this.info.key.en}},o=n,r=(i("3b68"),i("2877")),l=i("6544"),c=i.n(l),h=i("8336"),v=i("b0af"),d=i("99d9"),m=i("12b2"),p=(i("58db"),i("6a18")),f=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var i=arguments[s];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},y=p["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){return t("hr",{class:f({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:this.$attrs,on:this.$listeners})}}),b=i("132d"),g=i("0789"),u=Object(r["a"])(o,a,e,!1,null,"71467cd5",null);s["default"]=u.exports;c()(u,{VBtn:h["a"],VCard:v["a"],VCardActions:d["a"],VCardTitle:m["a"],VDivider:y,VIcon:b["a"],VSlideYReverseTransition:g["d"]})},"3b68":function(t,s,i){"use strict";var a=i("a907"),e=i.n(a);e.a},"58db":function(t,s,i){},a907:function(t,s,i){}}]);