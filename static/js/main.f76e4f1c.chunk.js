(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{189:function(e,t,a){e.exports=a(455)},195:function(e,t,a){},455:function(e,t,a){"use strict";a.r(t);a(190);var n=a(8),r=a.n(n),c=a(69),o=a(116),l=a(159),i=a(160),s=a(184),u=a(161),m=a(185),d=a(0),h=a.n(d),b=(a(195),a(162)),f=a.n(b),p=a(456),g=a(463),w=a(464),E=a(466),k=a(183),x=a(166),v=a.n(x),y=a(167),C=a.n(y),S=(v()(3),new f.a.binance({proxy:"https://cors-anywhere.herokuapp.com/"}),C.a.create({baseURL:"https://telegrafme.herokuapp.com/indicator/"})),O={fetchOhlcv:function(){return S.get("/binance")}},D=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={market:[],chunk:[],base:"BTC",search:""},e.fetchLocalData=function(){e.localData=JSON.parse(localStorage.getItem("ohlcvData"))},e.fetchAllTickers=Object(o.a)(r.a.mark(function t(){var a,n,o;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O.fetchOhlcv();case 2:a=t.sent,n=a.data,o=n.map(function(e){return Object(c.a)({},e,{id:e.symbol,bg:"white"})}),console.log(o),e.fetchLocalData(),e.setState({market:o},function(){e.getSocket()});case 8:case"end":return t.stop()}},t,this)})),e.fetchOhlcv=Object(o.a)(r.a.mark(function t(){var a,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,O.fetchOhlcv();case 3:a=t.sent,n=a.data,console.log(n),e.getSocket(),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0);case 12:case"end":return t.stop()}},t,this,[[0,9]])})),e.renderIndicator=function(t){var a=t.index,n=t.key,r=t.style,c=e.state.market.filter(function(t){return t.base===e.state.base}).filter(function(t){return-1!==t.id.indexOf(e.state.search.toUpperCase())});return h.a.createElement(p.a,{style:[{flexDirection:"row",justifyContent:"space-between",flex:1},r],key:n},h.a.createElement(T,{text:c[a].symbol&&c[a].symbol}),h.a.createElement(T,{text:Number(!!c[a].ticker&&c[a].ticker.last).toFixed(8),backgroundColor:c[a].bg,bold:!0}),h.a.createElement(T,{text:Number(!!c[a].ticker&&c[a].ticker.percentage).toFixed(2),percentage:!0}),h.a.createElement(T,{text:c[a].data.r3}),h.a.createElement(T,{text:c[a].data.r2}),h.a.createElement(T,{text:c[a].data.r1}),h.a.createElement(T,{text:c[a].data.p}),h.a.createElement(T,{text:c[a].data.s1}),h.a.createElement(T,{text:c[a].data.s2}),h.a.createElement(T,{text:c[a].data.s3}))},e.socket=new WebSocket("wss://stream.binance.com:9443/ws/!miniTicker@arr@3000ms"),e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.fetchLocalData(),this.fetchAllTickers()}},{key:"getSocket",value:function(){var e=this;this.socket.onmessage=function(t){var a=t.data;e.setState(function(e){return{market:e.market.map(function(e){var t=JSON.parse(a).find(function(t){return t.s===e.id});return Object(c.a)({},e,{last:t?Number(t.c):Number(e.last),bg:t?Number(t.c)>Number(e.last)?"#42f474":Number(t.c)<Number(e.last)?"#f44141":"white":e.bg})})}})}}},{key:"render",value:function(){var e=this,t=this.state.market.filter(function(t){return t.base===e.state.base}).filter(function(t){return-1!==t.id.indexOf(e.state.search.toUpperCase())});return h.a.createElement(p.a,null,h.a.createElement(p.a,{style:{width:"100%",backgroundColor:"white",borderColor:"black",position:"fixed",left:10,top:0,paddingTop:10,zIndex:1,flexDirection:"row",alignItems:"center"}},h.a.createElement(g.a,null,"Base Pair : "),h.a.createElement(w.a,{selectedValue:this.state.base,style:{height:30,width:100},onValueChange:function(t,a){return e.setState({base:t})}},h.a.createElement(w.a.Item,{label:"BTC",value:"BTC"}),h.a.createElement(w.a.Item,{label:"USDT",value:"USDT"}),h.a.createElement(w.a.Item,{label:"TUSD",value:"TUSD"}),h.a.createElement(w.a.Item,{label:"PAX",value:"PAX"}),h.a.createElement(w.a.Item,{label:"ETH",value:"ETH"})),h.a.createElement(p.a,{style:{flexDirection:"row",alignItems:"center",width:"20%"}},h.a.createElement(g.a,null,"Pagination : ")),h.a.createElement(g.a,null,"Search :"),h.a.createElement(E.a,{onChange:function(t){var a=t.target.value;return e.setState({search:a})},style:{borderColor:"black",width:100,height:25,borderWidth:1}})),h.a.createElement(I,null),h.a.createElement(k.a,{style:{marginTop:80},rowCount:t.length,rowRenderer:this.renderIndicator,width:window.innerWidth-20,height:window.innerHeight-80,rowHeight:50}))}}]),t}(h.a.PureComponent),I=function(){return h.a.createElement(p.a,{style:{flexDirection:"row",justifyContent:"space-between",width:"100%",alignItems:"center",position:"fixed",top:40,zIndex:1,borderColor:"black",backgroundColor:"white",borderWidth:1}},h.a.createElement(T,{bold:!0,text:"Pair"}),h.a.createElement(T,{bold:!0,text:"Last Price"}),h.a.createElement(T,{bold:!0,text:"24h Chg%"}),h.a.createElement(p.a,{style:{width:"100%"}},h.a.createElement(p.a,{style:{alignContent:"center"}},h.a.createElement(g.a,null," Pivot Fibonnaci Weekly")),h.a.createElement(p.a,{style:{flexDirection:"row",width:"100%"}},h.a.createElement(T,{bold:!0,text:"R3"}),h.a.createElement(T,{bold:!0,text:"R2"}),h.a.createElement(T,{bold:!0,text:"R1"}),h.a.createElement(T,{bold:!0,text:"P"}),h.a.createElement(T,{bold:!0,text:"S1"}),h.a.createElement(T,{bold:!0,text:"S2"}),h.a.createElement(T,{bold:!0,text:"S3"}))))},T=function(e){var t=e.text,a=e.percentage,n=e.bold,r=e.backgroundColor;return h.a.createElement(p.a,{style:{width:"10%",alignItems:"center",backgroundColor:r}},h.a.createElement(g.a,{style:{fontWeight:n?"bold":"normal"}},t," ",a?"%":""))},j=D;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var N=a(465);a(453);N.a.registerComponent("App",function(){return j}),N.a.runApplication("App",{initialProps:{},rootTag:document.getElementById("root")}),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[189,2,1]]]);
//# sourceMappingURL=main.f76e4f1c.chunk.js.map