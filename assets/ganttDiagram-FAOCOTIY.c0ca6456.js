import{aD as _t,_ as c,aE as U,n as ct,g as oe,h as ce,A as le,B as ue,k as de,i as fe,F as he,v as ke,t as gt,s as pt,aF as me,aG as ye,aH as ge,u as pe,aI as ve,aJ as Te,aK as xe,aL as Rt,aM as Nt,aN as Bt,aO as Gt,aP as Ht,aQ as Xt,aR as Ut,aS as be,o as we,E as _e,aT as De,aU as Se,aV as Ce,aW as Ee,aX as Me,aY as Ie,aZ as Ae}from"./vendor.c2a4d007.js";var jt={exports:{}};(function(t,r){(function(a,i){t.exports=i()})(_t,function(){var a="day";return function(i,n,k){var f=function(E){return E.add(4-E.isoWeekday(),a)},_=n.prototype;_.isoWeekYear=function(){return f(this).year()},_.isoWeek=function(E){if(!this.$utils().u(E))return this.add(7*(E-this.isoWeek()),a);var g,M,O,P,B=f(this),C=(g=this.isoWeekYear(),M=this.$u,O=(M?k.utc:k)().year(g).startOf("year"),P=4-O.isoWeekday(),O.isoWeekday()>4&&(P+=7),O.add(P,a));return B.diff(C,"week")+1},_.isoWeekday=function(E){return this.$utils().u(E)?this.day()||7:this.day(this.day()%7?E:E-7)};var F=_.startOf;_.startOf=function(E,g){var M=this.$utils(),O=!!M.u(g)||g;return M.p(E)==="isoweek"?O?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):F.bind(this)(E,g)}}})})(jt);var Le=jt.exports,qt={exports:{}};(function(t,r){(function(a,i){t.exports=i()})(_t,function(){var a={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},i=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d/,k=/\d\d/,f=/\d\d?/,_=/\d*[^-_:/,()\s\d]+/,F={},E=function(p){return(p=+p)+(p>68?1900:2e3)},g=function(p){return function(S){this[p]=+S}},M=[/[+-]\d\d:?(\d\d)?|Z/,function(p){(this.zone||(this.zone={})).offset=function(S){if(!S||S==="Z")return 0;var L=S.match(/([+-]|\d\d)/g),Y=60*L[1]+(+L[2]||0);return Y===0?0:L[0]==="+"?-Y:Y}(p)}],O=function(p){var S=F[p];return S&&(S.indexOf?S:S.s.concat(S.f))},P=function(p,S){var L,Y=F.meridiem;if(Y){for(var H=1;H<=24;H+=1)if(p.indexOf(Y(H,0,S))>-1){L=H>12;break}}else L=p===(S?"pm":"PM");return L},B={A:[_,function(p){this.afternoon=P(p,!1)}],a:[_,function(p){this.afternoon=P(p,!0)}],Q:[n,function(p){this.month=3*(p-1)+1}],S:[n,function(p){this.milliseconds=100*+p}],SS:[k,function(p){this.milliseconds=10*+p}],SSS:[/\d{3}/,function(p){this.milliseconds=+p}],s:[f,g("seconds")],ss:[f,g("seconds")],m:[f,g("minutes")],mm:[f,g("minutes")],H:[f,g("hours")],h:[f,g("hours")],HH:[f,g("hours")],hh:[f,g("hours")],D:[f,g("day")],DD:[k,g("day")],Do:[_,function(p){var S=F.ordinal,L=p.match(/\d+/);if(this.day=L[0],S)for(var Y=1;Y<=31;Y+=1)S(Y).replace(/\[|\]/g,"")===p&&(this.day=Y)}],w:[f,g("week")],ww:[k,g("week")],M:[f,g("month")],MM:[k,g("month")],MMM:[_,function(p){var S=O("months"),L=(O("monthsShort")||S.map(function(Y){return Y.slice(0,3)})).indexOf(p)+1;if(L<1)throw new Error;this.month=L%12||L}],MMMM:[_,function(p){var S=O("months").indexOf(p)+1;if(S<1)throw new Error;this.month=S%12||S}],Y:[/[+-]?\d+/,g("year")],YY:[k,function(p){this.year=E(p)}],YYYY:[/\d{4}/,g("year")],Z:M,ZZ:M};function C(p){var S,L;S=p,L=F&&F.formats;for(var Y=(p=S.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(x,b,m){var w=m&&m.toUpperCase();return b||L[m]||a[m]||L[w].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(o,l,h){return l||h.slice(1)})})).match(i),H=Y.length,X=0;X<H;X+=1){var Q=Y[X],j=B[Q],y=j&&j[0],T=j&&j[1];Y[X]=T?{regex:y,parser:T}:Q.replace(/^\[|\]$/g,"")}return function(x){for(var b={},m=0,w=0;m<H;m+=1){var o=Y[m];if(typeof o=="string")w+=o.length;else{var l=o.regex,h=o.parser,d=x.slice(w),v=l.exec(d)[0];h.call(b,v),x=x.replace(v,"")}}return function(s){var u=s.afternoon;if(u!==void 0){var e=s.hours;u?e<12&&(s.hours+=12):e===12&&(s.hours=0),delete s.afternoon}}(b),b}}return function(p,S,L){L.p.customParseFormat=!0,p&&p.parseTwoDigitYear&&(E=p.parseTwoDigitYear);var Y=S.prototype,H=Y.parse;Y.parse=function(X){var Q=X.date,j=X.utc,y=X.args;this.$u=j;var T=y[1];if(typeof T=="string"){var x=y[2]===!0,b=y[3]===!0,m=x||b,w=y[2];b&&(w=y[2]),F=this.$locale(),!x&&w&&(F=L.Ls[w]),this.$d=function(d,v,s,u){try{if(["x","X"].indexOf(v)>-1)return new Date((v==="X"?1e3:1)*d);var e=C(v)(d),I=e.year,D=e.month,A=e.day,N=e.hours,W=e.minutes,V=e.seconds,K=e.milliseconds,it=e.zone,nt=e.week,dt=new Date,ft=A||(I||D?1:dt.getDate()),ot=I||dt.getFullYear(),z=0;I&&!D||(z=D>0?D-1:dt.getMonth());var Z,G=N||0,rt=W||0,J=V||0,st=K||0;return it?new Date(Date.UTC(ot,z,ft,G,rt,J,st+60*it.offset*1e3)):s?new Date(Date.UTC(ot,z,ft,G,rt,J,st)):(Z=new Date(ot,z,ft,G,rt,J,st),nt&&(Z=u(Z).week(nt).toDate()),Z)}catch{return new Date("")}}(Q,T,j,L),this.init(),w&&w!==!0&&(this.$L=this.locale(w).$L),m&&Q!=this.format(T)&&(this.$d=new Date("")),F={}}else if(T instanceof Array)for(var o=T.length,l=1;l<=o;l+=1){y[1]=T[l-1];var h=L.apply(this,y);if(h.isValid()){this.$d=h.$d,this.$L=h.$L,this.init();break}l===o&&(this.$d=new Date(""))}else H.call(this,X)}}})})(qt);var Ye=qt.exports,Zt={exports:{}};(function(t,r){(function(a,i){t.exports=i()})(_t,function(){return function(a,i){var n=i.prototype,k=n.format;n.format=function(f){var _=this,F=this.$locale();if(!this.isValid())return k.bind(this)(f);var E=this.$utils(),g=(f||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(M){switch(M){case"Q":return Math.ceil((_.$M+1)/3);case"Do":return F.ordinal(_.$D);case"gggg":return _.weekYear();case"GGGG":return _.isoWeekYear();case"wo":return F.ordinal(_.week(),"W");case"w":case"ww":return E.s(_.week(),M==="w"?1:2,"0");case"W":case"WW":return E.s(_.isoWeek(),M==="W"?1:2,"0");case"k":case"kk":return E.s(String(_.$H===0?24:_.$H),M==="k"?1:2,"0");case"X":return Math.floor(_.$d.getTime()/1e3);case"x":return _.$d.getTime();case"z":return"["+_.offsetName()+"]";case"zzz":return"["+_.offsetName("long")+"]";default:return M}});return k.bind(this)(g)}}})})(Zt);var Fe=Zt.exports,Dt=function(){var t=c(function(w,o,l,h){for(l=l||{},h=w.length;h--;l[w[h]]=o);return l},"o"),r=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],a=[1,26],i=[1,27],n=[1,28],k=[1,29],f=[1,30],_=[1,31],F=[1,32],E=[1,33],g=[1,34],M=[1,9],O=[1,10],P=[1,11],B=[1,12],C=[1,13],p=[1,14],S=[1,15],L=[1,16],Y=[1,19],H=[1,20],X=[1,21],Q=[1,22],j=[1,23],y=[1,25],T=[1,35],x={trace:c(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:c(function(o,l,h,d,v,s,u){var e=s.length-1;switch(v){case 1:return s[e-1];case 2:this.$=[];break;case 3:s[e-1].push(s[e]),this.$=s[e-1];break;case 4:case 5:this.$=s[e];break;case 6:case 7:this.$=[];break;case 8:d.setWeekday("monday");break;case 9:d.setWeekday("tuesday");break;case 10:d.setWeekday("wednesday");break;case 11:d.setWeekday("thursday");break;case 12:d.setWeekday("friday");break;case 13:d.setWeekday("saturday");break;case 14:d.setWeekday("sunday");break;case 15:d.setWeekend("friday");break;case 16:d.setWeekend("saturday");break;case 17:d.setDateFormat(s[e].substr(11)),this.$=s[e].substr(11);break;case 18:d.enableInclusiveEndDates(),this.$=s[e].substr(18);break;case 19:d.TopAxis(),this.$=s[e].substr(8);break;case 20:d.setAxisFormat(s[e].substr(11)),this.$=s[e].substr(11);break;case 21:d.setTickInterval(s[e].substr(13)),this.$=s[e].substr(13);break;case 22:d.setExcludes(s[e].substr(9)),this.$=s[e].substr(9);break;case 23:d.setIncludes(s[e].substr(9)),this.$=s[e].substr(9);break;case 24:d.setTodayMarker(s[e].substr(12)),this.$=s[e].substr(12);break;case 27:d.setDiagramTitle(s[e].substr(6)),this.$=s[e].substr(6);break;case 28:this.$=s[e].trim(),d.setAccTitle(this.$);break;case 29:case 30:this.$=s[e].trim(),d.setAccDescription(this.$);break;case 31:d.addSection(s[e].substr(8)),this.$=s[e].substr(8);break;case 33:d.addTask(s[e-1],s[e]),this.$="task";break;case 34:this.$=s[e-1],d.setClickEvent(s[e-1],s[e],null);break;case 35:this.$=s[e-2],d.setClickEvent(s[e-2],s[e-1],s[e]);break;case 36:this.$=s[e-2],d.setClickEvent(s[e-2],s[e-1],null),d.setLink(s[e-2],s[e]);break;case 37:this.$=s[e-3],d.setClickEvent(s[e-3],s[e-2],s[e-1]),d.setLink(s[e-3],s[e]);break;case 38:this.$=s[e-2],d.setClickEvent(s[e-2],s[e],null),d.setLink(s[e-2],s[e-1]);break;case 39:this.$=s[e-3],d.setClickEvent(s[e-3],s[e-1],s[e]),d.setLink(s[e-3],s[e-2]);break;case 40:this.$=s[e-1],d.setLink(s[e-1],s[e]);break;case 41:case 47:this.$=s[e-1]+" "+s[e];break;case 42:case 43:case 45:this.$=s[e-2]+" "+s[e-1]+" "+s[e];break;case 44:case 46:this.$=s[e-3]+" "+s[e-2]+" "+s[e-1]+" "+s[e];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(r,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:a,13:i,14:n,15:k,16:f,17:_,18:F,19:18,20:E,21:g,22:M,23:O,24:P,25:B,26:C,27:p,28:S,29:L,30:Y,31:H,33:X,35:Q,36:j,37:24,38:y,40:T},t(r,[2,7],{1:[2,1]}),t(r,[2,3]),{9:36,11:17,12:a,13:i,14:n,15:k,16:f,17:_,18:F,19:18,20:E,21:g,22:M,23:O,24:P,25:B,26:C,27:p,28:S,29:L,30:Y,31:H,33:X,35:Q,36:j,37:24,38:y,40:T},t(r,[2,5]),t(r,[2,6]),t(r,[2,17]),t(r,[2,18]),t(r,[2,19]),t(r,[2,20]),t(r,[2,21]),t(r,[2,22]),t(r,[2,23]),t(r,[2,24]),t(r,[2,25]),t(r,[2,26]),t(r,[2,27]),{32:[1,37]},{34:[1,38]},t(r,[2,30]),t(r,[2,31]),t(r,[2,32]),{39:[1,39]},t(r,[2,8]),t(r,[2,9]),t(r,[2,10]),t(r,[2,11]),t(r,[2,12]),t(r,[2,13]),t(r,[2,14]),t(r,[2,15]),t(r,[2,16]),{41:[1,40],43:[1,41]},t(r,[2,4]),t(r,[2,28]),t(r,[2,29]),t(r,[2,33]),t(r,[2,34],{42:[1,42],43:[1,43]}),t(r,[2,40],{41:[1,44]}),t(r,[2,35],{43:[1,45]}),t(r,[2,36]),t(r,[2,38],{42:[1,46]}),t(r,[2,37]),t(r,[2,39])],defaultActions:{},parseError:c(function(o,l){if(l.recoverable)this.trace(o);else{var h=new Error(o);throw h.hash=l,h}},"parseError"),parse:c(function(o){var l=this,h=[0],d=[],v=[null],s=[],u=this.table,e="",I=0,D=0,A=2,N=1,W=s.slice.call(arguments,1),V=Object.create(this.lexer),K={yy:{}};for(var it in this.yy)Object.prototype.hasOwnProperty.call(this.yy,it)&&(K.yy[it]=this.yy[it]);V.setInput(o,K.yy),K.yy.lexer=V,K.yy.parser=this,typeof V.yylloc=="undefined"&&(V.yylloc={});var nt=V.yylloc;s.push(nt);var dt=V.options&&V.options.ranges;typeof K.yy.parseError=="function"?this.parseError=K.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ft(q){h.length=h.length-2*q,v.length=v.length-q,s.length=s.length-q}c(ft,"popStack");function ot(){var q;return q=d.pop()||V.lex()||N,typeof q!="number"&&(q instanceof Array&&(d=q,q=d.pop()),q=l.symbols_[q]||q),q}c(ot,"lex");for(var z,Z,G,rt,J={},st,$,zt,yt;;){if(Z=h[h.length-1],this.defaultActions[Z]?G=this.defaultActions[Z]:((z===null||typeof z=="undefined")&&(z=ot()),G=u[Z]&&u[Z][z]),typeof G=="undefined"||!G.length||!G[0]){var wt="";yt=[];for(st in u[Z])this.terminals_[st]&&st>A&&yt.push("'"+this.terminals_[st]+"'");V.showPosition?wt="Parse error on line "+(I+1)+`:
`+V.showPosition()+`
Expecting `+yt.join(", ")+", got '"+(this.terminals_[z]||z)+"'":wt="Parse error on line "+(I+1)+": Unexpected "+(z==N?"end of input":"'"+(this.terminals_[z]||z)+"'"),this.parseError(wt,{text:V.match,token:this.terminals_[z]||z,line:V.yylineno,loc:nt,expected:yt})}if(G[0]instanceof Array&&G.length>1)throw new Error("Parse Error: multiple actions possible at state: "+Z+", token: "+z);switch(G[0]){case 1:h.push(z),v.push(V.yytext),s.push(V.yylloc),h.push(G[1]),z=null,D=V.yyleng,e=V.yytext,I=V.yylineno,nt=V.yylloc;break;case 2:if($=this.productions_[G[1]][1],J.$=v[v.length-$],J._$={first_line:s[s.length-($||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-($||1)].first_column,last_column:s[s.length-1].last_column},dt&&(J._$.range=[s[s.length-($||1)].range[0],s[s.length-1].range[1]]),rt=this.performAction.apply(J,[e,D,I,K.yy,G[1],v,s].concat(W)),typeof rt!="undefined")return rt;$&&(h=h.slice(0,-1*$*2),v=v.slice(0,-1*$),s=s.slice(0,-1*$)),h.push(this.productions_[G[1]][0]),v.push(J.$),s.push(J._$),zt=u[h[h.length-2]][h[h.length-1]],h.push(zt);break;case 3:return!0}}return!0},"parse")},b=function(){var w={EOF:1,parseError:c(function(l,h){if(this.yy.parser)this.yy.parser.parseError(l,h);else throw new Error(l)},"parseError"),setInput:c(function(o,l){return this.yy=l||this.yy||{},this._input=o,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:c(function(){var o=this._input[0];this.yytext+=o,this.yyleng++,this.offset++,this.match+=o,this.matched+=o;var l=o.match(/(?:\r\n?|\n).*/g);return l?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),o},"input"),unput:c(function(o){var l=o.length,h=o.split(/(?:\r\n?|\n)/g);this._input=o+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-l),this.offset-=l;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var v=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===d.length?this.yylloc.first_column:0)+d[d.length-h.length].length-h[0].length:this.yylloc.first_column-l},this.options.ranges&&(this.yylloc.range=[v[0],v[0]+this.yyleng-l]),this.yyleng=this.yytext.length,this},"unput"),more:c(function(){return this._more=!0,this},"more"),reject:c(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:c(function(o){this.unput(this.match.slice(o))},"less"),pastInput:c(function(){var o=this.matched.substr(0,this.matched.length-this.match.length);return(o.length>20?"...":"")+o.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:c(function(){var o=this.match;return o.length<20&&(o+=this._input.substr(0,20-o.length)),(o.substr(0,20)+(o.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:c(function(){var o=this.pastInput(),l=new Array(o.length+1).join("-");return o+this.upcomingInput()+`
`+l+"^"},"showPosition"),test_match:c(function(o,l){var h,d,v;if(this.options.backtrack_lexer&&(v={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(v.yylloc.range=this.yylloc.range.slice(0))),d=o[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+o[0].length},this.yytext+=o[0],this.match+=o[0],this.matches=o,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(o[0].length),this.matched+=o[0],h=this.performAction.call(this,this.yy,this,l,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var s in v)this[s]=v[s];return!1}return!1},"test_match"),next:c(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var o,l,h,d;this._more||(this.yytext="",this.match="");for(var v=this._currentRules(),s=0;s<v.length;s++)if(h=this._input.match(this.rules[v[s]]),h&&(!l||h[0].length>l[0].length)){if(l=h,d=s,this.options.backtrack_lexer){if(o=this.test_match(h,v[s]),o!==!1)return o;if(this._backtrack){l=!1;continue}else return!1}else if(!this.options.flex)break}return l?(o=this.test_match(l,v[d]),o!==!1?o:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:c(function(){var l=this.next();return l||this.lex()},"lex"),begin:c(function(l){this.conditionStack.push(l)},"begin"),popState:c(function(){var l=this.conditionStack.length-1;return l>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:c(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:c(function(l){return l=this.conditionStack.length-1-Math.abs(l||0),l>=0?this.conditionStack[l]:"INITIAL"},"topState"),pushState:c(function(l){this.begin(l)},"pushState"),stateStackSize:c(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:c(function(l,h,d,v){switch(d){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return w}();x.lexer=b;function m(){this.yy={}}return c(m,"Parser"),m.prototype=x,x.Parser=m,new m}();Dt.parser=Dt;var We=Dt;U.extend(Le);U.extend(Ye);U.extend(Fe);var Qt={friday:5,saturday:6},tt="",St="",Ct=void 0,Et="",ht=[],kt=[],Mt=new Map,It=[],vt=[],lt="",At="",Kt=["active","done","crit","milestone"],Lt=[],mt=!1,Yt=!1,Ft="sunday",Tt="saturday",Wt=0,Ve=c(function(){It=[],vt=[],lt="",Lt=[],xt=0,Ot=void 0,bt=void 0,R=[],tt="",St="",At="",Ct=void 0,Et="",ht=[],kt=[],mt=!1,Yt=!1,Wt=0,Mt=new Map,he(),Ft="sunday",Tt="saturday"},"clear"),Oe=c(function(t){St=t},"setAxisFormat"),Pe=c(function(){return St},"getAxisFormat"),ze=c(function(t){Ct=t},"setTickInterval"),Re=c(function(){return Ct},"getTickInterval"),Ne=c(function(t){Et=t},"setTodayMarker"),Be=c(function(){return Et},"getTodayMarker"),Ge=c(function(t){tt=t},"setDateFormat"),He=c(function(){mt=!0},"enableInclusiveEndDates"),Xe=c(function(){return mt},"endDatesAreInclusive"),Ue=c(function(){Yt=!0},"enableTopAxis"),je=c(function(){return Yt},"topAxisEnabled"),qe=c(function(t){At=t},"setDisplayMode"),Ze=c(function(){return At},"getDisplayMode"),Qe=c(function(){return tt},"getDateFormat"),Ke=c(function(t){ht=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),Je=c(function(){return ht},"getIncludes"),$e=c(function(t){kt=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),ts=c(function(){return kt},"getExcludes"),es=c(function(){return Mt},"getLinks"),ss=c(function(t){lt=t,It.push(t)},"addSection"),rs=c(function(){return It},"getSections"),as=c(function(){let t=re();const r=10;let a=0;for(;!t&&a<r;)t=re(),a++;return vt=R,vt},"getTasks"),Jt=c(function(t,r,a,i){return i.includes(t.format(r.trim()))?!1:a.includes("weekends")&&(t.isoWeekday()===Qt[Tt]||t.isoWeekday()===Qt[Tt]+1)||a.includes(t.format("dddd").toLowerCase())?!0:a.includes(t.format(r.trim()))},"isInvalidDate"),is=c(function(t){Ft=t},"setWeekday"),ns=c(function(){return Ft},"getWeekday"),os=c(function(t){Tt=t},"setWeekend"),$t=c(function(t,r,a,i){if(!a.length||t.manualEndTime)return;let n;t.startTime instanceof Date?n=U(t.startTime):n=U(t.startTime,r,!0),n=n.add(1,"d");let k;t.endTime instanceof Date?k=U(t.endTime):k=U(t.endTime,r,!0);const[f,_]=cs(n,k,r,a,i);t.endTime=f.toDate(),t.renderEndTime=_},"checkTaskDates"),cs=c(function(t,r,a,i,n){let k=!1,f=null;for(;t<=r;)k||(f=r.toDate()),k=Jt(t,a,i,n),k&&(r=r.add(1,"d")),t=t.add(1,"d");return[r,f]},"fixTaskDates"),Vt=c(function(t,r,a){a=a.trim();const n=/^after\s+(?<ids>[\d\w- ]+)/.exec(a);if(n!==null){let f=null;for(const F of n.groups.ids.split(" ")){let E=at(F);E!==void 0&&(!f||E.endTime>f.endTime)&&(f=E)}if(f)return f.endTime;const _=new Date;return _.setHours(0,0,0,0),_}let k=U(a,r.trim(),!0);if(k.isValid())return k.toDate();{gt.debug("Invalid date:"+a),gt.debug("With date format:"+r.trim());const f=new Date(a);if(f===void 0||isNaN(f.getTime())||f.getFullYear()<-1e4||f.getFullYear()>1e4)throw new Error("Invalid date:"+a);return f}},"getStartDate"),te=c(function(t){const r=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return r!==null?[Number.parseFloat(r[1]),r[2]]:[NaN,"ms"]},"parseDuration"),ee=c(function(t,r,a,i=!1){a=a.trim();const k=/^until\s+(?<ids>[\d\w- ]+)/.exec(a);if(k!==null){let g=null;for(const O of k.groups.ids.split(" ")){let P=at(O);P!==void 0&&(!g||P.startTime<g.startTime)&&(g=P)}if(g)return g.startTime;const M=new Date;return M.setHours(0,0,0,0),M}let f=U(a,r.trim(),!0);if(f.isValid())return i&&(f=f.add(1,"d")),f.toDate();let _=U(t);const[F,E]=te(a);if(!Number.isNaN(F)){const g=_.add(F,E);g.isValid()&&(_=g)}return _.toDate()},"getEndDate"),xt=0,ut=c(function(t){return t===void 0?(xt=xt+1,"task"+xt):t},"parseId"),ls=c(function(t,r){let a;r.substr(0,1)===":"?a=r.substr(1,r.length):a=r;const i=a.split(","),n={};Pt(i,n,Kt);for(let f=0;f<i.length;f++)i[f]=i[f].trim();let k="";switch(i.length){case 1:n.id=ut(),n.startTime=t.endTime,k=i[0];break;case 2:n.id=ut(),n.startTime=Vt(void 0,tt,i[0]),k=i[1];break;case 3:n.id=ut(i[0]),n.startTime=Vt(void 0,tt,i[1]),k=i[2];break}return k&&(n.endTime=ee(n.startTime,tt,k,mt),n.manualEndTime=U(k,"YYYY-MM-DD",!0).isValid(),$t(n,tt,kt,ht)),n},"compileData"),us=c(function(t,r){let a;r.substr(0,1)===":"?a=r.substr(1,r.length):a=r;const i=a.split(","),n={};Pt(i,n,Kt);for(let k=0;k<i.length;k++)i[k]=i[k].trim();switch(i.length){case 1:n.id=ut(),n.startTime={type:"prevTaskEnd",id:t},n.endTime={data:i[0]};break;case 2:n.id=ut(),n.startTime={type:"getStartDate",startData:i[0]},n.endTime={data:i[1]};break;case 3:n.id=ut(i[0]),n.startTime={type:"getStartDate",startData:i[1]},n.endTime={data:i[2]};break}return n},"parseData"),Ot,bt,R=[],se={},ds=c(function(t,r){const a={section:lt,type:lt,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:r},task:t,classes:[]},i=us(bt,r);a.raw.startTime=i.startTime,a.raw.endTime=i.endTime,a.id=i.id,a.prevTaskId=bt,a.active=i.active,a.done=i.done,a.crit=i.crit,a.milestone=i.milestone,a.order=Wt,Wt++;const n=R.push(a);bt=a.id,se[a.id]=n-1},"addTask"),at=c(function(t){const r=se[t];return R[r]},"findTaskById"),fs=c(function(t,r){const a={section:lt,type:lt,description:t,task:t,classes:[]},i=ls(Ot,r);a.startTime=i.startTime,a.endTime=i.endTime,a.id=i.id,a.active=i.active,a.done=i.done,a.crit=i.crit,a.milestone=i.milestone,Ot=a,vt.push(a)},"addTaskOrg"),re=c(function(){const t=c(function(a){const i=R[a];let n="";switch(R[a].raw.startTime.type){case"prevTaskEnd":{const k=at(i.prevTaskId);i.startTime=k.endTime;break}case"getStartDate":n=Vt(void 0,tt,R[a].raw.startTime.startData),n&&(R[a].startTime=n);break}return R[a].startTime&&(R[a].endTime=ee(R[a].startTime,tt,R[a].raw.endTime.data,mt),R[a].endTime&&(R[a].processed=!0,R[a].manualEndTime=U(R[a].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),$t(R[a],tt,kt,ht))),R[a].processed},"compileTask");let r=!0;for(const[a,i]of R.entries())t(a),r=r&&i.processed;return r},"compileTasks"),hs=c(function(t,r){let a=r;ct().securityLevel!=="loose"&&(a=ke(r)),t.split(",").forEach(function(i){at(i)!==void 0&&(ie(i,()=>{window.open(a,"_self")}),Mt.set(i,a))}),ae(t,"clickable")},"setLink"),ae=c(function(t,r){t.split(",").forEach(function(a){let i=at(a);i!==void 0&&i.classes.push(r)})},"setClass"),ks=c(function(t,r,a){if(ct().securityLevel!=="loose"||r===void 0)return;let i=[];if(typeof a=="string"){i=a.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let k=0;k<i.length;k++){let f=i[k].trim();f.startsWith('"')&&f.endsWith('"')&&(f=f.substr(1,f.length-2)),i[k]=f}}i.length===0&&i.push(t),at(t)!==void 0&&ie(t,()=>{_e.runFunc(r,...i)})},"setClickFun"),ie=c(function(t,r){Lt.push(function(){const a=document.querySelector(`[id="${t}"]`);a!==null&&a.addEventListener("click",function(){r()})},function(){const a=document.querySelector(`[id="${t}-text"]`);a!==null&&a.addEventListener("click",function(){r()})})},"pushFun"),ms=c(function(t,r,a){t.split(",").forEach(function(i){ks(i,r,a)}),ae(t,"clickable")},"setClickEvent"),ys=c(function(t){Lt.forEach(function(r){r(t)})},"bindFunctions"),gs={getConfig:c(()=>ct().gantt,"getConfig"),clear:Ve,setDateFormat:Ge,getDateFormat:Qe,enableInclusiveEndDates:He,endDatesAreInclusive:Xe,enableTopAxis:Ue,topAxisEnabled:je,setAxisFormat:Oe,getAxisFormat:Pe,setTickInterval:ze,getTickInterval:Re,setTodayMarker:Ne,getTodayMarker:Be,setAccTitle:oe,getAccTitle:ce,setDiagramTitle:le,getDiagramTitle:ue,setDisplayMode:qe,getDisplayMode:Ze,setAccDescription:de,getAccDescription:fe,addSection:ss,getSections:rs,getTasks:as,addTask:ds,findTaskById:at,addTaskOrg:fs,setIncludes:Ke,getIncludes:Je,setExcludes:$e,getExcludes:ts,setClickEvent:ms,setLink:hs,getLinks:es,bindFunctions:ys,parseDuration:te,isInvalidDate:Jt,setWeekday:is,getWeekday:ns,setWeekend:os};function Pt(t,r,a){let i=!0;for(;i;)i=!1,a.forEach(function(n){const k="^\\s*"+n+"\\s*$",f=new RegExp(k);t[0].match(f)&&(r[n]=!0,t.shift(1),i=!0)})}c(Pt,"getTaskTags");var ps=c(function(){gt.debug("Something is calling, setConf, remove the call")},"setConf"),ne={monday:De,tuesday:Se,wednesday:Ce,thursday:Ee,friday:Me,saturday:Ie,sunday:Ae},vs=c((t,r)=>{let a=[...t].map(()=>-1/0),i=[...t].sort((k,f)=>k.startTime-f.startTime||k.order-f.order),n=0;for(const k of i)for(let f=0;f<a.length;f++)if(k.startTime>=a[f]){a[f]=k.endTime,k.order=f+r,f>n&&(n=f);break}return n},"getMaxIntersections"),et,Ts=c(function(t,r,a,i){const n=ct().gantt,k=ct().securityLevel;let f;k==="sandbox"&&(f=pt("#i"+r));const _=k==="sandbox"?pt(f.nodes()[0].contentDocument.body):pt("body"),F=k==="sandbox"?f.nodes()[0].contentDocument:document,E=F.getElementById(r);et=E.parentElement.offsetWidth,et===void 0&&(et=1200),n.useWidth!==void 0&&(et=n.useWidth);const g=i.db.getTasks();let M=[];for(const y of g)M.push(y.type);M=j(M);const O={};let P=2*n.topPadding;if(i.db.getDisplayMode()==="compact"||n.displayMode==="compact"){const y={};for(const x of g)y[x.section]===void 0?y[x.section]=[x]:y[x.section].push(x);let T=0;for(const x of Object.keys(y)){const b=vs(y[x],T)+1;T+=b,P+=b*(n.barHeight+n.barGap),O[x]=b}}else{P+=g.length*(n.barHeight+n.barGap);for(const y of M)O[y]=g.filter(T=>T.type===y).length}E.setAttribute("viewBox","0 0 "+et+" "+P);const B=_.select(`[id="${r}"]`),C=me().domain([ye(g,function(y){return y.startTime}),ge(g,function(y){return y.endTime})]).rangeRound([0,et-n.leftPadding-n.rightPadding]);function p(y,T){const x=y.startTime,b=T.startTime;let m=0;return x>b?m=1:x<b&&(m=-1),m}c(p,"taskCompare"),g.sort(p),S(g,et,P),pe(B,P,et,n.useMaxWidth),B.append("text").text(i.db.getDiagramTitle()).attr("x",et/2).attr("y",n.titleTopMargin).attr("class","titleText");function S(y,T,x){const b=n.barHeight,m=b+n.barGap,w=n.topPadding,o=n.leftPadding,l=ve().domain([0,M.length]).range(["#00B9FA","#F95002"]).interpolate(Te);Y(m,w,o,T,x,y,i.db.getExcludes(),i.db.getIncludes()),H(o,w,T,x),L(y,m,w,o,b,l,T),X(m,w),Q(o,w,T,x)}c(S,"makeGantt");function L(y,T,x,b,m,w,o){const h=[...new Set(y.map(u=>u.order))].map(u=>y.find(e=>e.order===u));B.append("g").selectAll("rect").data(h).enter().append("rect").attr("x",0).attr("y",function(u,e){return e=u.order,e*T+x-2}).attr("width",function(){return o-n.rightPadding/2}).attr("height",T).attr("class",function(u){for(const[e,I]of M.entries())if(u.type===I)return"section section"+e%n.numberSectionStyles;return"section section0"});const d=B.append("g").selectAll("rect").data(y).enter(),v=i.db.getLinks();if(d.append("rect").attr("id",function(u){return u.id}).attr("rx",3).attr("ry",3).attr("x",function(u){return u.milestone?C(u.startTime)+b+.5*(C(u.endTime)-C(u.startTime))-.5*m:C(u.startTime)+b}).attr("y",function(u,e){return e=u.order,e*T+x}).attr("width",function(u){return u.milestone?m:C(u.renderEndTime||u.endTime)-C(u.startTime)}).attr("height",m).attr("transform-origin",function(u,e){return e=u.order,(C(u.startTime)+b+.5*(C(u.endTime)-C(u.startTime))).toString()+"px "+(e*T+x+.5*m).toString()+"px"}).attr("class",function(u){const e="task";let I="";u.classes.length>0&&(I=u.classes.join(" "));let D=0;for(const[N,W]of M.entries())u.type===W&&(D=N%n.numberSectionStyles);let A="";return u.active?u.crit?A+=" activeCrit":A=" active":u.done?u.crit?A=" doneCrit":A=" done":u.crit&&(A+=" crit"),A.length===0&&(A=" task"),u.milestone&&(A=" milestone "+A),A+=D,A+=" "+I,e+A}),d.append("text").attr("id",function(u){return u.id+"-text"}).text(function(u){return u.task}).attr("font-size",n.fontSize).attr("x",function(u){let e=C(u.startTime),I=C(u.renderEndTime||u.endTime);u.milestone&&(e+=.5*(C(u.endTime)-C(u.startTime))-.5*m),u.milestone&&(I=e+m);const D=this.getBBox().width;return D>I-e?I+D+1.5*n.leftPadding>o?e+b-5:I+b+5:(I-e)/2+e+b}).attr("y",function(u,e){return e=u.order,e*T+n.barHeight/2+(n.fontSize/2-2)+x}).attr("text-height",m).attr("class",function(u){const e=C(u.startTime);let I=C(u.endTime);u.milestone&&(I=e+m);const D=this.getBBox().width;let A="";u.classes.length>0&&(A=u.classes.join(" "));let N=0;for(const[V,K]of M.entries())u.type===K&&(N=V%n.numberSectionStyles);let W="";return u.active&&(u.crit?W="activeCritText"+N:W="activeText"+N),u.done?u.crit?W=W+" doneCritText"+N:W=W+" doneText"+N:u.crit&&(W=W+" critText"+N),u.milestone&&(W+=" milestoneText"),D>I-e?I+D+1.5*n.leftPadding>o?A+" taskTextOutsideLeft taskTextOutside"+N+" "+W:A+" taskTextOutsideRight taskTextOutside"+N+" "+W+" width-"+D:A+" taskText taskText"+N+" "+W+" width-"+D}),ct().securityLevel==="sandbox"){let u;u=pt("#i"+r);const e=u.nodes()[0].contentDocument;d.filter(function(I){return v.has(I.id)}).each(function(I){var D=e.querySelector("#"+I.id),A=e.querySelector("#"+I.id+"-text");const N=D.parentNode;var W=e.createElement("a");W.setAttribute("xlink:href",v.get(I.id)),W.setAttribute("target","_top"),N.appendChild(W),W.appendChild(D),W.appendChild(A)})}}c(L,"drawRects");function Y(y,T,x,b,m,w,o,l){if(o.length===0&&l.length===0)return;let h,d;for(const{startTime:D,endTime:A}of w)(h===void 0||D<h)&&(h=D),(d===void 0||A>d)&&(d=A);if(!h||!d)return;if(U(d).diff(U(h),"year")>5){gt.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const v=i.db.getDateFormat(),s=[];let u=null,e=U(h);for(;e.valueOf()<=d;)i.db.isInvalidDate(e,v,o,l)?u?u.end=e:u={start:e,end:e}:u&&(s.push(u),u=null),e=e.add(1,"d");B.append("g").selectAll("rect").data(s).enter().append("rect").attr("id",function(D){return"exclude-"+D.start.format("YYYY-MM-DD")}).attr("x",function(D){return C(D.start)+x}).attr("y",n.gridLineStartPadding).attr("width",function(D){const A=D.end.add(1,"day");return C(A)-C(D.start)}).attr("height",m-T-n.gridLineStartPadding).attr("transform-origin",function(D,A){return(C(D.start)+x+.5*(C(D.end)-C(D.start))).toString()+"px "+(A*y+.5*m).toString()+"px"}).attr("class","exclude-range")}c(Y,"drawExcludeDays");function H(y,T,x,b){let m=xe(C).tickSize(-b+T+n.gridLineStartPadding).tickFormat(Rt(i.db.getAxisFormat()||n.axisFormat||"%Y-%m-%d"));const o=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(i.db.getTickInterval()||n.tickInterval);if(o!==null){const l=o[1],h=o[2],d=i.db.getWeekday()||n.weekday;switch(h){case"millisecond":m.ticks(Ut.every(l));break;case"second":m.ticks(Xt.every(l));break;case"minute":m.ticks(Ht.every(l));break;case"hour":m.ticks(Gt.every(l));break;case"day":m.ticks(Bt.every(l));break;case"week":m.ticks(ne[d].every(l));break;case"month":m.ticks(Nt.every(l));break}}if(B.append("g").attr("class","grid").attr("transform","translate("+y+", "+(b-50)+")").call(m).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),i.db.topAxisEnabled()||n.topAxis){let l=be(C).tickSize(-b+T+n.gridLineStartPadding).tickFormat(Rt(i.db.getAxisFormat()||n.axisFormat||"%Y-%m-%d"));if(o!==null){const h=o[1],d=o[2],v=i.db.getWeekday()||n.weekday;switch(d){case"millisecond":l.ticks(Ut.every(h));break;case"second":l.ticks(Xt.every(h));break;case"minute":l.ticks(Ht.every(h));break;case"hour":l.ticks(Gt.every(h));break;case"day":l.ticks(Bt.every(h));break;case"week":l.ticks(ne[v].every(h));break;case"month":l.ticks(Nt.every(h));break}}B.append("g").attr("class","grid").attr("transform","translate("+y+", "+T+")").call(l).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}c(H,"makeGrid");function X(y,T){let x=0;const b=Object.keys(O).map(m=>[m,O[m]]);B.append("g").selectAll("text").data(b).enter().append(function(m){const w=m[0].split(we.lineBreakRegex),o=-(w.length-1)/2,l=F.createElementNS("http://www.w3.org/2000/svg","text");l.setAttribute("dy",o+"em");for(const[h,d]of w.entries()){const v=F.createElementNS("http://www.w3.org/2000/svg","tspan");v.setAttribute("alignment-baseline","central"),v.setAttribute("x","10"),h>0&&v.setAttribute("dy","1em"),v.textContent=d,l.appendChild(v)}return l}).attr("x",10).attr("y",function(m,w){if(w>0)for(let o=0;o<w;o++)return x+=b[w-1][1],m[1]*y/2+x*y+T;else return m[1]*y/2+T}).attr("font-size",n.sectionFontSize).attr("class",function(m){for(const[w,o]of M.entries())if(m[0]===o)return"sectionTitle sectionTitle"+w%n.numberSectionStyles;return"sectionTitle"})}c(X,"vertLabels");function Q(y,T,x,b){const m=i.db.getTodayMarker();if(m==="off")return;const w=B.append("g").attr("class","today"),o=new Date,l=w.append("line");l.attr("x1",C(o)+y).attr("x2",C(o)+y).attr("y1",n.titleTopMargin).attr("y2",b-n.titleTopMargin).attr("class","today"),m!==""&&l.attr("style",m.replace(/,/g,";"))}c(Q,"drawToday");function j(y){const T={},x=[];for(let b=0,m=y.length;b<m;++b)Object.prototype.hasOwnProperty.call(T,y[b])||(T[y[b]]=!0,x.push(y[b]));return x}c(j,"checkUnique")},"draw"),xs={setConf:ps,draw:Ts},bs=c(t=>`
  .mermaid-main-font {
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }
`,"getStyles"),ws=bs,Ds={parser:We,db:gs,renderer:xs,styles:ws};export{Ds as diagram};
