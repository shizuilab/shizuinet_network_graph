(this.webpackJsonpsymbol_network_graf=this.webpackJsonpsymbol_network_graf||[]).push([[0],{1488:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(778),i=n.n(s),c=(n(819),n(34)),o=n(19),l=n(63),u=n(13),d=n(245),b=n(14),p=n(1490),j=n(788),h=n(1563),x=(n(779),n(1551)),O=n(1549),f=n(1561),v=n(1565),g=n(1566),m=n(1567),y=n(1499),k=n(1568),w=n(1558),S=n(1559),I=n(1560),P=n(81),C=n(780),N=n(64),R=n(1571),F=n(1556),A=n(1570),_=n(1552),E=n(1569),z=n(3);var T=[{selector:"node",style:{"text-valign":"top","text-halign":"center",width:20,height:20,label:"data(label)",shape:"ellipse"}},{selector:"node[isParent]",style:{shape:"star",width:50,height:50,"background-color":"Yellow"}},{selector:"node[isResidents = 'yes']",style:{shape:"round-hexagon",width:50,height:50,"background-image":"data(image)"}},{selector:"edge",style:{width:2,"curve-style":"bezier","target-arrow-shape":"triangle"}}],L=function(e){var t=e.elements,n=e.isProgress,a=e.graphCanvasSize,s=e.getElement;console.log("NetworkGraph");Object(N.a)();var i=r.a.useState("concentric"),c=Object(o.a)(i,2),l=c[0],u=c[1],d={name:l,fit:!0,animate:!0},b=r.a.useState({width:100,height:100}),p=Object(o.a)(b,2),j=p[0],h=p[1];r.a.useEffect((function(){h(a)}),[a]);var x=function(e){var t=e.target.data();s(t)};return 1==n?Object(z.jsx)(v.a,{sx:{mx:"auto",my:"auto",width:"100%"},children:Object(z.jsx)(E.a,{})}):t.length<1?Object(z.jsx)(v.a,{sx:{width:"100%",height:"100%",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center center",backgroundImage:"url(https://drive.google.com/uc?export=view&id=1AXNcvIe5pUIaY1mdftwNgIOCFENO4AQf)"}}):Object(z.jsxs)(w.a,{container:!0,spacing:2,children:[Object(z.jsx)(w.a,{item:!0,xs:12,children:Object(z.jsxs)(A.a,{fullWidth:!0,children:[Object(z.jsx)(R.a,{children:"Grapf Layout Type"}),Object(z.jsxs)(_.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:l,label:"Graph Layout Type",onChange:function(e){u(e.target.value)},children:[Object(z.jsx)(F.a,{value:"random",children:"random"}),Object(z.jsx)(F.a,{value:"circle",children:"circle"}),Object(z.jsx)(F.a,{value:"grid",children:"grid"}),Object(z.jsx)(F.a,{value:"breadthfirst",children:"breadthfirst"}),Object(z.jsx)(F.a,{value:"concentric",children:"concentric"}),Object(z.jsx)(F.a,{value:"cose",children:"cose"})]})]})}),Object(z.jsx)(w.a,{item:!0,xs:12,children:Object(z.jsx)(C.a,{elements:t,stylesheet:T,style:{width:j.width,height:j.height},cy:function(e){e.elements().layout(d).run(),e.on("tap","edge",x),e.on("tap","node",x)}})})]})},M=n(1573),B=n(174),U=n.n(B),G=n(1575),H=n(1550),W=n(1572),D=n(1576);function J(e){return Object(z.jsx)(y.a,{component:"h2",variant:"h6",color:"primary",gutterBottom:!0,children:e.children})}var V=n(80);var X=function(e){var t,n,r,s,i,u,d=e.elementData,b=e.symbolManager,p=(Object(N.a)(),a.useState()),j=Object(o.a)(p,2),h=j[0],x=j[1],O=a.useState(),f=Object(o.a)(O,2),v=(f[0],f[1]),g=a.useState(""),m=Object(o.a)(g,2),y=m[0],k=m[1],w=a.useState(),S=Object(o.a)(w,2),I=(S[0],S[1]),P=a.useState(""),C=Object(o.a)(P,2),R=C[0],F=C[1],A=a.useState(),_=Object(o.a)(A,2),E=_[0],T=_[1],L=a.useState(),B=Object(o.a)(L,2),X=B[0],Y=B[1],Q=a.useState(""),q=Object(o.a)(Q,2),K=q[0],Z=q[1],$="https://symbol-explorer.com/",ee="accounts/";return a.useEffect((function(){var e=function(){var e=Object(l.a)(Object(c.a)().mark((function e(t){var n;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.getMosaicInfo(t);case 2:return n=e.sent,console.log(n),e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t=function(){var t=Object(l.a)(Object(c.a)().mark((function t(n){var a,r,s,i,o,l,u,d;return Object(c.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.getTransaction(n);case 2:if(s=t.sent,console.log(s),x(s),I(null===s||void 0===s||null===(a=s.signer)||void 0===a?void 0:a.address),F(null===s||void 0===s||null===(r=s.signer)||void 0===r?void 0:r.address.address),!((null===s||void 0===s?void 0:s.recipientAddress)instanceof V.NamespaceId)){t.next=19;break}return t.next=10,b.getAddressByNamespace(null===s||void 0===s?void 0:s.recipientAddress);case 10:if(""==(i=t.sent)){t.next=17;break}return t.next=14,b.getAddress(i);case 14:l=t.sent,v(l),k(null!==(o=null===l||void 0===l?void 0:l.plain())&&void 0!==o?o:"");case 17:t.next=21;break;case 19:v(null===s||void 0===s?void 0:s.recipientAddress),k(null!==(u=null===s||void 0===s?void 0:s.recipientAddress.plain())&&void 0!==u?u:"");case 21:if(!(s.mosaics.length>0)){t.next=27;break}return t.next=24,e(s.mosaics[0].id);case 24:d=t.sent,T(s.mosaics[0]),Y(d);case 27:Z(s.message.payload);case 28:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();"edge"==d.type?t(d.label):"node"==d.type&&console.log(d)}),[d]),"node"==d.type?Object(z.jsxs)(a.Fragment,{children:[Object(z.jsx)(J,{children:"\u9078\u629e\u8981\u7d20\u306e\u8a73\u7d30"}),Object(z.jsxs)(W.a,{spacing:2,children:[Object(z.jsxs)(W.a,{direction:"row",children:[Object(z.jsx)(M.a,{id:"outlined-read-only-input",label:"\u30a2\u30c9\u30ec\u30b9",variant:"standard",value:d.label,InputProps:{readOnly:!0}}),Object(z.jsx)(H.a,{title:"ViewExplorer",children:Object(z.jsx)(G.a,{color:"primary",href:$+ee+d.label,target:"_blank",rel:"noopener noreferrer",children:Object(z.jsx)(U.a,{})})})]}),Object(z.jsx)(M.a,{id:"outlined-read-only-input",label:"Name",variant:"standard",value:d.name,InputProps:{readOnly:!0}}),Object(z.jsxs)(W.a,{direction:"row",children:[Object(z.jsx)(M.a,{id:"outlined-read-only-input",label:"Twitter/SNS",variant:"standard",value:d.link,InputProps:{readOnly:!0}}),Object(z.jsx)(H.a,{title:"ViewExplorer",children:Object(z.jsx)(G.a,{color:"primary",href:d.link,target:"_blank",rel:"noopener noreferrer",children:Object(z.jsx)(U.a,{})})})]})]})]}):"edge"==d.type?void 0==h?Object(z.jsx)(a.Fragment,{children:"\u4f55\u3082\u9078\u629e\u3055\u308c\u3066\u307e\u305b\u3093"}):Object(z.jsxs)(a.Fragment,{children:[Object(z.jsx)(J,{children:"\u9078\u629e\u8981\u7d20\u306e\u8a73\u7d30"}),Object(z.jsxs)(W.a,{spacing:2,children:[Object(z.jsxs)(W.a,{direction:"row",children:[Object(z.jsx)(M.a,{id:"outlined-read-only-input",label:"\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u30cf\u30c3\u30b7\u30e5",variant:"standard",value:d.label,InputProps:{readOnly:!0}}),Object(z.jsx)(H.a,{title:"ViewExplorer",children:Object(z.jsx)(G.a,{color:"primary",href:$+"transactions/"+d.label,target:"_blank",rel:"noopener noreferrer",children:Object(z.jsx)(U.a,{})})})]}),Object(z.jsxs)(W.a,{direction:"row",children:[Object(z.jsx)(M.a,{id:"outlined-read-only-input",label:"\u9001\u4fe1\u5148\u30a2\u30c9\u30ec\u30b9",variant:"standard",value:y,InputProps:{readOnly:!0}}),Object(z.jsx)(H.a,{title:"ViewExplorer",children:Object(z.jsx)(G.a,{color:"primary",href:$+ee+y,target:"_blank",rel:"noopener noreferrer",children:Object(z.jsx)(U.a,{})})})]}),Object(z.jsxs)(W.a,{direction:"row",children:[Object(z.jsx)(M.a,{id:"outlined-read-only-input",label:"\u9001\u4fe1\u5143\u30a2\u30c9\u30ec\u30b9",variant:"standard",value:R,InputProps:{readOnly:!0}}),Object(z.jsx)(H.a,{title:"ViewExplorer",children:Object(z.jsx)(G.a,{color:"primary",href:$+ee+R,target:"_blank",rel:"noopener noreferrer",sx:{my:"auto"},children:Object(z.jsx)(U.a,{})})})]}),Object(z.jsxs)(W.a,{direction:"row",children:[Object(z.jsx)(M.a,{id:"outlined-read-only-input",label:"MosaicID",variant:"standard",value:null!==(t=null===X||void 0===X?void 0:X.id.toHex())&&void 0!==t?t:"none",InputProps:{readOnly:!0}}),Object(z.jsx)(H.a,{title:"ViewExplorer",children:Object(z.jsx)(G.a,{color:"primary",href:null!==(n=$+"mosaics/"+(null===X||void 0===X?void 0:X.id.toHex()))&&void 0!==n?n:"error",target:"_blank",rel:"noopener noreferrer",sx:{my:"auto"},children:Object(z.jsx)(U.a,{})})})]}),Object(z.jsx)(M.a,{id:"outlined-read-only-input",label:"Amount",variant:"standard",value:(i=null===E||void 0===E||null===(r=E.amount)||void 0===r?void 0:r.compact(),u=null===X||void 0===X?void 0:X.divisibility,void 0==i?0:void 0==u?i:(i*(0==(null!==u&&void 0!==u?u:0)?1:1/Math.pow(10,u))).toFixed(6)),InputProps:{readOnly:!0,endAdornment:Object(z.jsx)(D.a,{position:"end",children:"6BED913FA20223F8"==(null!==(s=null===X||void 0===X?void 0:X.id.toHex())&&void 0!==s?s:"")&&"XYM"})}}),Object(z.jsx)(M.a,{id:"outlined-read-only-input",label:"Message",multiline:!0,maxRows:3,variant:"standard",value:K,InputProps:{readOnly:!0}})]})]}):Object(z.jsx)(a.Fragment,{})},Y=n(1562),Q=n(1577),q=n(1579),K=n(1578),Z=n(1547),$=n(1548),ee=n(1574),te=n(1541),ne=n(1554),ae=function(e){var t=e.setGraphMode,n=e.setInputProp,r=e.setAggregateOpt,s=e.setPageNumberOpt,i=e.setPageSizeOpt,c=e.setPageLimitOpt;console.log("*** FormDialog() ***");var l=a.useState(!1),u=Object(o.a)(l,2),d=u[0],b=u[1],p=a.useState("Account"),j=Object(o.a)(p,2),h=j[0],x=(j[1],a.useState("")),O=Object(o.a)(x,2),f=O[0],g=O[1],m=a.useState("Symbol Wallet Address"),y=Object(o.a)(m,2),k=y[0],S=(y[1],a.useState(!1)),I=Object(o.a)(S,2),P=I[0],C=(I[1],a.useState(1)),N=Object(o.a)(C,2),E=N[0],T=N[1],L=a.useState(100),B=Object(o.a)(L,2),U=B[0],G=B[1],H=a.useState(1),W=Object(o.a)(H,2),D=W[0],J=W[1],V=a.useState(!0),X=Object(o.a)(V,2),ae=(X[0],X[1],a.useState("visible")),re=Object(o.a)(ae,2),se=re[0],ie=(re[1],"pageNumber"),ce="pageSize",oe="pageLimit",le=function(e){switch(e.target.name){case ie:T(Number(e.target.value));break;case ce:G(Number(e.target.value));break;case oe:J(Number(e.target.value))}};return a.useEffect((function(){b(!0)}),[]),Object(z.jsxs)("div",{children:[Object(z.jsx)(Y.a,{variant:"outlined",onClick:function(){b(!0)},children:"ChangeSetting"}),Object(z.jsxs)(Q.a,{open:d,onClose:function(){},children:[Object(z.jsx)(Z.a,{children:"Symbol Network Graph"}),Object(z.jsxs)(K.a,{children:[Object(z.jsxs)(v.a,{sx:{p:1},children:[Object(z.jsx)(te.a,{component:"legend",children:k}),Object(z.jsx)(M.a,{autoFocus:!0,required:!0,id:"outlined-required",label:"Required",margin:"dense",fullWidth:!0,value:f,onChange:function(e){g(e.target.value)}}),Object(z.jsx)(Y.a,{variant:"text",onClick:function(e){g("NCAY26LEBPOXM7NPCNV4HL4EH5WM6UJ5UUN4UGA")},children:"Set Sample Address"})]}),Object(z.jsx)($.a,{variant:"middle"}),Object(z.jsx)(v.a,{sx:{p:1,visibility:se},children:Object(z.jsx)(A.a,{component:"fieldset",children:Object(z.jsx)(te.a,{children:"Optional"})})}),Object(z.jsxs)(v.a,{sx:{p:1,visibility:se},children:[Object(z.jsxs)(w.a,{container:!0,spacing:3,children:[Object(z.jsx)(w.a,{item:!0,xs:4,children:Object(z.jsxs)(A.a,{variant:"standard",sx:{m:1,minWidth:120},children:[Object(z.jsx)(R.a,{id:"demo-simple-select-label",children:"PageNum"}),Object(z.jsxs)(_.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:E.toString(),label:"PageNumber",onChange:le,name:ie,children:[Object(z.jsx)(F.a,{value:1,children:"1"}),Object(z.jsx)(F.a,{value:2,children:"2"}),Object(z.jsx)(F.a,{value:3,children:"3"}),Object(z.jsx)(F.a,{value:4,children:"4"}),Object(z.jsx)(F.a,{value:5,children:"5"}),Object(z.jsx)(F.a,{value:6,children:"6"}),Object(z.jsx)(F.a,{value:7,children:"7"}),Object(z.jsx)(F.a,{value:8,children:"8"}),Object(z.jsx)(F.a,{value:9,children:"9"}),Object(z.jsx)(F.a,{value:10,children:"10"})]}),Object(z.jsxs)(ee.a,{children:["read page position",Object(z.jsx)("br",{}),"(Oldest first)"]})]})}),Object(z.jsx)(w.a,{item:!0,xs:4,children:Object(z.jsxs)(A.a,{variant:"standard",sx:{m:1,minWidth:120},children:[Object(z.jsx)(R.a,{id:"demo-simple-select-label",children:"PageSize"}),Object(z.jsxs)(_.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:U.toString(),label:"PageSize",onChange:le,name:ce,children:[Object(z.jsx)(F.a,{value:10,children:"10"}),Object(z.jsx)(F.a,{value:20,children:"20"}),Object(z.jsx)(F.a,{value:50,children:"50"}),Object(z.jsx)(F.a,{value:100,children:"100"})]}),Object(z.jsx)(ee.a,{children:"Number of transactions to include on page"})]})}),Object(z.jsx)(w.a,{item:!0,xs:4,children:Object(z.jsxs)(A.a,{variant:"standard",sx:{m:1,minWidth:120},children:[Object(z.jsx)(R.a,{id:"demo-simple-select-label",children:"PageLimit"}),Object(z.jsxs)(_.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:D.toString(),label:"PageLimit",onChange:le,name:oe,children:[Object(z.jsx)(F.a,{value:1,children:"1"}),Object(z.jsx)(F.a,{value:5,children:"5"}),Object(z.jsx)(F.a,{value:10,children:"10"}),Object(z.jsx)(F.a,{value:50,children:"50"}),Object(z.jsx)(F.a,{value:100,children:"100"})]}),Object(z.jsx)(ee.a,{children:"read page position"})]})})]}),Object(z.jsxs)(ne.a,{severity:"warning",children:["\u6700\u5927\u30da\u30fc\u30b8\u6570\u3092\u5927\u304d\u304f\u3057\u3059\u304e\u308b\u3068\u3001\u691c\u7d22\u306b\u6642\u9593\u304c\u304b\u304b\u308b\u5834\u5408\u304c\u3042\u308a\u307e\u3059\u3002",Object(z.jsx)("br",{}),"(If the maximum number of pages is set too large, the search will take longer)"]})]})]}),Object(z.jsxs)(q.a,{children:[Object(z.jsx)(Y.a,{onClick:function(){b(!1)},children:"Cancel"}),Object(z.jsx)(Y.a,{onClick:function(){console.log("input OK"),t(h),n(f),r(P),s(E),i(U),c(D),b(!1)},disabled:0==f.length,children:"OK"})]})]})]})},re=n(392),se=n(106),ie=n(107),ce=n(789),oe=function(){function e(){Object(se.a)(this,e),this._nodeUrl="https://ik1-432-48199.vs.sakura.ne.jp:3001",this._address="",this._sym=n(80)}return Object(ie.a)(e,[{key:"address",set:function(e){this._address=e}},{key:"init",value:function(){var e=Object(l.a)(Object(c.a)().mark((function e(){return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"makeElementsByRecentTransactions",value:function(){var e=Object(l.a)(Object(c.a)().mark((function e(){var t,n,a,r,s,i,o,l,u,d,b,p,j,h,x,O,f,v,g,m,y,k,w,S,I,P,C,N,R,F,A,_,E,z,T,L,M,B,U=arguments;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=U.length>0&&void 0!==U[0]?U[0]:1,n=U.length>1&&void 0!==U[1]?U[1]:10,a=U.length>2&&void 0!==U[2]?U[2]:5,r=U.length>3&&void 0!==U[3]&&U[3],s=U.length>4?U[4]:void 0,i=U.length>5?U[5]:void 0,o=[],l=[],u=[],d=new Map,b="",p="",j="",h="",x="",d.set(this._address,0),this._address in i&&(O=i[this._address],b=s[O][0],p=s[O][2],j=s[O][1],x="yes"),l.push({data:{id:String(0),label:this._address,isParent:!0,isResidents:x,name:b,image:p,link:j,type:"node"}}),f=1,v=0;case 20:return e.next=22,this.getRecentTransactions(t++,n,v);case 22:if(void 0!=(g=e.sent)){e.next=25;break}return e.abrupt("break",107);case 25:m=g.data,y=Object(re.a)(m),e.prev=27,y.s();case 29:if((k=y.n()).done){e.next=96;break}if(w=k.value,16724!=(S=w.type)){e.next=60;break}if(void 0!=w.transactionInfo&&void 0!=w.signer){e.next=35;break}return e.abrupt("continue",94);case 35:if(I=w.transactionInfo.hash,!(void 0==(P=w.recipientAddress.address)||w.recipientAddress instanceof V.NamespaceId)){e.next=44;break}return e.next=40,this.getAddressByNamespace(w.recipientAddress);case 40:return P=e.sent,e.next=43,this.getNamespaceName(w.recipientAddress);case 43:h=e.sent;case 44:return P in i?(C=i[P],b=s[C][0],p=s[C][2],j=s[C][1],x="yes"):h in i&&(N=i[h],b=s[N][0],p=s[N][2],j=s[N][1],x="yes"),0==d.has(P)&&(d.set(P,f),l.push({data:{id:String(f++),label:P,namespace:h,isResidents:x,name:b,image:p,link:j,type:"node"}})),b="",p="",j="",h="",x="",R=w.signer.address.address,0==d.has(R)&&(R in i&&(F=i[R],b=s[F][0],p=s[F][2],j=s[F][1],x="yes"),d.set(R,f),l.push({data:{id:String(f++),label:R,isResidents:x,name:b,image:p,link:j,type:"node"}})),b="",h="",p="",j="",x="",u.push({data:{source:d.get(R),target:d.get(P),label:I,isParent:!0,type:"edge"}}),e.abrupt("continue",94);case 60:if(16705!=S){e.next=94;break}if(0!=r){e.next=63;break}return e.abrupt("continue",94);case 63:if(void 0!=w.transactionInfo){e.next=65;break}return e.abrupt("continue",94);case 65:if(void 0!=(A=w.transactionInfo.hash)){e.next=68;break}return e.abrupt("continue",94);case 68:return e.next=70,this.getInnerTransactions(A);case 70:_=e.sent,E=Object(re.a)(_),e.prev=72,E.s();case 74:if((z=E.n()).done){e.next=86;break}if(T=z.value,L=w.transactionInfo.hash,M=T.recipientAddress.address,0==d.has(M)&&(d.set(M,f),l.push({data:{id:String(f++),label:M,name:"name",type:"node"}})),void 0!=w.signer){e.next=81;break}return e.abrupt("continue",84);case 81:B=w.signer.address.address,0==d.has(B)&&(d.set(B,f),l.push({data:{id:String(f++),label:B,name:"name",type:"node"}})),u.push({data:{source:d.get(B),target:d.get(M),label:L,type:"edge"}});case 84:e.next=74;break;case 86:e.next=91;break;case 88:e.prev=88,e.t0=e.catch(72),E.e(e.t0);case 91:return e.prev=91,E.f(),e.finish(91);case 94:e.next=29;break;case 96:e.next=101;break;case 98:e.prev=98,e.t1=e.catch(27),y.e(e.t1);case 101:return e.prev=101,y.f(),e.finish(101);case 104:if(!(1==g.isLastPage||t>a)){e.next=106;break}return e.abrupt("break",107);case 106:e.next=20;break;case 107:return console.log("FINISH"),console.log("id = "+f),console.log("total page size = "+(t-1)),o=l.concat(u),e.abrupt("return",o);case 112:case"end":return e.stop()}}),e,this,[[27,98,101,104],[72,88,91,94]])})));return function(){return e.apply(this,arguments)}}()},{key:"getInnerTransactions",value:function(){var e=Object(l.a)(Object(c.a)().mark((function e(t){var n,a,r,s,i,o,l,u;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],a=new V.RepositoryFactoryHttp(this._nodeUrl),r=a.createTransactionRepository(),e.next=5,r.getTransaction(t,this._sym.TransactionGroup.Confirmed).toPromise();case 5:if(void 0!=(s=e.sent)){e.next=8;break}return e.abrupt("return",n);case 8:i=s.innerTransactions,o=Object(re.a)(i),e.prev=10,o.s();case 12:if((l=o.n()).done){e.next=19;break}if(16724==(u=l.value).type){e.next=16;break}return e.abrupt("continue",17);case 16:n.push(u);case 17:e.next=12;break;case 19:e.next=24;break;case 21:e.prev=21,e.t0=e.catch(10),o.e(e.t0);case 24:return e.prev=24,o.f(),e.finish(24);case 27:return e.abrupt("return",n);case 28:case"end":return e.stop()}}),e,this,[[10,21,24,27]])})));return function(t){return e.apply(this,arguments)}}()},{key:"getTransaction",value:function(){var e=Object(l.a)(Object(c.a)().mark((function e(t){var n,a,r;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return[],n=new V.RepositoryFactoryHttp(this._nodeUrl),a=n.createTransactionRepository(),e.next=5,a.getTransaction(t,this._sym.TransactionGroup.Confirmed).toPromise();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getRecentTransactions",value:function(){var e=Object(l.a)(Object(c.a)().mark((function e(t,n,a){var r,s,i,o;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return!1,[],console.log("RecentTransactions"),r=new V.RepositoryFactoryHttp(this._nodeUrl),s=r.createTransactionRepository(),i=V.Address.createFromRawAddress(this._address),e.next=8,s.search({group:this._sym.TransactionGroup.Confirmed,embedded:!0,address:i,pageNumber:t,pageSize:n}).toPromise();case 8:return o=e.sent,e.abrupt("return",o);case 10:case"end":return e.stop()}}),e,this)})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"getAddressByNamespace",value:function(){var e=Object(l.a)(Object(c.a)().mark((function e(t){var n,a,r;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="",a=function(e){for(var t=e.length/2,n=new Uint8Array(t),a=0;a<t;a++){var r=parseInt(e.substr(2*a,2),16);n[a]=r}return n},r=this._nodeUrl+"/namespaces/"+t.id.toHex(),e.next=5,x.a.get(r).then((function(e){var t=e.data.namespace.alias.address;n=Object(ce.a)(a(t),"RFC4648",{padding:!1})})).catch((function(e){console.log("*** error ***"),console.log(e)})).then((function(){return n}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getNamespaceName",value:function(){var e=Object(l.a)(Object(c.a)().mark((function e(t){var n,a,r,s,i,o;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new V.RepositoryFactoryHttp(this._nodeUrl),s=r.createNamespaceRepository(),e.next=4,s.getNamespacesNames([t]).toPromise();case 4:return i=e.sent,o=null!==(n=null===i||void 0===i||null===(a=i.at(0))||void 0===a?void 0:a.name)&&void 0!==n?n:"",e.abrupt("return",o);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getAddress",value:function(){var e=Object(l.a)(Object(c.a)().mark((function e(t){return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V.Address.createFromRawAddress(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getMosaicInfo",value:function(){var e=Object(l.a)(Object(c.a)().mark((function e(t){var n,a,r;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new V.RepositoryFactoryHttp(this._nodeUrl),a=n.createMosaicRepository(),e.next=4,a.getMosaic(t).toPromise();case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getMosaicInfoByStr",value:function(){var e=Object(l.a)(Object(c.a)().mark((function e(t){var n,a,r,s;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new V.MosaicId(t),a=new V.RepositoryFactoryHttp(this._nodeUrl),r=a.createMosaicRepository(),e.next=5,r.getMosaic(n).toPromise();case 5:return s=e.sent,e.abrupt("return",s);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"convertNamespace",value:function(){var e=Object(l.a)(Object(c.a)().mark((function e(){var t,n,a,r,s,i;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=["mitsuo7777","kogee","crypto","yuki","marron","melonsoda","mii","kuchibashi","akamikko","shizuilab","cat","wecanch","symbolblog","kamome","ninelives","poppoppo","usagi","villhell","radio","mash","teria","tokenlive","hanabatake","yurei","kotopapa","pasomi","neluta","eip","onem","nononon","karriz","xrpl","tochio","sy1000mg","cryptobeliever","narikin","matsuoka","bootarou","enako","boceck","katsutarou","yobi","butuyokuman","toshi","farfan","honanem","nonki71","shizuilab","fukurou","n1040","mikun_nem","hainetu","curupo","kyokot"],n=new V.RepositoryFactoryHttp(this._nodeUrl),a=n.createNamespaceRepository(),0,"",r=Object(c.a)().mark((function e(){var t,n;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i[s],n=new V.NamespaceId(t),console.log(t+":"+n.toHex()),e.next=5,a.getNamespace(n).subscribe((function(e){var n;1==e.active&&2==e.alias.type?console.log(t+":"+(null===(n=e.alias.address)||void 0===n?void 0:n.plain())):console.log(t+": not active or no alias")}),(function(e){return console.log(console.log(t+":err"))}));case 5:case"end":return e.stop()}}),e)})),s=0,i=t;case 7:if(!(s<i.length)){e.next=12;break}return e.delegateYield(r(),"t0",9);case 9:s++,e.next=7;break;case 12:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),le=function(){var e=Object(a.useState)([0,0]),t=Object(o.a)(e,2),n=t[0],r=t[1];return Object(a.useLayoutEffect)((function(){var e=function(){r([window.innerWidth,window.innerHeight])};return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),n};function ue(e){return Object(z.jsxs)(y.a,Object(d.a)(Object(d.a)({variant:"body2",color:"text.secondary",align:"center"},e),{},{children:["Copyright \xa9 ",Object(z.jsx)(I.a,{color:"inherit",href:"https://twitter.com/kurikou_XymCity",children:"@kurikou_XymCity"})," ",(new Date).getFullYear(),"."]}))}var de=Object(b.a)(g.a,{shouldForwardProp:function(e){return"open"!==e}})((function(e){var t=e.theme,n=e.open;return Object(d.a)({zIndex:t.zIndex.drawer+1,transition:t.transitions.create(["width","margin"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen})},n&&{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:t.transitions.create(["width","margin"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.enteringScreen})})})),be=(Object(b.a)("div")((function(e){var t=e.theme;return Object(u.a)({position:"relative",borderRadius:t.shape.borderRadius,backgroundColor:Object(p.a)(t.palette.common.white,.15),"&:hover":{backgroundColor:Object(p.a)(t.palette.common.white,.25)},marginLeft:0,width:"100%"},t.breakpoints.up("sm"),{marginLeft:t.spacing(1),width:"auto"})})),Object(b.a)("div")((function(e){return{padding:e.theme.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"}})),Object(b.a)(P.c)((function(e){var t=e.theme;return{color:"inherit","& .MuiInputBase-input":Object(u.a)({padding:t.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(t.spacing(4),")"),transition:t.transitions.create("width"),width:"100%"},t.breakpoints.up("sm"),{width:"25ch","&:focus":{width:"40ch"}})}})),Object(b.a)(f.a,{shouldForwardProp:function(e){return"open"!==e}})((function(e){var t=e.theme,n=e.open;return{"& .MuiDrawer-paper":Object(d.a)({position:"relative",whiteSpace:"nowrap",width:240,transition:t.transitions.create("width",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.enteringScreen}),boxSizing:"border-box"},!n&&Object(u.a)({overflowX:"hidden",transition:t.transitions.create("width",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen}),width:t.spacing(7)},t.breakpoints.up("sm"),{width:t.spacing(9)}))}})),Object(j.a)({typography:{fontSize:12,button:{textTransform:"none"}},palette:{mode:"light",primary:{main:"#4E2C70",contrastText:"#FFFFFF"},background:{default:"#bdbdbd"}}})),pe=a.memo(L),je=a.memo(ae),he=a.memo(X);function xe(){return Oe.apply(this,arguments)}function Oe(){return(Oe=Object(l.a)(Object(c.a)().mark((function e(){var t;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://sheets.googleapis.com/v4/spreadsheets/1FgaTWWvIBk0f0U2aQ08oz69s4SmpJGiRmezlL2Q62nw/values/sheet1?key=AIzaSyBriz6kRinIhG2knJ2LIfEfoDCILECcyBU",e.next=3,x.a.get("https://sheets.googleapis.com/v4/spreadsheets/1FgaTWWvIBk0f0U2aQ08oz69s4SmpJGiRmezlL2Q62nw/values/sheet1?key=AIzaSyBriz6kRinIhG2knJ2LIfEfoDCILECcyBU").then((function(e){t=e.data})).catch((function(e){console.log("*** error ***"),console.log(e)})).then((function(){return console.log("*** \u7d42\u4e86 ***"),t}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function fe(){var e=le(),t=Object(o.a)(e,2),n=t[0],r=t[1],s=a.useState(!1),i=Object(o.a)(s,2),u=i[0],d=(i[1],a.useState("Account")),b=Object(o.a)(d,2),p=b[0],j=b[1],x=a.useState(""),f=Object(o.a)(x,2),g=f[0],I=f[1],P=a.useState(!1),C=Object(o.a)(P,2),N=C[0],R=C[1],F=a.useState(1),A=Object(o.a)(F,2),_=A[0],E=A[1],T=a.useState(100),L=Object(o.a)(T,2),M=L[0],B=L[1],U=a.useState(1),G=Object(o.a)(U,2),H=G[0],W=G[1],D=a.useState(!1),J=Object(o.a)(D,2),V=J[0],X=J[1],Y=a.useState([]),Q=Object(o.a)(Y,2),q=Q[0],K=Q[1],Z=a.useState({width:100,height:100}),$=Object(o.a)(Z,2),ee=$[0],te=$[1],ne=a.useState({}),ae=Object(o.a)(ne,2),re=ae[0],se=ae[1],ie=a.useCallback((function(e){se(e)}),[]),ce=a.useState([]),Oe=Object(o.a)(ce,2),fe=Oe[0],ve=Oe[1],ge=a.useState({}),me=Object(o.a)(ge,2),ye=me[0],ke=me[1],we=a.useState(new oe),Se=Object(o.a)(we,2),Ie=Se[0];Se[1];a.useEffect((function(){function e(){return(e=Object(l.a)(Object(c.a)().mark((function e(){var t,n,a,r;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,xe();case 2:t=e.sent,ve(t.values),n={},a=0;case 6:if(!(a<t.values.length)){e.next=14;break}if(r=t.values[a],0==(s=r[3],/[^\x01-\x7E]/.test(s))&&""!=r[3]){e.next=10;break}return e.abrupt("continue",11);case 10:n[r[3]]=a;case 11:a++,e.next=6;break;case 14:console.log(n),ke(n);case 16:case"end":return e.stop()}var s}),e)})))).apply(this,arguments)}function t(){return(t=Object(l.a)(Object(c.a)().mark((function e(){var t;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Ie.getMosaicInfoByStr("71C8C78201C17DB6");case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}(),function(){t.apply(this,arguments)}()}),[]);var Pe=a.useRef(null);return a.useEffect((function(){if(null!=Pe.current){var e=JSON.parse(JSON.stringify(Pe.current.getBoundingClientRect()));te({width:e.width-32,height:e.height-105})}}),[n,r]),a.useEffect((function(){var e=function(){var e=Object(l.a)(Object(c.a)().mark((function e(t,n,a,r,s){var i;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Account"!=t){e.next=9;break}return X(!0),e.next=4,Ie.makeElementsByRecentTransactions(n,a,r,s,fe,ye);case 4:i=e.sent,X(!1),K(i),e.next=10;break;case 9:console.log("\u30e2\u30b6\u30a4\u30af\u30e2\u30fc\u30c9\uff01");case 10:case"end":return e.stop()}}),e)})));return function(t,n,a,r,s){return e.apply(this,arguments)}}();""!=g&&(Ie.address=g,e(p,_,M,H,N))}),[p,g,_,M,H,N]),Object(z.jsx)(h.a,{theme:be,children:Object(z.jsxs)(v.a,{sx:{display:"flex"},children:[Object(z.jsx)(O.a,{}),Object(z.jsx)(de,{position:"absolute",open:u,children:Object(z.jsxs)(m.a,{sx:{pr:"24px"},children:[Object(z.jsx)(y.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,sx:{flexGrow:1},children:"Symbol Network Graph"}),Object(z.jsx)(S.a,{children:Object(z.jsx)(je,{setGraphMode:j,setInputProp:I,setAggregateOpt:R,setPageNumberOpt:E,setPageSizeOpt:B,setPageLimitOpt:W})})]})}),Object(z.jsxs)(v.a,{component:"main",sx:{backgroundColor:function(e){return"light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[900]},flexGrow:1,height:"100vh",overflow:"auto"},children:[Object(z.jsx)(m.a,{}),Object(z.jsxs)(k.a,{maxWidth:"xl",sx:{mt:2,mb:2},children:[Object(z.jsxs)(w.a,{container:!0,spacing:2,children:[Object(z.jsx)(w.a,{item:!0,xs:10,children:Object(z.jsx)(S.a,{ref:Pe,sx:{p:2,display:"flex",flexDirection:"column",height:900},children:Object(z.jsx)(pe,{elements:q,isProgress:V,graphCanvasSize:ee,getElement:ie})})}),Object(z.jsx)(w.a,{item:!0,xs:2,children:Object(z.jsx)(S.a,{sx:{p:2,display:"flex",flexDirection:"column",height:900},children:Object(z.jsx)(he,{elementData:re,symbolManager:Ie})})})]}),Object(z.jsx)(ue,{sx:{pt:4}})]})]})]})})}function ve(){return Object(z.jsx)(fe,{})}var ge=function(){return Object(z.jsx)(ve,{})},me=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,1583)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),s(e),i(e)}))};i.a.createRoot(document.getElementById("root")).render(Object(z.jsx)(r.a.StrictMode,{children:Object(z.jsx)(ge,{})})),me()},819:function(e,t,n){},882:function(e,t){},884:function(e,t){},896:function(e,t){},898:function(e,t){},923:function(e,t){},925:function(e,t){},926:function(e,t){},931:function(e,t){},933:function(e,t){},952:function(e,t){},964:function(e,t){},967:function(e,t){},970:function(e,t){},997:function(e,t){}},[[1488,1,2]]]);
//# sourceMappingURL=main.a06758c1.chunk.js.map