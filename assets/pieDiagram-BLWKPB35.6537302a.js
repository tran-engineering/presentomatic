import{p as W}from"./chunk-BAOP5US2.18552d44.js";import{aw as N,A as U,B as q,g as V,h as Z,k as H,i as J,_ as i,t as C,F as K,n as Q,ax as X,a_ as Y,b0 as ee,b1 as z,b2 as te,u as ae,b3 as re}from"./vendor.c2a4d007.js";import{p as ie}from"./mermaid-parser.core.5ec5b6ff.js";import"./_basePickBy.bfee314b.js";import"./_baseUniq.3e850cc2.js";import"./clone.5f0277c4.js";var F=N.pie,D={sections:new Map,showData:!1,config:F},m=D.sections,y=D.showData,se=structuredClone(F),ne=i(()=>structuredClone(se),"getConfig"),oe=i(()=>{m=new Map,y=D.showData,K()},"clear"),le=i(({label:e,value:a})=>{m.has(e)||(m.set(e,a),C.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),ce=i(()=>m,"getSections"),de=i(e=>{y=e},"setShowData"),pe=i(()=>y,"getShowData"),P={getConfig:ne,clear:oe,setDiagramTitle:U,getDiagramTitle:q,setAccTitle:V,getAccTitle:Z,setAccDescription:H,getAccDescription:J,addSection:le,getSections:ce,setShowData:de,getShowData:pe},ge=i((e,a)=>{W(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),fe={parse:i(async e=>{const a=await ie("pie",e);C.debug(a),ge(a,P)},"parse")},ue=i(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),he=ue,me=i(e=>{const a=[...e.entries()].map(s=>({label:s[0],value:s[1]})).sort((s,l)=>l.value-s.value);return re().value(s=>s.value)(a)},"createPieArcs"),ve=i((e,a,G,s)=>{C.debug(`rendering pie chart
`+e);const l=s.db,T=Q(),$=X(l.getConfig(),T.pie),b=40,n=18,g=4,c=450,v=c,S=Y(a),d=S.append("g");d.attr("transform","translate("+v/2+","+c/2+")");const{themeVariables:r}=T;let[f]=ee(r.pieOuterStrokeWidth);f!=null||(f=2);const A=$.textPosition,u=Math.min(v,c)/2-b,O=z().innerRadius(0).outerRadius(u),M=z().innerRadius(u*A).outerRadius(u*A);d.append("circle").attr("cx",0).attr("cy",0).attr("r",u+f/2).attr("class","pieOuterCircle");const _=l.getSections(),x=me(_),R=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],p=te(R);d.selectAll("mySlices").data(x).enter().append("path").attr("d",O).attr("fill",t=>p(t.data.label)).attr("class","pieCircle");let k=0;_.forEach(t=>{k+=t}),d.selectAll("mySlices").data(x).enter().append("text").text(t=>(t.data.value/k*100).toFixed(0)+"%").attr("transform",t=>"translate("+M.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),d.append("text").text(l.getDiagramTitle()).attr("x",0).attr("y",-(c-50)/2).attr("class","pieTitleText");const w=d.selectAll(".legend").data(p.domain()).enter().append("g").attr("class","legend").attr("transform",(t,o)=>{const h=n+g,B=h*p.domain().length/2,I=12*n,L=o*h-B;return"translate("+I+","+L+")"});w.append("rect").attr("width",n).attr("height",n).style("fill",p).style("stroke",p),w.data(x).append("text").attr("x",n+g).attr("y",n-g).text(t=>{const{label:o,value:h}=t.data;return l.getShowData()?`${o} [${h}]`:o});const j=Math.max(...w.selectAll("text").nodes().map(t=>{var o;return(o=t==null?void 0:t.getBoundingClientRect().width)!=null?o:0})),E=v+b+n+g+j;S.attr("viewBox",`0 0 ${E} ${c}`),ae(S,c,E,$.useMaxWidth)},"draw"),Se={draw:ve},$e={parser:fe,db:P,renderer:Se,styles:he};export{$e as diagram};
