(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{146:function(e,t,r){e.exports=r(251)},152:function(e,t,r){},251:function(e,t,r){"use strict";r.r(t);r(147);var a=r(141),n=r(55),c=r.n(n),o=r(28),i=r(93),l=r(118),s=r(119),u=r(142),m=r(120),f=r(143),d=r(1),p=r.n(d),b=(r(152),r(90)),g=r(257),h=r(260),v=r(261),x=r(258),E=r(57),k=r(124),w=r.n(k).a.create({baseURL:"https://telegrafme.herokuapp.com/indicator"}),y={fetchOhlcv:function(){return w.get("/binance")}},S=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).state={market:[],chunk:[],base:"BTC",search:"",sort:!1,favorite:[],page:"dashboard"},e._cache=new E.c({defaultHeight:50,fixedWidth:!0}),e._mostRecentWidth=0,e.fetchLocalData=function(){e.localData=JSON.parse(localStorage.getItem("ohlcvData"))},e.fetchAllTickers=Object(i.a)(c.a.mark(function t(){var r,a,n;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.fetchOhlcv();case 2:r=t.sent,a=r.data,n=a.map(function(e){return Object(o.a)({},e,{bg:"white",toggle:!1})}),e.setState({market:n},function(){e.getSocket()});case 6:case"end":return t.stop()}},t,this)})),e.orderBy=function(){e.setState(function(e){return{sort:!e.sort,market:e.sort?e.market.sort(function(e,t){return e.ma.maFourly.percentage-t.ma.maFourly.percentage}):e.market.sort(function(e,t){return t.ma.maFourly.percentage-e.ma.maFourly.percentage})}})},e.saveFavorite=function(){localStorage.setItem("favorite",JSON.stringify(e.state.favorite))},e.getFavorite=function(){var t=JSON.parse(localStorage.getItem("favorite"));e.setState({favorite:t||[]})},e.renderIndicator=function(t){var r=t.index,n=t.key,c=t.style,i=t.parent,l=e.state,s=l.market,u=l.favorite,m=l.page,f=l.search,d=l.base,g=s.filter(function(e){return e.base===d}).filter(function(e){return-1!==[e.id,e.fib.s1.percentage].join("").indexOf(f.toUpperCase())}),h=("dashboard"===m?g:"ma725"===m?s.filter(function(e){return!0===e.ma.maFourly.twentyFiveSeven.cross.up}):"macd"===m?s.filter(function(e){return!0===e.macd.cross.up}):u.map(function(e){return s.find(function(t){return t.id===e})}))[r],v=h.id,x=h.ticker,k=h.rsi,w=k.daily,y=k.fourly,S=h.market.precision,C=h.bg,O=h.toggle,j=h.fib,D=j.s3,F=j.s2,T=j.s1,N=j.p,R=j.r3,B=j.r2,W=j.r1,A=h.ma.maFourly,H=A.ninety,U=A.twentyFiveSeven,J=h.macd;return p.a.createElement(E.b,{cache:e._cache,columnIndex:0,key:n,parent:i,rowIndex:r,width:e._mostRecentWidth},p.a.createElement(b.a,{style:[{borderBottomColor:"black",borderWidth:1,minHeight:60},c],key:n},p.a.createElement(b.a,{style:{flexDirection:"row",justifyContent:"space-between",flex:1}},p.a.createElement(I,{text:v,onPress:function(){return e.setState(function(e){return{favorite:"dashboard"===m?[].concat(Object(a.a)(e.favorite),[v]):e.favorite.filter(function(e){return e!==v})}},function(){e.saveFavorite()})}}),p.a.createElement(I,{text:P(x.last,S.price),backgroundColor:C,bold:!0,onPress:function(){return e.setState(function(e){return{market:e.market.map(function(e){return e.id===v?Object(o.a)({},e,{toggle:!e.toggle}):Object(o.a)({},e)})}})}}),p.a.createElement(I,{text:Number(x.percentage).toFixed(2),percentage:!0,backgroundColor:x.percentage>0?"#42f474":x.percentage<0?"#f44141":"white"}),p.a.createElement(I,{text:P(y.lastRSI,2),backgroundColor:y.lastRSI<25?"#42f474":"white"}),p.a.createElement(I,{text:P(w.lastRSI,2),backgroundColor:w.lastRSI<25?"#42f474":"white"}),p.a.createElement(I,{text:T.percentage,percentage:!0,backgroundColor:T.percentage<1?"#42f474":"white"}),p.a.createElement(I,{text:H.percentage,percentage:!0,backgroundColor:x.last>H.price?"#42f474":"#f44141"}),p.a.createElement(I,{text:U.percentage.last,percentage:!0,backgroundColor:U.cross.up?"#42f474":U.cross.down?"#f44141":"white"}),p.a.createElement(I,{text:J.percentage.last,percentage:!0,backgroundColor:J.cross.up?"#42f474":J.cross.down?"#f44141":"white"})),O&&p.a.createElement(b.a,{style:{flex:1,minHeight:40}},p.a.createElement(b.a,{style:{flexDirection:"row",flex:1,justifyContent:"space-around"}},p.a.createElement(I,{bold:!0,text:"R3"}),p.a.createElement(I,{bold:!0,text:"R2"}),p.a.createElement(I,{bold:!0,text:"R1"}),p.a.createElement(I,{bold:!0,text:"P"}),p.a.createElement(I,{bold:!0,text:"S1"}),p.a.createElement(I,{bold:!0,text:"S2"}),p.a.createElement(I,{bold:!0,text:"S3"})),p.a.createElement(b.a,{style:{flexDirection:"row",flex:1,justifyContent:"space-around"}},p.a.createElement(I,{text:P(R.price,S.price)}),p.a.createElement(I,{text:P(B.price,S.price)}),p.a.createElement(I,{text:P(W.price,S.price)}),p.a.createElement(I,{text:P(N.price,S.price)}),p.a.createElement(I,{text:P(T.price,S.price)}),p.a.createElement(I,{text:P(F.price,S.price)}),p.a.createElement(I,{text:P(D.price,S.price)})))))},e.socket=new WebSocket("wss://stream.binance.com:9443/ws/!miniTicker@arr@3000ms"),e}return Object(f.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.fetchAllTickers(),this.interval=setInterval(Object(i.a)(c.a.mark(function t(){var r,a;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.fetchOhlcv();case 2:r=t.sent,a=r.data,e.setState(function(e){return{market:e.market.map(function(e){return Object(o.a)({bg:e.bg,toggle:e.toggle},a.find(function(t){return t.id===e.id}))})}});case 5:case"end":return t.stop()}},t,this)})),6e4),this.getFavorite()}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"getSocket",value:function(){var e=this;this.socket.onmessage=function(t){var r=t.data;e.setState(function(e){return{market:e.market.map(function(e){var t=JSON.parse(r).find(function(t){return t.s===e.id});return Object(o.a)({},e,{ticker:Object(o.a)({},e.ticker,{last:t?Number(t.c):Number(e.ticker.last),percentage:t?j({lastPrice:t.c,openPrice:t.o}):Number(e.ticker.percentage)}),fib:Object(o.a)({},e.fib,{s1:Object(o.a)({},e.fib.s1,{percentage:t?j({lastPrice:t.c,openPrice:e.data.s1}):e.fib.s1.percentage})}),bg:t?Number(t.c)>Number(e.ticker&&e.ticker.last)?"#42f474":Number(t.c)<Number(e.ticker&&e.ticker.last)?"#f44141":"white":e.bg})})}})}}},{key:"render",value:function(){var e=this,t=this.state,r=t.market,a=t.favorite,n=t.page,c=t.search,o=t.base,i=r.filter(function(e){return e.base===o}).filter(function(e){return-1!==[e.id,e.fib.s1.percentage].join("").indexOf(c.toUpperCase())}),l="dashboard"===n?i:"ma725"===n?r.filter(function(e){return!0===e.ma.maFourly.twentyFiveSeven.cross.up}):"macd"===n?r.filter(function(e){return!0===e.macd.cross.up}):a.map(function(e){return r.find(function(t){return t.id===e})});return p.a.createElement(b.a,null,p.a.createElement(b.a,{style:{width:"100%",backgroundColor:"white",borderColor:"black",position:"fixed",left:10,top:0,paddingTop:10,zIndex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-around"}},p.a.createElement(b.a,{style:{flexDirection:"row"}},p.a.createElement(g.a,null,"Base Pair : "),p.a.createElement(h.a,{selectedValue:o,style:{height:30,width:100},onValueChange:function(t){return e.setState({base:t})}},p.a.createElement(h.a.Item,{label:"BTC",value:"BTC"}),p.a.createElement(h.a.Item,{label:"USDT",value:"USDT"}),p.a.createElement(h.a.Item,{label:"TUSD",value:"TUSD"}),p.a.createElement(h.a.Item,{label:"PAX",value:"PAX"}),p.a.createElement(h.a.Item,{label:"ETH",value:"ETH"}))),p.a.createElement(b.a,{style:{flexDirection:"row",alignItems:"center"}},p.a.createElement(g.a,null,"Search :"),p.a.createElement(v.a,{onChange:function(t){var r=t.target.value;return e.setState({search:r})},style:{borderColor:"black",width:150,height:25,borderWidth:1}})),p.a.createElement(I,{text:"ma 7/25 up",onPress:function(){return e.setState({page:"ma725"})}}),p.a.createElement(I,{text:"macd up",onPress:function(){return e.setState({page:"macd"})}}),p.a.createElement(I,{text:"Favorite ".concat(a.length),onPress:function(){return e.setState({page:"favorite"})}}),p.a.createElement(I,{text:"Dashboard",onPress:function(){return e.setState({page:"dashboard"})}})),p.a.createElement(C,{orderBy:this.orderBy}),p.a.createElement(E.a,null,function(t){var r=t.width;return p.a.createElement(E.d,{deferredMeasurementCache:e._cache,style:{marginTop:40},rowCount:l.length,rowRenderer:e.renderIndicator,width:r,height:600,overscanRowCount:1,rowHeight:e._cache.rowHeight})}))}}]),t}(p.a.PureComponent),C=function(e){var t=e.orderBy;return p.a.createElement(b.a,{style:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",top:40,borderColor:"black",backgroundColor:"white",borderWidth:1}},p.a.createElement(I,{bold:!0,text:"Pair"}),p.a.createElement(I,{bold:!0,text:"Last Price"}),p.a.createElement(I,{bold:!0,text:"24h Chg%"}),p.a.createElement(I,{bold:!0,text:"RSI 4H"}),p.a.createElement(I,{bold:!0,text:"RSI 1D"}),p.a.createElement(I,{bold:!0,text:"S1%"}),p.a.createElement(I,{bold:!0,text:"MA90%",onPress:function(){return t()}}),p.a.createElement(I,{bold:!0,text:"(MA7/25)%"}),p.a.createElement(I,{bold:!0,text:"MACD%"}))},I=function(e){var t=e.text,r=e.percentage,a=e.bold,n=e.backgroundColor,c=e.onPress;return p.a.createElement(x.a,{style:{width:"6.0%",alignItems:"center",backgroundColor:n,justifyContent:"center"},onPress:c},p.a.createElement(g.a,{style:{fontWeight:a?"bold":"normal"}},t," ",r?"%":""))},O=S,j=function(e){var t=e.lastPrice,r=e.openPrice;return((D(t)-D(r))/D(r)*100).toFixed(2)},P=function(e,t){return Number(e).toFixed(t)},D=function(e){return Number(e)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var F=r(259);r(249);F.a.registerComponent("App",function(){return O}),F.a.runApplication("App",{initialProps:{},rootTag:document.getElementById("root")}),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[146,2,1]]]);
//# sourceMappingURL=main.42737d23.chunk.js.map