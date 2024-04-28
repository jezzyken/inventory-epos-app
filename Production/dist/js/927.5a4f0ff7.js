"use strict";(self["webpackChunkvue2"]=self["webpackChunkvue2"]||[]).push([[927],{9302:function(e,t,s){s.r(t),s.d(t,{default:function(){return y}});var a=s(7314),i=s(1484),l=s(2938),d=s(4414),n=s(3449),o=s(4245),r=s(9991),c=s(9483),m=s(2756),u=s(1034),I=s(7112),h=s(198),p=s(2367),x=function(){var e=this,t=e._self._c;return t(n.A,[t(o.A,{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.desserts,"sort-by":"calories"},scopedSlots:e._u([{key:"top",fn:function(){return[t(h.A,{attrs:{flat:""}},[t(p.sw,[e._v("Supplier")]),t(c.A,{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),t(u.A),t(r.A,{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:i}){return[t(a.A,e._g(e._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",i,!1),s),[e._v(" Add ")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[t(i.A,[t(l.ri,[t("span",{staticClass:"text-h5"},[e._v(e._s(e.formTitle))])]),t(l.OQ,[t(n.A,[t(m.A,[t(d.A,{attrs:{cols:"12"}},[t(I.A,{attrs:{label:"Name"},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})],1)],1),t(m.A,[t(d.A,{attrs:{cols:"12"}},[t(I.A,{attrs:{label:"Company"},model:{value:e.editedItem.company,callback:function(t){e.$set(e.editedItem,"company",t)},expression:"editedItem.company"}})],1)],1),t(m.A,[t(d.A,{attrs:{cols:"12"}},[t(I.A,{attrs:{label:"Email"},model:{value:e.editedItem.email,callback:function(t){e.$set(e.editedItem,"email",t)},expression:"editedItem.email"}})],1)],1),t(m.A,[t(d.A,{attrs:{cols:"12"}},[t(I.A,{attrs:{label:"Contact No"},model:{value:e.editedItem.contactNo,callback:function(t){e.$set(e.editedItem,"contactNo",t)},expression:"editedItem.contactNo"}})],1)],1),t(m.A,[t(d.A,{attrs:{cols:"12"}},[t(I.A,{attrs:{label:"Address"},model:{value:e.editedItem.address,callback:function(t){e.$set(e.editedItem,"address",t)},expression:"editedItem.address"}})],1)],1)],1)],1),t(l.SL,[t(u.A),t(a.A,{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v(" Cancel ")]),t(a.A,{attrs:{color:"blue darken-1",text:""},on:{click:e.save}},[e._v(" Save ")])],1)],1)],1),t(r.A,{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[t(i.A,[t(l.ri,{staticClass:"text-h5"},[e._v("Are you sure you want to delete this item?")]),t(l.SL,[t(u.A),t(a.A,{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v("Cancel")]),t(a.A,{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v("OK")]),t(u.A)],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function({item:s}){return[t(a.A,{attrs:{"x-small":"",color:"warning"},on:{click:function(t){return e.editItem(s)}}},[e._v(" edit ")]),t("span",{staticClass:"mr-1"}),t(a.A,{attrs:{"x-small":"",color:"error",dark:""},on:{click:function(t){return e.deleteItem(s)}}},[e._v(" delete ")])]}},{key:"no-data",fn:function(){return[t(a.A,{attrs:{color:"primary"},on:{click:e.initialize}},[e._v(" Reset ")])]},proxy:!0}],null,!0)})],1)},A=[],v=(s(4114),s(5353)),f={data:()=>({dialog:!1,dialogDelete:!1,headers:[{text:"Name",align:"start",sortable:!1,value:"name"},{text:"Company",align:"start",value:"company"},{text:"Email",align:"start",value:"email"},{text:"Contact No",align:"start",value:"contactNo"},{text:"Address",align:"start",value:"address"},{text:"Actions",value:"actions",sortable:!1}],desserts:[],editedIndex:-1,editedItem:{name:"",company:"",email:"",contactNo:"",address:""},defaultItem:{name:"",company:"",email:"",contactNo:"",address:""},itemId:null}),computed:{formTitle(){return-1===this.editedIndex?"New Item":"Edit Item"}},watch:{dialog(e){e||this.close()},dialogDelete(e){e||this.closeDelete()}},created(){this.initialize()},methods:{...(0,v.i0)({getItems:"supplier/getItem",addItem:"supplier/addItem",removeItem:"supplier/deleteItem",updateItem:"supplier/updateItem"}),async initialize(){const e=await this.getItems();console.log(e),this.desserts=e.result},editItem(e){this.editedIndex=this.desserts.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0},deleteItem(e){this.editedIndex=this.desserts.indexOf(e),this.itemId=e._id,this.editedItem=Object.assign({},e),this.dialogDelete=!0},async deleteItemConfirm(){await this.removeItem(this.itemId),this.desserts.splice(this.editedIndex,1),this.closeDelete()},close(){this.dialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},closeDelete(){this.dialogDelete=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},async save(){this.editedIndex>-1?(Object.assign(this.desserts[this.editedIndex],this.editedItem),await this.updateItem(this.editedItem)):(this.desserts.push(this.editedItem),await this.addItem(this.editedItem)),this.close()}}},g=f,k=s(1656),b=(0,k.A)(g,x,A,!1,null,null,null),y=b.exports}}]);
//# sourceMappingURL=927.5a4f0ff7.js.map