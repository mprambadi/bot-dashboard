(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,a){e.exports=a(63)},36:function(e,t,a){},63:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),c=a(5),s=a.n(c),l=(a(34),a(36),a(28)),i=a(13),o=a.n(i),m=a(6),u=a(16),g=a(7),d=a(8),p=a(10),h=a(9),b=a(11),f=a(26),E=a.n(f),k=a(2),y=a.n(k),v=a(12),S=a(3),N=function(e){function t(e){var a;return Object(g.a)(this,t),(a=Object(p.a)(this,Object(h.a)(t).call(this,e))).toggle=a.toggle.bind(Object(v.a)(Object(v.a)(a))),a.state={isOpen:!1},a}return Object(b.a)(t,e),Object(d.a)(t,[{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement(S.j,{color:"light",light:!0,expand:"md"},n.a.createElement(S.k,{href:"/"},"Market Screener"),n.a.createElement(S.l,{onClick:this.toggle}),n.a.createElement(S.b,{isOpen:this.state.isOpen,navbar:!0},n.a.createElement(S.g,{className:"ml-auto",navbar:!0},this.props.children))))}}]),t}(n.a.Component),C=function(e){function t(){return Object(g.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement(S.c,{isOpen:this.props.modal,toggle:this.props.toggle,className:"modal-lg"},n.a.createElement(S.f,{toggle:this.toggle},this.props.item.id),n.a.createElement(S.d,null,this.props.children),n.a.createElement(S.e,null,n.a.createElement(S.a,{color:"primary",onClick:this.props.toggle},"Do Something"),n.a.createElement(S.a,{color:"secondary",onClick:this.props.toggle},"Cancel"))))}}]),t}(n.a.Component),w=E.a.create({baseURL:"https://telegrafme.herokuapp.com/indicator"}),O={fetchOhlcv:function(){return w.get("/binance")}},F=function(e){function t(){var e;return Object(g.a)(this,t),(e=Object(p.a)(this,Object(h.a)(t).call(this))).state={market:[],chunk:[],base:"BTC",search:"",sort:!1,favorite:[],toggle:{ticker:{last:""},rsi:{daily:"",fourly:"",secondHourly:"",fifteen:"",thirty:"",hourly:"",five:""},fib:{s3:"",s2:"",s1:"",p:"",r3:"",r2:"",r1:""},market:{precision:""},id:"",psar:{psarFive:{lastClose:"",prevCLose:"",condition:"",percentage:""},psarFifteen:{lastClose:"",prevCLose:"",condition:"",percentage:""},psarThirty:{lastClose:"",prevCLose:"",condition:"",percentage:""},psarHourly:{lastClose:"",prevCLose:"",condition:"",percentage:""},psarSecondHourly:{lastClose:"",prevCLose:"",condition:"",percentage:""},psarFourly:{lastClose:"",prevCLose:"",condition:"",percentage:""},psarDaily:{lastClose:"",prevCLose:"",condition:"",percentage:""}},ma:{maDaily:{ninety:{price:"",cross:{up:"",down:""},condition:{bearish:"",bullish:""}}},maFourly:{ninety:{price:"",cross:{up:"",down:""},condition:{bearish:"",bullish:""}}},maSecondHourly:{ninety:{price:"",cross:{up:"",down:""},condition:{bearish:"",bullish:""}}},maHourly:{ninety:{price:"",cross:{up:"",down:""},condition:{bearish:"",bullish:""}}},maThirty:{ninety:{price:"",cross:{up:"",down:""},condition:{bearish:"",bullish:""}}},maFifteen:{ninety:{price:"",cross:{up:"",down:""},condition:{bearish:"",bullish:""}}},maFive:{ninety:{price:"",cross:{up:"",down:""},condition:{bearish:"",bullish:""}}}}},modal:!1,page:"dashboard"},e.fetchLocalData=function(){e.localData=JSON.parse(localStorage.getItem("ohlcvData"))},e.fetchAllTickers=Object(u.a)(o.a.mark(function t(){var a,r,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O.fetchOhlcv();case 2:a=t.sent,r=a.data,n=r.map(function(e){return Object(m.a)({},e,{bg:"white"})}),e.setState({market:n},function(){e.getSocket()});case 6:case"end":return t.stop()}},t,this)})),e.togglePressed=function(){e.setState(function(e){return{modal:!e.modal}})},e.orderBy=function(){e.setState(function(e){return{sort:!e.sort,market:e.sort?e.market.sort(function(e,t){return e.ma.maFourly.percentage-t.ma.maFourly.percentage}):e.market.sort(function(e,t){return t.ma.maFourly.percentage-e.ma.maFourly.percentage})}})},e.saveFavorite=function(){localStorage.setItem("favorite",JSON.stringify(e.state.favorite))},e.getFavorite=function(){var t=JSON.parse(localStorage.getItem("favorite"));e.setState({favorite:t||[]})},e.setPage=function(t){e.setState({page:t})},e.socket=new WebSocket("wss://stream.binance.com:9443/ws/!miniTicker@arr@3000ms"),e}return Object(b.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.fetchAllTickers(),this.interval=setInterval(Object(u.a)(o.a.mark(function t(){var a,r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O.fetchOhlcv();case 2:a=t.sent,r=a.data,e.setState(function(e){return{market:e.market.map(function(e,t,a){return Object(m.a)({bg:e.bg,togle:a[0]},r.find(function(t){return t.id===e.id}))})}});case 5:case"end":return t.stop()}},t,this)})),6e4),this.getFavorite()}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"getSocket",value:function(){var e=this;this.socket.onmessage=function(t){var a=t.data;e.setState(function(e){return{market:e.market.map(function(e){var t=JSON.parse(a).find(function(t){return t.s===e.id});return Object(m.a)({},e,{ticker:Object(m.a)({},e.ticker,{last:t?Number(t.c):Number(e.ticker.last),quoteVolume:t?t.q:e.ticker.quoteVolume,percentage:t?R({lastPrice:t.c,openPrice:t.o}):Number(e.ticker.percentage)}),fib:Object(m.a)({},e.fib,{s1:Object(m.a)({},e.fib.s1,{percentage:t?R({lastPrice:t.c,openPrice:e.fib.s1.price}):e.fib.s1.percentage})}),bg:t?Number(t.c)>Number(e.ticker&&e.ticker.last)?"bg-success":Number(t.c)<Number(e.ticker&&e.ticker.last)?"bg-danger":"white":e.bg})})}})}}},{key:"render",value:function(){var e=this,t=this.state,a=t.market,r=t.favorite,c=t.page,s=t.search,i=(t.base,a.filter(function(e){return-1!==[e.id,e.fib.s1.percentage].join("").indexOf(s.toUpperCase())})),o=i;switch(c){case"usdt":o=a.filter(function(e){return"USDT"===e.base});break;case"ma90":o=a.filter(function(e){return!0===e.ma.maFourly.ninety.cross.up});break;case"macd1d":o=a.filter(function(e){return!0===e.macd.macdDaily.cross.up});break;case"macd4h":o=a.filter(function(e){return!0===e.macd.macdFourly.cross.up});break;case"ocCross":o=a.filter(function(e){return!0===e.oc.ocFourly.cross.up});break;case"macd1h":o=a.filter(function(e){return!0===e.macd.macdHourly.cross.up});break;case"macd30":o=a.filter(function(e){return!0===e.macd.macdThirty.cross.up});break;case"macd15":o=a.filter(function(e){return!0===e.macd.macdFifteen.cross.up});break;case"oc":o=a.filter(function(e){return!0===e.oc.conditions.bullish});break;case"favorite":o=r.map(function(e){return a.find(function(t){return t.id===e})});break;default:o=i}var u=this.state.toggle,g=u.rsi,d=g.daily,p=g.fourly,h=g.secondHourly,b=g.fifteen,f=g.thirty,E=g.hourly,k=g.five,v=u.fib,w=v.s3,O=v.s2,F=v.s1,R=v.p,P=v.r3,I=v.r2,A=v.r1,D=u.psar,M=D.psarDaily,H=D.psarFifteen,T=D.psarFive,x=D.psarFourly,L=D.psarHourly,J=D.psarSecondHourly,U=D.psarThirty,B=u.ma;return n.a.createElement("div",null,n.a.createElement(N,null,n.a.createElement(S.h,null,n.a.createElement(S.i,{onClick:function(){return e.setState({page:"dashboard",base:"BTC"})}},"Dashboard ",n.a.createElement("span",{className:"sr-only"},"(current)"))),n.a.createElement(S.h,null,n.a.createElement(S.i,{onClick:function(){return e.setState({page:"usdt"})}},"USDT ",n.a.createElement("span",{className:"sr-only"},"(current)"))),n.a.createElement(S.h,null,n.a.createElement(S.i,{onClick:function(){return e.setState({page:"macd4h"})}},"MACD 4h Up")),n.a.createElement(S.h,null,n.a.createElement(S.i,{onClick:function(){return e.setState({page:"favorite"})}},"Favorite ",this.state.favorite.length)),n.a.createElement(S.h,null,n.a.createElement("form",{className:"form-inline my-2 my-lg-0"},n.a.createElement("input",{className:"form-control mr-sm-2",type:"search",placeholder:"Search","aria-label":"Search",onChange:function(t){var a=t.target.value;return e.setState({search:a})}})))),n.a.createElement("div",{className:"table-responsive"},n.a.createElement("table",{className:"table table-hover mt-2",cellPadding:"10"},n.a.createElement("thead",null,n.a.createElement("tr",{className:" text-center m-2"},n.a.createElement("th",{onClick:function(){return e.setPage("dashboard")}},"Pair"),n.a.createElement("th",null,"Last Price"),n.a.createElement("th",null,"24h Chg"),n.a.createElement("th",null,"Volume"),n.a.createElement("th",null,"S1%"),n.a.createElement("th",{onClick:function(){return e.setPage("ma90")}},"MA90%"),n.a.createElement("th",{onClick:function(){return e.setPage("oc")}},"OC"),n.a.createElement("th",{onClick:function(){return e.setPage("ocCross")}},"OC Cross"),n.a.createElement("th",{onClick:function(){return e.setPage("macd15")}},"MACD15m"),n.a.createElement("th",{onClick:function(){return e.setPage("macd30")}},"MACD30m"),n.a.createElement("th",{onClick:function(){return e.setPage("macd1h")}},"MACD1h"),n.a.createElement("th",{onClick:function(){return e.setPage("macd4h")}},"MACD4h"),n.a.createElement("th",{onClick:function(){return e.setPage("macd1d")}},"MACD1d"))),n.a.createElement("tbody",null,o.map(function(t){var a=t.id,r=t.ticker,s=t.market.precision,i=t.bg,o=t.fib,u=t.ma.maFourly.ninety,g=t.oc.ocFourly,d=t.macd,p=d.macdFifteen,h=d.macdThirty,b=d.macdHourly,f=d.macdFourly,E=d.macdDaily;return n.a.createElement("tr",{key:a,className:" text-center"},n.a.createElement("td",{onClick:function(){return e.setState(function(e){return{favorite:"dashboard"===c?[].concat(Object(l.a)(e.favorite),[a]):e.favorite.filter(function(e){return e!==a})}},function(){e.saveFavorite()})}},a),n.a.createElement("td",{className:y()(i,"m-5"),onClick:function(){return e.setState(function(e){return Object(m.a)({},e,{toggle:t,modal:!0})})}},j(r.last,s.price)),n.a.createElement("td",{className:r.percentage>0?"bg-success":r.percentage<0?"bg-danger":"white"},Number(r.percentage).toFixed(2)," %"),n.a.createElement("td",null,j(r.quoteVolume,2)),n.a.createElement("td",{className:o.s1.percentage<0&&"bg-success"},o.s1.percentage,"%"),n.a.createElement("td",{className:u.cross.up?"bg-success":u.cross.down?"bg-danger":"white"},u.percentage,"%"),n.a.createElement("td",{className:g.conditions.bullish?"bg-success":g.conditions.bearish?"bg-danger":"white"},g.percentage,"%"),n.a.createElement("td",{className:g.cross.up?"bg-success":g.cross.down?"bg-danger":"white"},g.percentage,"%"),n.a.createElement("td",{className:p.cross.up?"bg-success":p.cross.down?"bg-danger":"white"},p.percentage.last),n.a.createElement("td",{className:h.cross.up?"bg-success":h.cross.down?"bg-danger":"white"},h.percentage.last),n.a.createElement("td",{className:b.cross.up?"bg-success":b.cross.down?"bg-danger":"white"},b.percentage.last),n.a.createElement("td",{className:f.cross.up?"bg-success":f.cross.down?"bg-danger":"white"},f.percentage.last),n.a.createElement("td",{className:E.cross.up?"bg-success":E.cross.down?"bg-danger":"white"},E.percentage.last))})))),!!this.state.market.length||n.a.createElement("div",{className:"d-flex justify-content-center"},n.a.createElement("div",{className:"spinner-border",role:"status"},n.a.createElement("span",{className:"sr-only"},"Loading..."))),n.a.createElement(C,{modal:this.state.modal,toggle:this.togglePressed,item:this.state.toggle},n.a.createElement("div",{className:"table-responsive"},n.a.createElement("table",{className:"table"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("td",null,"R3"),n.a.createElement("td",null,"R2"),n.a.createElement("td",null,"R1"),n.a.createElement("td",null,"P"),n.a.createElement("td",null,"S1"),n.a.createElement("td",null,"S2"),n.a.createElement("td",null,"S3"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,j(P.price,this.state.toggle.market.precision.price)),n.a.createElement("td",null,j(I.price,this.state.toggle.market.precision.price)),n.a.createElement("td",null,j(A.price,this.state.toggle.market.precision.price)),n.a.createElement("td",null,j(R.price,this.state.toggle.market.precision.price)),n.a.createElement("td",null,j(F.price,this.state.toggle.market.precision.price)),n.a.createElement("td",null,j(O.price,this.state.toggle.market.precision.price)),n.a.createElement("td",null,j(w.price,this.state.toggle.market.precision.price)))))),n.a.createElement("div",{className:"table-responsive"},n.a.createElement("table",{className:"table"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("td",null,"RSI 5m"),n.a.createElement("td",null,"RSI 15m"),n.a.createElement("td",null,"RSI 30m"),n.a.createElement("td",null,"RSI 1h"),n.a.createElement("td",null,"RSI 2h"),n.a.createElement("td",null,"RSI 4h"),n.a.createElement("td",null,"RSI 1d"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",{className:k.lastRSI<25&&"bg-success"},j(k.lastRSI,2)),n.a.createElement("td",{className:b.lastRSI<25&&"bg-success"},j(b.lastRSI,2)),n.a.createElement("td",{className:f.lastRSI<25&&"bg-success"},j(f.lastRSI,2)),n.a.createElement("td",{className:E.lastRSI<25&&"bg-success"},j(E.lastRSI,2)),n.a.createElement("td",{className:h.lastRSI<25&&"bg-success"},j(h.lastRSI,2)),n.a.createElement("td",{className:p.lastRSI<25&&"bg-success"},j(p.lastRSI,2)),n.a.createElement("td",{className:d.lastRSI<25&&"bg-success"},j(d.lastRSI,2)))))),n.a.createElement("div",{className:"table-responsive"},n.a.createElement("table",{className:"table"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("td",null,"MA90 5m"),n.a.createElement("td",null,"MA90 15m"),n.a.createElement("td",null,"MA90 30m"),n.a.createElement("td",null,"MA90 1h"),n.a.createElement("td",null,"MA90 2h"),n.a.createElement("td",null,"MA90 4h"),n.a.createElement("td",null,"MA90 1d"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",{className:B.maFive.ninety.price<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(B.maFive.ninety.price,this.state.toggle.market.precision.price)),n.a.createElement("td",{className:B.maFifteen.ninety.price<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(B.maFifteen.ninety.price,this.state.toggle.market.precision.price)),n.a.createElement("td",{className:B.maThirty.ninety.price<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(B.maThirty.ninety.price,this.state.toggle.market.precision.price)),n.a.createElement("td",{className:B.maHourly.ninety.price<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(B.maHourly.ninety.price,this.state.toggle.market.precision.price)),n.a.createElement("td",{className:B.maSecondHourly.ninety.price<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(B.maSecondHourly.ninety.price,this.state.toggle.market.precision.price)),n.a.createElement("td",{className:B.maFourly.ninety.price<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(B.maFourly.ninety.price,this.state.toggle.market.precision.price)),n.a.createElement("td",{className:B.maDaily.ninety.price<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(B.maDaily.ninety.price,this.state.toggle.market.precision.price)))))),n.a.createElement("div",{className:"table-responsive"},n.a.createElement("table",{className:"table"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("td",null,"PSAR 5m"),n.a.createElement("td",null,"PSAR 15m"),n.a.createElement("td",null,"PSAR 30m"),n.a.createElement("td",null,"PSAR 1h"),n.a.createElement("td",null,"PSAR 2h"),n.a.createElement("td",null,"PSAR 4h"),n.a.createElement("td",null,"PSAR 1d"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",{className:T.lastClose<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(T.lastClose,this.state.toggle.market.precision.price)),n.a.createElement("td",{className:H.lastClose<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(H.lastClose,this.state.toggle.market.precision.price)),n.a.createElement("td",{className:U.lastClose<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(U.lastClose,this.state.toggle.market.precision.price)),n.a.createElement("td",{className:L.lastClose<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(L.lastClose,this.state.toggle.market.precision.price)),n.a.createElement("td",{className:J.lastClose<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(J.lastClose,this.state.toggle.market.precision.price)),n.a.createElement("td",{className:x.lastClose<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(x.lastClose,this.state.toggle.market.precision.price)),n.a.createElement("td",{className:M.lastClose<this.state.toggle.ticker.last?"bg-success":"bg-danger"},j(M.lastClose,this.state.toggle.market.precision.price))))))))}}]),t}(n.a.PureComponent),R=function(e){var t=e.lastPrice,a=e.openPrice;return((P(t)-P(a))/P(a)*100).toFixed(2)},j=function(e,t){return Number(e).toFixed(t)},P=function(e){return Number(e)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(61);s.a.render(n.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[29,2,1]]]);
//# sourceMappingURL=main.1499c6a1.chunk.js.map