var F=Object.defineProperty;var x=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var C=(t,e,a)=>e in t?F(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,m=(t,e)=>{for(var a in e||(e={}))P.call(e,a)&&C(t,a,e[a]);if(x)for(var a of x(e))z.call(e,a)&&C(t,a,e[a]);return t};import{p as _}from"./chunk-BAOP5US2.18552d44.js";import{aw as W,g as A,h as T,A as D,B as E,i as j,k as N,_ as l,t as y,ax as $,ay as L,F as O,a_ as U,u as Y}from"./vendor.c2a4d007.js";import{p as I}from"./mermaid-parser.core.5ec5b6ff.js";import"./_basePickBy.bfee314b.js";import"./_baseUniq.3e850cc2.js";import"./clone.5f0277c4.js";var w={packet:[]},v=structuredClone(w),M=W.packet,q=l(()=>{const t=$(m(m({},M),L().packet));return t.showBits&&(t.paddingY+=10),t},"getConfig"),G=l(()=>v.packet,"getPacket"),H=l(t=>{t.length>0&&v.packet.push(t)},"pushWord"),K=l(()=>{O(),v=structuredClone(w)},"clear"),h={pushWord:H,getPacket:G,getConfig:q,clear:K,setAccTitle:A,getAccTitle:T,setDiagramTitle:D,getDiagramTitle:E,getAccDescription:j,setAccDescription:N},R=1e4,X=l(t=>{_(t,h);let e=-1,a=[],n=1;const{bitsPerRow:i}=h.getConfig();for(let{start:o,end:r,label:p}of t.blocks){if(r&&r<o)throw new Error(`Packet block ${o} - ${r} is invalid. End must be greater than start.`);if(o!==e+1)throw new Error(`Packet block ${o} - ${r!=null?r:o} is not contiguous. It should start from ${e+1}.`);for(e=r!=null?r:o,y.debug(`Packet block ${o} - ${e} with label ${p}`);a.length<=i+1&&h.getPacket().length<R;){const[b,c]=J({start:o,end:r,label:p},n,i);if(a.push(b),b.end+1===n*i&&(h.pushWord(a),a=[],n++),!c)break;({start:o,end:r,label:p}=c)}}h.pushWord(a)},"populate"),J=l((t,e,a)=>{if(t.end===void 0&&(t.end=t.start),t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*a?[t,void 0]:[{start:t.start,end:e*a-1,label:t.label},{start:e*a,end:t.end,label:t.label}]},"getNextFittingBlock"),Q={parse:l(async t=>{const e=await I("packet",t);y.debug(e),X(e)},"parse")},V=l((t,e,a,n)=>{const i=n.db,o=i.getConfig(),{rowHeight:r,paddingY:p,bitWidth:b,bitsPerRow:c}=o,u=i.getPacket(),s=i.getDiagramTitle(),g=r+p,d=g*(u.length+1)-(s?0:r),k=b*c+2,f=U(e);f.attr("viewbox",`0 0 ${k} ${d}`),Y(f,d,k,o.useMaxWidth);for(const[B,S]of u.entries())Z(f,S,B,o);f.append("text").text(s).attr("x",k/2).attr("y",d-g/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),Z=l((t,e,a,{rowHeight:n,paddingX:i,paddingY:o,bitWidth:r,bitsPerRow:p,showBits:b})=>{const c=t.append("g"),u=a*(n+o)+o;for(const s of e){const g=s.start%p*r+1,d=(s.end-s.start+1)*r-i;if(c.append("rect").attr("x",g).attr("y",u).attr("width",d).attr("height",n).attr("class","packetBlock"),c.append("text").attr("x",g+d/2).attr("y",u+n/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(s.label),!b)continue;const k=s.end===s.start,f=u-2;c.append("text").attr("x",g+(k?d/2:0)).attr("y",f).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",k?"middle":"start").text(s.start),k||c.append("text").attr("x",g+d).attr("y",f).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(s.end)}},"drawWord"),tt={draw:V},et={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},at=l(({packet:t}={})=>{const e=$(et,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles"),dt={parser:Q,db:h,renderer:tt,styles:at};export{dt as diagram};
