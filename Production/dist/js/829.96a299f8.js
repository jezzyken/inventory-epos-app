"use strict";(self["webpackChunkvue2"]=self["webpackChunkvue2"]||[]).push([[829],{648:function(e,t,s){s.r(t),s.d(t,{default:function(){return y}});var i=s(7314),a=s(1484),d=s(2938),l=s(4414),n=s(3449),r=s(4245),o=s(9991),c=s(9483),m=s(2756),h=s(1034),u=s(7112),I=s(198),x=s(2367),f=function(){var e=this,t=e._self._c;return t(n.A,[t(r.A,{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.desserts,"sort-by":"calories"},scopedSlots:e._u([{key:"top",fn:function(){return[t(I.A,{attrs:{flat:""}},[t(x.sw,[e._v("Category")]),t(c.A,{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),t(h.A),t(o.A,{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:a}){return[t(i.A,e._g(e._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",a,!1),s),[e._v(" Add ")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[t(a.A,[t(d.ri,[t("span",{staticClass:"text-h5"},[e._v(e._s(e.formTitle))])]),t(d.OQ,[t(n.A,[t(m.A,[t(l.A,{attrs:{cols:"12"}},[t(u.A,{attrs:{label:"Brand Name"},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})],1)],1)],1)],1),t(d.SL,[t(h.A),t(i.A,{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v(" Cancel ")]),t(i.A,{attrs:{color:"blue darken-1",text:""},on:{click:e.save}},[e._v(" Save ")])],1)],1)],1),t(o.A,{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[t(a.A,[t(d.ri,{staticClass:"text-h5"},[e._v("Are you sure you want to delete this item?")]),t(d.SL,[t(h.A),t(i.A,{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v("Cancel")]),t(i.A,{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("OK")]),t(h.A)],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function({item:s}){return[t(i.A,{attrs:{"x-small":"",color:"warning"},on:{click:function(t){return e.editItem(s)}}},[e._v(" edit ")]),t("span",{staticClass:"mr-1"}),t(i.A,{attrs:{"x-small":"",color:"error",dark:""},on:{click:function(t){return e.deleteItem(s)}}},[e._v(" delete ")])]}},{key:"no-data",fn:function(){return[t(i.A,{attrs:{color:"primary"},on:{click:e.initialize}},[e._v(" Reset ")])]},proxy:!0}],null,!0)})],1)},g=[],v=(s(4114),s(5353)),A={data:()=>({dialog:!1,dialogDelete:!1,headers:[{text:"Brand",align:"start",sortable:!1,value:"name"},{text:"Actions",value:"actions",sortable:!1}],desserts:[],editedIndex:-1,editedItem:{name:""},defaultItem:{name:""},itemId:null}),computed:{formTitle(){return-1===this.editedIndex?"New Item":"Edit Item"}},watch:{dialog(e){e||this.close()},dialogDelete(e){e||this.closeDelete()}},created(){this.initialize()},methods:{...(0,v.i0)({getItems:"category/getItem",addItem:"category/addItem",removeItem:"category/deleteItem",updateItem:"category/updateItem"}),async initialize(){const e=await this.getItems();this.desserts=e.result},editItem(e){this.editedIndex=this.desserts.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0},deleteItem(e){this.editedIndex=this.desserts.indexOf(e),this.itemId=e._id,this.editedItem=Object.assign({},e),this.dialogDelete=!0},async deleteItemConfirm(){await this.removeItem(this.itemId),this.desserts.splice(this.editedIndex,1),this.closeDelete()},close(){this.dialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},closeDelete(){this.dialogDelete=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},async save(){this.editedIndex>-1?(Object.assign(this.desserts[this.editedIndex],this.editedItem),await this.updateItem(this.editedItem)):(this.desserts.push(this.editedItem),await this.addItem(this.editedItem)),this.close()}}},k=A,p=s(1656),b=(0,p.A)(k,f,g,!1,null,null,null),y=b.exports}}]);
//# sourceMappingURL=829.96a299f8.js.map