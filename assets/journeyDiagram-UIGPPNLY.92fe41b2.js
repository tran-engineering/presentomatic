import{d as ft,f as gt,g as tt,b as mt}from"./chunk-VCFP4HPQ.6e13706c.js";import{_ as i,n as A,A as xt,B as kt,g as _t,h as vt,k as bt,i as wt,F as Tt,s as H,u as St,b1 as et}from"./vendor.c2a4d007.js";var W=function(){var t=i(function(g,r,a,l){for(a=a||{},l=g.length;l--;a[g[l]]=r);return a},"o"),e=[6,8,10,11,12,14,16,17,18],s=[1,9],c=[1,10],n=[1,11],u=[1,12],h=[1,13],p=[1,14],d={trace:i(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:i(function(r,a,l,y,f,o,S){var _=o.length-1;switch(f){case 1:return o[_-1];case 2:this.$=[];break;case 3:o[_-1].push(o[_]),this.$=o[_-1];break;case 4:case 5:this.$=o[_];break;case 6:case 7:this.$=[];break;case 8:y.setDiagramTitle(o[_].substr(6)),this.$=o[_].substr(6);break;case 9:this.$=o[_].trim(),y.setAccTitle(this.$);break;case 10:case 11:this.$=o[_].trim(),y.setAccDescription(this.$);break;case 12:y.addSection(o[_].substr(8)),this.$=o[_].substr(8);break;case 13:y.addTask(o[_-1],o[_]),this.$="task";break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:s,12:c,14:n,16:u,17:h,18:p},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:s,12:c,14:n,16:u,17:h,18:p},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:i(function(r,a){if(a.recoverable)this.trace(r);else{var l=new Error(r);throw l.hash=a,l}},"parseError"),parse:i(function(r){var a=this,l=[0],y=[],f=[null],o=[],S=this.table,_="",B=0,Z=0,ut=2,J=1,yt=o.slice.call(arguments,1),k=Object.create(this.lexer),P={yy:{}};for(var O in this.yy)Object.prototype.hasOwnProperty.call(this.yy,O)&&(P.yy[O]=this.yy[O]);k.setInput(r,P.yy),P.yy.lexer=k,P.yy.parser=this,typeof k.yylloc=="undefined"&&(k.yylloc={});var Y=k.yylloc;o.push(Y);var dt=k.options&&k.options.ranges;typeof P.yy.parseError=="function"?this.parseError=P.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function pt(b){l.length=l.length-2*b,f.length=f.length-b,o.length=o.length-b}i(pt,"popStack");function K(){var b;return b=y.pop()||k.lex()||J,typeof b!="number"&&(b instanceof Array&&(y=b,b=y.pop()),b=a.symbols_[b]||b),b}i(K,"lex");for(var v,E,w,q,C={},j,M,D,N;;){if(E=l[l.length-1],this.defaultActions[E]?w=this.defaultActions[E]:((v===null||typeof v=="undefined")&&(v=K()),w=S[E]&&S[E][v]),typeof w=="undefined"||!w.length||!w[0]){var G="";N=[];for(j in S[E])this.terminals_[j]&&j>ut&&N.push("'"+this.terminals_[j]+"'");k.showPosition?G="Parse error on line "+(B+1)+`:
`+k.showPosition()+`
Expecting `+N.join(", ")+", got '"+(this.terminals_[v]||v)+"'":G="Parse error on line "+(B+1)+": Unexpected "+(v==J?"end of input":"'"+(this.terminals_[v]||v)+"'"),this.parseError(G,{text:k.match,token:this.terminals_[v]||v,line:k.yylineno,loc:Y,expected:N})}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+E+", token: "+v);switch(w[0]){case 1:l.push(v),f.push(k.yytext),o.push(k.yylloc),l.push(w[1]),v=null,Z=k.yyleng,_=k.yytext,B=k.yylineno,Y=k.yylloc;break;case 2:if(M=this.productions_[w[1]][1],C.$=f[f.length-M],C._$={first_line:o[o.length-(M||1)].first_line,last_line:o[o.length-1].last_line,first_column:o[o.length-(M||1)].first_column,last_column:o[o.length-1].last_column},dt&&(C._$.range=[o[o.length-(M||1)].range[0],o[o.length-1].range[1]]),q=this.performAction.apply(C,[_,Z,B,P.yy,w[1],f,o].concat(yt)),typeof q!="undefined")return q;M&&(l=l.slice(0,-1*M*2),f=f.slice(0,-1*M),o=o.slice(0,-1*M)),l.push(this.productions_[w[1]][0]),f.push(C.$),o.push(C._$),D=S[l[l.length-2]][l[l.length-1]],l.push(D);break;case 3:return!0}}return!0},"parse")},x=function(){var g={EOF:1,parseError:i(function(a,l){if(this.yy.parser)this.yy.parser.parseError(a,l);else throw new Error(a)},"parseError"),setInput:i(function(r,a){return this.yy=a||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:i(function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var a=r.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},"input"),unput:i(function(r){var a=r.length,l=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var y=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),l.length-1&&(this.yylineno-=l.length-1);var f=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:l?(l.length===y.length?this.yylloc.first_column:0)+y[y.length-l.length].length-l[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[f[0],f[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},"unput"),more:i(function(){return this._more=!0,this},"more"),reject:i(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:i(function(r){this.unput(this.match.slice(r))},"less"),pastInput:i(function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:i(function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:i(function(){var r=this.pastInput(),a=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+a+"^"},"showPosition"),test_match:i(function(r,a){var l,y,f;if(this.options.backtrack_lexer&&(f={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(f.yylloc.range=this.yylloc.range.slice(0))),y=r[0].match(/(?:\r\n?|\n).*/g),y&&(this.yylineno+=y.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:y?y[y.length-1].length-y[y.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],l=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),l)return l;if(this._backtrack){for(var o in f)this[o]=f[o];return!1}return!1},"test_match"),next:i(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,a,l,y;this._more||(this.yytext="",this.match="");for(var f=this._currentRules(),o=0;o<f.length;o++)if(l=this._input.match(this.rules[f[o]]),l&&(!a||l[0].length>a[0].length)){if(a=l,y=o,this.options.backtrack_lexer){if(r=this.test_match(l,f[o]),r!==!1)return r;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(r=this.test_match(a,f[y]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:i(function(){var a=this.next();return a||this.lex()},"lex"),begin:i(function(a){this.conditionStack.push(a)},"begin"),popState:i(function(){var a=this.conditionStack.length-1;return a>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:i(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:i(function(a){return a=this.conditionStack.length-1-Math.abs(a||0),a>=0?this.conditionStack[a]:"INITIAL"},"topState"),pushState:i(function(a){this.begin(a)},"pushState"),stateStackSize:i(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:i(function(a,l,y,f){switch(y){case 0:break;case 1:break;case 2:return 10;case 3:break;case 4:break;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return g}();d.lexer=x;function m(){this.yy={}}return i(m,"Parser"),m.prototype=d,d.Parser=m,new m}();W.parser=W;var Mt=W,V="",X=[],F=[],R=[],$t=i(function(){X.length=0,F.length=0,V="",R.length=0,Tt()},"clear"),Pt=i(function(t){V=t,X.push(t)},"addSection"),Et=i(function(){return X},"getSections"),At=i(function(){let t=rt();const e=100;let s=0;for(;!t&&s<e;)t=rt(),s++;return F.push(...R),F},"getTasks"),It=i(function(){const t=[];return F.forEach(s=>{s.people&&t.push(...s.people)}),[...new Set(t)].sort()},"updateActors"),Ct=i(function(t,e){const s=e.substr(1).split(":");let c=0,n=[];s.length===1?(c=Number(s[0]),n=[]):(c=Number(s[0]),n=s[1].split(","));const u=n.map(p=>p.trim()),h={section:V,type:V,people:u,task:t,score:c};R.push(h)},"addTask"),Vt=i(function(t){const e={section:V,type:V,description:t,task:t,classes:[]};F.push(e)},"addTaskOrg"),rt=i(function(){const t=i(function(s){return R[s].processed},"compileTask");let e=!0;for(const[s,c]of R.entries())t(s),e=e&&c.processed;return e},"compileTasks"),Ft=i(function(){return It()},"getActors"),st={getConfig:i(()=>A().journey,"getConfig"),clear:$t,setDiagramTitle:xt,getDiagramTitle:kt,setAccTitle:_t,getAccTitle:vt,setAccDescription:bt,getAccDescription:wt,addSection:Pt,getSections:Et,getTasks:At,addTask:Ct,addTaskOrg:Vt,getActors:Ft},Rt=i(t=>`.label {
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
`,"getStyles"),Lt=Rt,U=i(function(t,e){return ft(t,e)},"drawRect"),Bt=i(function(t,e){const s=15,c=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",s).attr("stroke-width",2).attr("overflow","visible"),n=t.append("g");n.append("circle").attr("cx",e.cx-s/3).attr("cy",e.cy-s/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),n.append("circle").attr("cx",e.cx+s/3).attr("cy",e.cy-s/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function u(d){const x=et().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(s/2).outerRadius(s/2.2);d.append("path").attr("class","mouth").attr("d",x).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}i(u,"smile");function h(d){const x=et().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(s/2).outerRadius(s/2.2);d.append("path").attr("class","mouth").attr("d",x).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}i(h,"sad");function p(d){d.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return i(p,"ambivalent"),e.score>3?u(n):e.score<3?h(n):p(n),c},"drawFace"),nt=i(function(t,e){const s=t.append("circle");return s.attr("cx",e.cx),s.attr("cy",e.cy),s.attr("class","actor-"+e.pos),s.attr("fill",e.fill),s.attr("stroke",e.stroke),s.attr("r",e.r),s.class!==void 0&&s.attr("class",s.class),e.title!==void 0&&s.append("title").text(e.title),s},"drawCircle"),it=i(function(t,e){return gt(t,e)},"drawText"),jt=i(function(t,e){function s(n,u,h,p,d){return n+","+u+" "+(n+h)+","+u+" "+(n+h)+","+(u+p-d)+" "+(n+h-d*1.2)+","+(u+p)+" "+n+","+(u+p)}i(s,"genPoints");const c=t.append("polygon");c.attr("points",s(e.x,e.y,50,20,7)),c.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,it(t,e)},"drawLabel"),Nt=i(function(t,e,s){const c=t.append("g"),n=tt();n.x=e.x,n.y=e.y,n.fill=e.fill,n.width=s.width*e.taskCount+s.diagramMarginX*(e.taskCount-1),n.height=s.height,n.class="journey-section section-type-"+e.num,n.rx=3,n.ry=3,U(c,n),lt(s)(e.text,c,n.x,n.y,n.width,n.height,{class:"journey-section section-type-"+e.num},s,e.colour)},"drawSection"),at=-1,zt=i(function(t,e,s){const c=e.x+s.width/2,n=t.append("g");at++;const u=300+5*30;n.append("line").attr("id","task"+at).attr("x1",c).attr("y1",e.y).attr("x2",c).attr("y2",u).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Bt(n,{cx:c,cy:300+(5-e.score)*30,score:e.score});const h=tt();h.x=e.x,h.y=e.y,h.fill=e.fill,h.width=s.width,h.height=s.height,h.class="task task-type-"+e.num,h.rx=3,h.ry=3,U(n,h);let p=e.x+14;e.people.forEach(d=>{const x=e.actors[d].color,m={cx:p,cy:e.y,r:7,fill:x,stroke:"#000",title:d,pos:e.actors[d].position};nt(n,m),p+=10}),lt(s)(e.task,n,h.x,h.y,h.width,h.height,{class:"task"},s,e.colour)},"drawTask"),Ot=i(function(t,e){mt(t,e)},"drawBackgroundRect"),lt=function(){function t(n,u,h,p,d,x,m,g){const r=u.append("text").attr("x",h+d/2).attr("y",p+x/2+5).style("font-color",g).style("text-anchor","middle").text(n);c(r,m)}i(t,"byText");function e(n,u,h,p,d,x,m,g,r){const{taskFontSize:a,taskFontFamily:l}=g,y=n.split(/<br\s*\/?>/gi);for(let f=0;f<y.length;f++){const o=f*a-a*(y.length-1)/2,S=u.append("text").attr("x",h+d/2).attr("y",p).attr("fill",r).style("text-anchor","middle").style("font-size",a).style("font-family",l);S.append("tspan").attr("x",h+d/2).attr("dy",o).text(y[f]),S.attr("y",p+x/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),c(S,m)}}i(e,"byTspan");function s(n,u,h,p,d,x,m,g){const r=u.append("switch"),l=r.append("foreignObject").attr("x",h).attr("y",p).attr("width",d).attr("height",x).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");l.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(n),e(n,r,h,p,d,x,m,g),c(l,m)}i(s,"byFo");function c(n,u){for(const h in u)h in u&&n.attr(h,u[h])}return i(c,"_setTextAttrs"),function(n){return n.textPlacement==="fo"?s:n.textPlacement==="old"?t:e}}(),Yt=i(function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),L={drawRect:U,drawCircle:nt,drawSection:Nt,drawText:it,drawLabel:jt,drawTask:zt,drawBackgroundRect:Ot,initGraphics:Yt},qt=i(function(t){Object.keys(t).forEach(function(s){z[s]=t[s]})},"setConf"),$={};function ot(t){const e=A().journey;let s=60;Object.keys($).forEach(c=>{const n=$[c].color,u={cx:20,cy:s,r:7,fill:n,stroke:"#000",pos:$[c].position};L.drawCircle(t,u);const h={x:40,y:s+7,fill:"#666",text:c,textMargin:e.boxTextMargin|5};L.drawText(t,h),s+=20})}i(ot,"drawActorLegend");var z=A().journey,I=z.leftMargin,Gt=i(function(t,e,s,c){const n=A().journey,u=A().securityLevel;let h;u==="sandbox"&&(h=H("#i"+e));const p=u==="sandbox"?H(h.nodes()[0].contentDocument.body):H("body");T.init();const d=p.select("#"+e);L.initGraphics(d);const x=c.db.getTasks(),m=c.db.getDiagramTitle(),g=c.db.getActors();for(const o in $)delete $[o];let r=0;g.forEach(o=>{$[o]={color:n.actorColours[r%n.actorColours.length],position:r},r++}),ot(d),T.insert(0,0,I,Object.keys($).length*50),Ht(d,x,0);const a=T.getBounds();m&&d.append("text").text(m).attr("x",I).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);const l=a.stopy-a.starty+2*n.diagramMarginY,y=I+a.stopx+2*n.diagramMarginX;St(d,l,y,n.useMaxWidth),d.append("line").attr("x1",I).attr("y1",n.height*4).attr("x2",y-I-4).attr("y2",n.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");const f=m?70:0;d.attr("viewBox",`${a.startx} -25 ${y} ${l+f}`),d.attr("preserveAspectRatio","xMinYMin meet"),d.attr("height",l+f+25)},"draw"),T={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:i(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:i(function(t,e,s,c){t[e]===void 0?t[e]=s:t[e]=c(s,t[e])},"updateVal"),updateBounds:i(function(t,e,s,c){const n=A().journey,u=this;let h=0;function p(d){return i(function(m){h++;const g=u.sequenceItems.length-h+1;u.updateVal(m,"starty",e-g*n.boxMargin,Math.min),u.updateVal(m,"stopy",c+g*n.boxMargin,Math.max),u.updateVal(T.data,"startx",t-g*n.boxMargin,Math.min),u.updateVal(T.data,"stopx",s+g*n.boxMargin,Math.max),d!=="activation"&&(u.updateVal(m,"startx",t-g*n.boxMargin,Math.min),u.updateVal(m,"stopx",s+g*n.boxMargin,Math.max),u.updateVal(T.data,"starty",e-g*n.boxMargin,Math.min),u.updateVal(T.data,"stopy",c+g*n.boxMargin,Math.max))},"updateItemBounds")}i(p,"updateFn"),this.sequenceItems.forEach(p())},"updateBounds"),insert:i(function(t,e,s,c){const n=Math.min(t,s),u=Math.max(t,s),h=Math.min(e,c),p=Math.max(e,c);this.updateVal(T.data,"startx",n,Math.min),this.updateVal(T.data,"starty",h,Math.min),this.updateVal(T.data,"stopx",u,Math.max),this.updateVal(T.data,"stopy",p,Math.max),this.updateBounds(n,h,u,p)},"insert"),bumpVerticalPos:i(function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:i(function(){return this.verticalPos},"getVerticalPos"),getBounds:i(function(){return this.data},"getBounds")},Q=z.sectionFills,ct=z.sectionColours,Ht=i(function(t,e,s){const c=A().journey;let n="";const u=c.height*2+c.diagramMarginY,h=s+u;let p=0,d="#CCC",x="black",m=0;for(const[g,r]of e.entries()){if(n!==r.section){d=Q[p%Q.length],m=p%Q.length,x=ct[p%ct.length];let l=0;const y=r.section;for(let o=g;o<e.length&&e[o].section==y;o++)l=l+1;const f={x:g*c.taskMargin+g*c.width+I,y:50,text:r.section,fill:d,num:m,colour:x,taskCount:l};L.drawSection(t,f,c),n=r.section,p++}const a=r.people.reduce((l,y)=>($[y]&&(l[y]=$[y]),l),{});r.x=g*c.taskMargin+g*c.width+I,r.y=h,r.width=c.diagramMarginX,r.height=c.diagramMarginY,r.colour=x,r.fill=d,r.num=m,r.actors=a,L.drawTask(t,r,c),T.insert(r.x,r.y,r.x+r.width+c.taskMargin,300+5*30)}},"drawTasks"),ht={setConf:qt,draw:Gt},Ut={parser:Mt,db:st,renderer:ht,styles:Lt,init:i(t=>{ht.setConf(t.journey),st.clear()},"init")};export{Ut as diagram};
