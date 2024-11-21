var er=Object.defineProperty,tr=Object.defineProperties;var ar=Object.getOwnPropertyDescriptors;var D=Object.getOwnPropertySymbols;var nr=Object.prototype.hasOwnProperty,sr=Object.prototype.propertyIsEnumerable;var K=(a,r,t)=>r in a?er(a,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[r]=t,H=(a,r)=>{for(var t in r||(r={}))nr.call(r,t)&&K(a,t,r[t]);if(D)for(var t of D(r))sr.call(r,t)&&K(a,t,r[t]);return a},V=(a,r)=>tr(a,ar(r));import{p as or}from"./chunk-BAOP5US2.18552d44.js";import{I as cr}from"./chunk-RGXPSUNZ.402213ba.js";import{aw as ir,_ as l,n as dr,ax as hr,ay as lr,az as $r,t as v,g as fr,h as yr,i as gr,k as xr,A as ur,B as pr,o as L,F as br,s as mr,E as wr,aA as vr}from"./vendor.c2a4d007.js";import{p as Cr}from"./mermaid-parser.core.5ec5b6ff.js";import"./_basePickBy.bfee314b.js";import"./_baseUniq.3e850cc2.js";import"./clone.5f0277c4.js";var u={NORMAL:0,REVERSE:1,HIGHLIGHT:2,MERGE:3,CHERRY_PICK:4},Br=ir.gitGraph,O=l(()=>hr(H(H({},Br),lr().gitGraph)),"getConfig"),i=new cr(()=>{const a=O(),r=a.mainBranchName,t=a.mainBranchOrder;return{mainBranchName:r,commits:new Map,head:null,branchConfig:new Map([[r,{name:r,order:t}]]),branches:new Map([[r,null]]),currBranch:r,direction:"LR",seq:0,options:{}}});function S(){return $r({length:7})}l(S,"getID");function X(a,r){const t=Object.create(null);return a.reduce((s,e)=>{const n=r(e);return t[n]||(t[n]=!0,s.push(e)),s},[])}l(X,"uniqBy");var Er=l(function(a){i.records.direction=a},"setDirection"),kr=l(function(a){v.debug("options str",a),a=a==null?void 0:a.trim(),a=a||"{}";try{i.records.options=JSON.parse(a)}catch(r){v.error("error while parsing gitGraph options",r.message)}},"setOptions"),Lr=l(function(){return i.records.options},"getOptions"),Tr=l(function(a){let r=a.msg,t=a.id;const s=a.type;let e=a.tags;v.info("commit",r,t,s,e),v.debug("Entering commit:",r,t,s,e);const n=O();t=L.sanitizeText(t,n),r=L.sanitizeText(r,n),e=e==null?void 0:e.map(o=>L.sanitizeText(o,n));const c={id:t||i.records.seq+"-"+S(),message:r,seq:i.records.seq++,type:s!=null?s:u.NORMAL,tags:e!=null?e:[],parents:i.records.head==null?[]:[i.records.head.id],branch:i.records.currBranch};i.records.head=c,v.info("main branch",n.mainBranchName),i.records.commits.set(c.id,c),i.records.branches.set(i.records.currBranch,c.id),v.debug("in pushCommit "+c.id)},"commit"),Mr=l(function(a){let r=a.name;const t=a.order;if(r=L.sanitizeText(r,O()),i.records.branches.has(r))throw new Error(`Trying to create an existing branch. (Help: Either use a new name if you want create a new branch or try using "checkout ${r}")`);i.records.branches.set(r,i.records.head!=null?i.records.head.id:null),i.records.branchConfig.set(r,{name:r,order:t}),J(r),v.debug("in createBranch")},"branch"),Rr=l(a=>{let r=a.branch,t=a.id;const s=a.type,e=a.tags,n=O();r=L.sanitizeText(r,n),t&&(t=L.sanitizeText(t,n));const c=i.records.branches.get(i.records.currBranch),o=i.records.branches.get(r),$=c?i.records.commits.get(c):void 0,h=o?i.records.commits.get(o):void 0;if($&&h&&$.branch===r)throw new Error(`Cannot merge branch '${r}' into itself.`);if(i.records.currBranch===r){const d=new Error('Incorrect usage of "merge". Cannot merge a branch to itself');throw d.hash={text:`merge ${r}`,token:`merge ${r}`,expected:["branch abc"]},d}if($===void 0||!$){const d=new Error(`Incorrect usage of "merge". Current branch (${i.records.currBranch})has no commits`);throw d.hash={text:`merge ${r}`,token:`merge ${r}`,expected:["commit"]},d}if(!i.records.branches.has(r)){const d=new Error('Incorrect usage of "merge". Branch to be merged ('+r+") does not exist");throw d.hash={text:`merge ${r}`,token:`merge ${r}`,expected:[`branch ${r}`]},d}if(h===void 0||!h){const d=new Error('Incorrect usage of "merge". Branch to be merged ('+r+") has no commits");throw d.hash={text:`merge ${r}`,token:`merge ${r}`,expected:['"commit"']},d}if($===h){const d=new Error('Incorrect usage of "merge". Both branches have same head');throw d.hash={text:`merge ${r}`,token:`merge ${r}`,expected:["branch abc"]},d}if(t&&i.records.commits.has(t)){const d=new Error('Incorrect usage of "merge". Commit with id:'+t+" already exists, use different custom Id");throw d.hash={text:`merge ${r} ${t} ${s} ${e==null?void 0:e.join(" ")}`,token:`merge ${r} ${t} ${s} ${e==null?void 0:e.join(" ")}`,expected:[`merge ${r} ${t}_UNIQUE ${s} ${e==null?void 0:e.join(" ")}`]},d}const f=o||"",x={id:t||`${i.records.seq}-${S()}`,message:`merged branch ${r} into ${i.records.currBranch}`,seq:i.records.seq++,parents:i.records.head==null?[]:[i.records.head.id,f],branch:i.records.currBranch,type:u.MERGE,customType:s,customId:!!t,tags:e!=null?e:[]};i.records.head=x,i.records.commits.set(x.id,x),i.records.branches.set(i.records.currBranch,x.id),v.debug(i.records.branches),v.debug("in mergeBranch")},"merge"),Ir=l(function(a){let r=a.id,t=a.targetId,s=a.tags,e=a.parent;v.debug("Entering cherryPick:",r,t,s);const n=O();if(r=L.sanitizeText(r,n),t=L.sanitizeText(t,n),s=s==null?void 0:s.map($=>L.sanitizeText($,n)),e=L.sanitizeText(e,n),!r||!i.records.commits.has(r)){const $=new Error('Incorrect usage of "cherryPick". Source commit id should exist and provided');throw $.hash={text:`cherryPick ${r} ${t}`,token:`cherryPick ${r} ${t}`,expected:["cherry-pick abc"]},$}const c=i.records.commits.get(r);if(c===void 0||!c)throw new Error('Incorrect usage of "cherryPick". Source commit id should exist and provided');if(e&&!(Array.isArray(c.parents)&&c.parents.includes(e)))throw new Error("Invalid operation: The specified parent commit is not an immediate parent of the cherry-picked commit.");const o=c.branch;if(c.type===u.MERGE&&!e)throw new Error("Incorrect usage of cherry-pick: If the source commit is a merge commit, an immediate parent commit must be specified.");if(!t||!i.records.commits.has(t)){if(o===i.records.currBranch){const x=new Error('Incorrect usage of "cherryPick". Source commit is already on current branch');throw x.hash={text:`cherryPick ${r} ${t}`,token:`cherryPick ${r} ${t}`,expected:["cherry-pick abc"]},x}const $=i.records.branches.get(i.records.currBranch);if($===void 0||!$){const x=new Error(`Incorrect usage of "cherry-pick". Current branch (${i.records.currBranch})has no commits`);throw x.hash={text:`cherryPick ${r} ${t}`,token:`cherryPick ${r} ${t}`,expected:["cherry-pick abc"]},x}const h=i.records.commits.get($);if(h===void 0||!h){const x=new Error(`Incorrect usage of "cherry-pick". Current branch (${i.records.currBranch})has no commits`);throw x.hash={text:`cherryPick ${r} ${t}`,token:`cherryPick ${r} ${t}`,expected:["cherry-pick abc"]},x}const f={id:i.records.seq+"-"+S(),message:`cherry-picked ${c==null?void 0:c.message} into ${i.records.currBranch}`,seq:i.records.seq++,parents:i.records.head==null?[]:[i.records.head.id,c.id],branch:i.records.currBranch,type:u.CHERRY_PICK,tags:s?s.filter(Boolean):[`cherry-pick:${c.id}${c.type===u.MERGE?`|parent:${e}`:""}`]};i.records.head=f,i.records.commits.set(f.id,f),i.records.branches.set(i.records.currBranch,f.id),v.debug(i.records.branches),v.debug("in cherryPick")}},"cherryPick"),J=l(function(a){var r;if(a=L.sanitizeText(a,O()),i.records.branches.has(a)){i.records.currBranch=a;const t=i.records.branches.get(i.records.currBranch);t===void 0||!t?i.records.head=null:i.records.head=(r=i.records.commits.get(t))!=null?r:null}else{const t=new Error(`Trying to checkout branch which is not yet created. (Help try using "branch ${a}")`);throw t.hash={text:`checkout ${a}`,token:`checkout ${a}`,expected:[`branch ${a}`]},t}},"checkout");function _(a,r,t){const s=a.indexOf(r);s===-1?a.push(t):a.splice(s,1,t)}l(_,"upsert");function N(a){const r=a.reduce((e,n)=>e.seq>n.seq?e:n,a[0]);let t="";a.forEach(function(e){e===r?t+="	*":t+="	|"});const s=[t,r.id,r.seq];for(const e in i.records.branches)i.records.branches.get(e)===r.id&&s.push(e);if(v.debug(s.join(" ")),r.parents&&r.parents.length==2&&r.parents[0]&&r.parents[1]){const e=i.records.commits.get(r.parents[0]);_(a,r,e),r.parents[1]&&a.push(i.records.commits.get(r.parents[1]))}else{if(r.parents.length==0)return;if(r.parents[0]){const e=i.records.commits.get(r.parents[0]);_(a,r,e)}}a=X(a,e=>e.id),N(a)}l(N,"prettyPrintCommitHistory");var qr=l(function(){v.debug(i.records.commits);const a=Q()[0];N([a])},"prettyPrint"),Or=l(function(){i.reset(),br()},"clear"),zr=l(function(){return[...i.records.branchConfig.values()].map((r,t)=>r.order!==null&&r.order!==void 0?r:V(H({},r),{order:parseFloat(`0.${t}`)})).sort((r,t)=>{var s,e;return((s=r.order)!=null?s:0)-((e=t.order)!=null?e:0)}).map(({name:r})=>({name:r}))},"getBranchesAsObjArray"),Pr=l(function(){return i.records.branches},"getBranches"),Gr=l(function(){return i.records.commits},"getCommits"),Q=l(function(){const a=[...i.records.commits.values()];return a.forEach(function(r){v.debug(r.id)}),a.sort((r,t)=>r.seq-t.seq),a},"getCommitsArray"),jr=l(function(){return i.records.currBranch},"getCurrentBranch"),Hr=l(function(){return i.records.direction},"getDirection"),Sr=l(function(){return i.records.head},"getHead"),Z={commitType:u,getConfig:O,setDirection:Er,setOptions:kr,getOptions:Lr,commit:Tr,branch:Mr,merge:Rr,cherryPick:Ir,checkout:J,prettyPrint:qr,clear:Or,getBranchesAsObjArray:zr,getBranches:Pr,getCommits:Gr,getCommitsArray:Q,getCurrentBranch:jr,getDirection:Hr,getHead:Sr,setAccTitle:fr,getAccTitle:yr,getAccDescription:gr,setAccDescription:xr,setDiagramTitle:ur,getDiagramTitle:pr},Wr=l((a,r)=>{or(a,r),a.dir&&r.setDirection(a.dir);for(const t of a.statements)Ar(t,r)},"populate"),Ar=l((a,r)=>{const s={Commit:l(e=>r.commit(_r(e)),"Commit"),Branch:l(e=>r.branch(Nr(e)),"Branch"),Merge:l(e=>r.merge(Yr(e)),"Merge"),Checkout:l(e=>r.checkout(Dr(e)),"Checkout"),CherryPicking:l(e=>r.cherryPick(Kr(e)),"CherryPicking")}[a.$type];s?s(a):v.error(`Unknown statement type: ${a.$type}`)},"parseStatement"),_r=l(a=>{var t,s;return{id:a.id,msg:(t=a.message)!=null?t:"",type:a.type!==void 0?u[a.type]:u.NORMAL,tags:(s=a.tags)!=null?s:void 0}},"parseCommit"),Nr=l(a=>{var t;return{name:a.name,order:(t=a.order)!=null?t:0}},"parseBranch"),Yr=l(a=>{var t,s;return{branch:a.branch,id:(t=a.id)!=null?t:"",type:a.type!==void 0?u[a.type]:void 0,tags:(s=a.tags)!=null?s:void 0}},"parseMerge"),Dr=l(a=>a.branch,"parseCheckout"),Kr=l(a=>{var t;return{id:a.id,targetId:"",tags:((t=a.tags)==null?void 0:t.length)===0?void 0:a.tags,parent:a.parent}},"parseCherryPicking"),Vr={parse:l(async a=>{const r=await Cr("gitGraph",a);v.debug(r),Wr(r,Z)},"parse")},Y=dr(),m=Y==null?void 0:Y.gitGraph,R=10,I=40,T=4,M=2,z=8,C=new Map,B=new Map,W=30,G=new Map,A=[],q=0,g="LR",Xr=l(()=>{C.clear(),B.clear(),G.clear(),q=0,A=[],g="LR"},"clear"),U=l(a=>{const r=document.createElementNS("http://www.w3.org/2000/svg","text");return(typeof a=="string"?a.split(/\\n|\n|<br\s*\/?>/gi):a).forEach(s=>{const e=document.createElementNS("http://www.w3.org/2000/svg","tspan");e.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),e.setAttribute("dy","1em"),e.setAttribute("x","0"),e.setAttribute("class","row"),e.textContent=s.trim(),r.appendChild(e)}),r},"drawText"),F=l(a=>{let r,t,s;return g==="BT"?(t=l((e,n)=>e<=n,"comparisonFunc"),s=1/0):(t=l((e,n)=>e>=n,"comparisonFunc"),s=0),a.forEach(e=>{var c,o;const n=g==="TB"||g=="BT"?(c=B.get(e))==null?void 0:c.y:(o=B.get(e))==null?void 0:o.x;n!==void 0&&t(n,s)&&(r=e,s=n)}),r},"findClosestParent"),Jr=l(a=>{let r="",t=1/0;return a.forEach(s=>{const e=B.get(s).y;e<=t&&(r=s,t=e)}),r||void 0},"findClosestParentBT"),Qr=l((a,r,t)=>{let s=t,e=t;const n=[];a.forEach(c=>{const o=r.get(c);if(!o)throw new Error(`Commit not found for key ${c}`);o.parents.length?(s=Ur(o),e=Math.max(s,e)):n.push(o),Fr(o,s)}),s=e,n.forEach(c=>{re(c,s,t)}),a.forEach(c=>{const o=r.get(c);if(o==null?void 0:o.parents.length){const $=Jr(o.parents);s=B.get($).y-I,s<=e&&(e=s);const h=C.get(o.branch).pos,f=s-R;B.set(o.id,{x:h,y:f})}})},"setParallelBTPos"),Zr=l(a=>{var s;const r=F(a.parents.filter(e=>e!==null));if(!r)throw new Error(`Closest parent not found for commit ${a.id}`);const t=(s=B.get(r))==null?void 0:s.y;if(t===void 0)throw new Error(`Closest parent position not found for commit ${a.id}`);return t},"findClosestParentPos"),Ur=l(a=>Zr(a)+I,"calculateCommitPosition"),Fr=l((a,r)=>{const t=C.get(a.branch);if(!t)throw new Error(`Branch not found for commit ${a.id}`);const s=t.pos,e=r+R;return B.set(a.id,{x:s,y:e}),{x:s,y:e}},"setCommitPosition"),re=l((a,r,t)=>{const s=C.get(a.branch);if(!s)throw new Error(`Branch not found for commit ${a.id}`);const e=r+t,n=s.pos;B.set(a.id,{x:n,y:e})},"setRootPosition"),ee=l((a,r,t,s,e,n)=>{if(n===u.HIGHLIGHT)a.append("rect").attr("x",t.x-10).attr("y",t.y-10).attr("width",20).attr("height",20).attr("class",`commit ${r.id} commit-highlight${e%z} ${s}-outer`),a.append("rect").attr("x",t.x-6).attr("y",t.y-6).attr("width",12).attr("height",12).attr("class",`commit ${r.id} commit${e%z} ${s}-inner`);else if(n===u.CHERRY_PICK)a.append("circle").attr("cx",t.x).attr("cy",t.y).attr("r",10).attr("class",`commit ${r.id} ${s}`),a.append("circle").attr("cx",t.x-3).attr("cy",t.y+2).attr("r",2.75).attr("fill","#fff").attr("class",`commit ${r.id} ${s}`),a.append("circle").attr("cx",t.x+3).attr("cy",t.y+2).attr("r",2.75).attr("fill","#fff").attr("class",`commit ${r.id} ${s}`),a.append("line").attr("x1",t.x+3).attr("y1",t.y+1).attr("x2",t.x).attr("y2",t.y-5).attr("stroke","#fff").attr("class",`commit ${r.id} ${s}`),a.append("line").attr("x1",t.x-3).attr("y1",t.y+1).attr("x2",t.x).attr("y2",t.y-5).attr("stroke","#fff").attr("class",`commit ${r.id} ${s}`);else{const c=a.append("circle");if(c.attr("cx",t.x),c.attr("cy",t.y),c.attr("r",r.type===u.MERGE?9:10),c.attr("class",`commit ${r.id} commit${e%z}`),n===u.MERGE){const o=a.append("circle");o.attr("cx",t.x),o.attr("cy",t.y),o.attr("r",6),o.attr("class",`commit ${s} ${r.id} commit${e%z}`)}n===u.REVERSE&&a.append("path").attr("d",`M ${t.x-5},${t.y-5}L${t.x+5},${t.y+5}M${t.x-5},${t.y+5}L${t.x+5},${t.y-5}`).attr("class",`commit ${s} ${r.id} commit${e%z}`)}},"drawCommitBullet"),te=l((a,r,t,s)=>{var e;if(r.type!==u.CHERRY_PICK&&(r.customId&&r.type===u.MERGE||r.type!==u.MERGE)&&(m==null?void 0:m.showCommitLabel)){const n=a.append("g"),c=n.insert("rect").attr("class","commit-label-bkg"),o=n.append("text").attr("x",s).attr("y",t.y+25).attr("class","commit-label").text(r.id),$=(e=o.node())==null?void 0:e.getBBox();if($&&(c.attr("x",t.posWithOffset-$.width/2-M).attr("y",t.y+13.5).attr("width",$.width+2*M).attr("height",$.height+2*M),g==="TB"||g==="BT"?(c.attr("x",t.x-($.width+4*T+5)).attr("y",t.y-12),o.attr("x",t.x-($.width+4*T)).attr("y",t.y+$.height-12)):o.attr("x",t.posWithOffset-$.width/2),m.rotateCommitLabel))if(g==="TB"||g==="BT")o.attr("transform","rotate(-45, "+t.x+", "+t.y+")"),c.attr("transform","rotate(-45, "+t.x+", "+t.y+")");else{const h=-7.5-($.width+10)/25*9.5,f=10+$.width/25*8.5;n.attr("transform","translate("+h+", "+f+") rotate(-45, "+s+", "+t.y+")")}}},"drawCommitLabel"),ae=l((a,r,t,s)=>{var e;if(r.tags.length>0){let n=0,c=0,o=0;const $=[];for(const h of r.tags.reverse()){const f=a.insert("polygon"),x=a.append("circle"),d=a.append("text").attr("y",t.y-16-n).attr("class","tag-label").text(h),y=(e=d.node())==null?void 0:e.getBBox();if(!y)throw new Error("Tag bbox not found");c=Math.max(c,y.width),o=Math.max(o,y.height),d.attr("x",t.posWithOffset-y.width/2),$.push({tag:d,hole:x,rect:f,yOffset:n}),n+=20}for(const{tag:h,hole:f,rect:x,yOffset:d}of $){const y=o/2,p=t.y-19.2-d;if(x.attr("class","tag-label-bkg").attr("points",`
      ${s-c/2-T/2},${p+M}  
      ${s-c/2-T/2},${p-M}
      ${t.posWithOffset-c/2-T},${p-y-M}
      ${t.posWithOffset+c/2+T},${p-y-M}
      ${t.posWithOffset+c/2+T},${p+y+M}
      ${t.posWithOffset-c/2-T},${p+y+M}`),f.attr("cy",p).attr("cx",s-c/2+T/2).attr("r",1.5).attr("class","tag-hole"),g==="TB"||g==="BT"){const b=s+d;x.attr("class","tag-label-bkg").attr("points",`
        ${t.x},${b+2}
        ${t.x},${b-2}
        ${t.x+R},${b-y-2}
        ${t.x+R+c+4},${b-y-2}
        ${t.x+R+c+4},${b+y+2}
        ${t.x+R},${b+y+2}`).attr("transform","translate(12,12) rotate(45, "+t.x+","+s+")"),f.attr("cx",t.x+T/2).attr("cy",b).attr("transform","translate(12,12) rotate(45, "+t.x+","+s+")"),h.attr("x",t.x+5).attr("y",b+3).attr("transform","translate(14,14) rotate(45, "+t.x+","+s+")")}}}},"drawCommitTags"),ne=l(a=>{var t;switch((t=a.customType)!=null?t:a.type){case u.NORMAL:return"commit-normal";case u.REVERSE:return"commit-reverse";case u.HIGHLIGHT:return"commit-highlight";case u.MERGE:return"commit-merge";case u.CHERRY_PICK:return"commit-cherry-pick";default:return"commit-normal"}},"getCommitClassType"),se=l((a,r,t,s)=>{var n,c,o;const e={x:0,y:0};if(a.parents.length>0){const $=F(a.parents);if($){const h=(n=s.get($))!=null?n:e;return r==="TB"?h.y+I:r==="BT"?((c=s.get(a.id))!=null?c:e).y-I:h.x+I}}else return r==="TB"?W:r==="BT"?((o=s.get(a.id))!=null?o:e).y-I:0;return 0},"calculatePosition"),oe=l((a,r,t)=>{var c,o;const s=g==="BT"&&t?r:r+R,e=g==="TB"||g==="BT"?s:(c=C.get(a.branch))==null?void 0:c.pos,n=g==="TB"||g==="BT"?(o=C.get(a.branch))==null?void 0:o.pos:s;if(n===void 0||e===void 0)throw new Error(`Position were undefined for commit ${a.id}`);return{x:n,y:e,posWithOffset:s}},"getCommitPosition"),rr=l((a,r,t)=>{var f;if(!m)throw new Error("GitGraph config not found");const s=a.append("g").attr("class","commit-bullets"),e=a.append("g").attr("class","commit-labels");let n=g==="TB"||g==="BT"?W:0;const c=[...r.keys()],o=(f=m==null?void 0:m.parallelCommits)!=null?f:!1,$=l((x,d)=>{var b,k;const y=(b=r.get(x))==null?void 0:b.seq,p=(k=r.get(d))==null?void 0:k.seq;return y!==void 0&&p!==void 0?y-p:0},"sortKeys");let h=c.sort($);g==="BT"&&(o&&Qr(h,r,n),h=h.reverse()),h.forEach(x=>{var p,b,k;const d=r.get(x);if(!d)throw new Error(`Commit not found for key ${x}`);o&&(n=se(d,g,n,B));const y=oe(d,n,o);if(t){const P=ne(d),E=(p=d.customType)!=null?p:d.type,w=(k=(b=C.get(d.branch))==null?void 0:b.index)!=null?k:0;ee(s,d,y,P,w,E),te(e,d,y,n),ae(e,d,y,n)}g==="TB"||g==="BT"?B.set(d.id,{x:y.x,y:y.posWithOffset}):B.set(d.id,{x:y.posWithOffset,y:y.y}),n=g==="BT"&&o?n+I:n+I+R,n>q&&(q=n)})},"drawCommits"),ce=l((a,r,t,s,e)=>{const c=(g==="TB"||g==="BT"?t.x<s.x:t.y<s.y)?r.branch:a.branch,o=l(h=>h.branch===c,"isOnBranchToGetCurve"),$=l(h=>h.seq>a.seq&&h.seq<r.seq,"isBetweenCommits");return[...e.values()].some(h=>$(h)&&o(h))},"shouldRerouteArrow"),j=l((a,r,t=0)=>{const s=a+Math.abs(a-r)/2;if(t>5)return s;if(A.every(c=>Math.abs(c-s)>=10))return A.push(s),s;const n=Math.abs(a-r);return j(a,r-n/5,t+1)},"findLane"),ie=l((a,r,t,s)=>{var y,p,b,k,P;const e=B.get(r.id),n=B.get(t.id);if(e===void 0||n===void 0)throw new Error(`Commit positions not found for commits ${r.id} and ${t.id}`);const c=ce(r,t,e,n,s);let o="",$="",h=0,f=0,x=(y=C.get(t.branch))==null?void 0:y.index;t.type===u.MERGE&&r.id!==t.parents[0]&&(x=(p=C.get(r.branch))==null?void 0:p.index);let d;if(c){o="A 10 10, 0, 0, 0,",$="A 10 10, 0, 0, 1,",h=10,f=10;const E=e.y<n.y?j(e.y,n.y):j(n.y,e.y),w=e.x<n.x?j(e.x,n.x):j(n.x,e.x);g==="TB"?e.x<n.x?d=`M ${e.x} ${e.y} L ${w-h} ${e.y} ${$} ${w} ${e.y+f} L ${w} ${n.y-h} ${o} ${w+f} ${n.y} L ${n.x} ${n.y}`:(x=(b=C.get(r.branch))==null?void 0:b.index,d=`M ${e.x} ${e.y} L ${w+h} ${e.y} ${o} ${w} ${e.y+f} L ${w} ${n.y-h} ${$} ${w-f} ${n.y} L ${n.x} ${n.y}`):g==="BT"?e.x<n.x?d=`M ${e.x} ${e.y} L ${w-h} ${e.y} ${o} ${w} ${e.y-f} L ${w} ${n.y+h} ${$} ${w+f} ${n.y} L ${n.x} ${n.y}`:(x=(k=C.get(r.branch))==null?void 0:k.index,d=`M ${e.x} ${e.y} L ${w+h} ${e.y} ${$} ${w} ${e.y-f} L ${w} ${n.y+h} ${o} ${w-f} ${n.y} L ${n.x} ${n.y}`):e.y<n.y?d=`M ${e.x} ${e.y} L ${e.x} ${E-h} ${o} ${e.x+f} ${E} L ${n.x-h} ${E} ${$} ${n.x} ${E+f} L ${n.x} ${n.y}`:(x=(P=C.get(r.branch))==null?void 0:P.index,d=`M ${e.x} ${e.y} L ${e.x} ${E+h} ${$} ${e.x+f} ${E} L ${n.x-h} ${E} ${o} ${n.x} ${E-f} L ${n.x} ${n.y}`)}else o="A 20 20, 0, 0, 0,",$="A 20 20, 0, 0, 1,",h=20,f=20,g==="TB"?(e.x<n.x&&(t.type===u.MERGE&&r.id!==t.parents[0]?d=`M ${e.x} ${e.y} L ${e.x} ${n.y-h} ${o} ${e.x+f} ${n.y} L ${n.x} ${n.y}`:d=`M ${e.x} ${e.y} L ${n.x-h} ${e.y} ${$} ${n.x} ${e.y+f} L ${n.x} ${n.y}`),e.x>n.x&&(o="A 20 20, 0, 0, 0,",$="A 20 20, 0, 0, 1,",h=20,f=20,t.type===u.MERGE&&r.id!==t.parents[0]?d=`M ${e.x} ${e.y} L ${e.x} ${n.y-h} ${$} ${e.x-f} ${n.y} L ${n.x} ${n.y}`:d=`M ${e.x} ${e.y} L ${n.x+h} ${e.y} ${o} ${n.x} ${e.y+f} L ${n.x} ${n.y}`),e.x===n.x&&(d=`M ${e.x} ${e.y} L ${n.x} ${n.y}`)):g==="BT"?(e.x<n.x&&(t.type===u.MERGE&&r.id!==t.parents[0]?d=`M ${e.x} ${e.y} L ${e.x} ${n.y+h} ${$} ${e.x+f} ${n.y} L ${n.x} ${n.y}`:d=`M ${e.x} ${e.y} L ${n.x-h} ${e.y} ${o} ${n.x} ${e.y-f} L ${n.x} ${n.y}`),e.x>n.x&&(o="A 20 20, 0, 0, 0,",$="A 20 20, 0, 0, 1,",h=20,f=20,t.type===u.MERGE&&r.id!==t.parents[0]?d=`M ${e.x} ${e.y} L ${e.x} ${n.y+h} ${o} ${e.x-f} ${n.y} L ${n.x} ${n.y}`:d=`M ${e.x} ${e.y} L ${n.x-h} ${e.y} ${o} ${n.x} ${e.y-f} L ${n.x} ${n.y}`),e.x===n.x&&(d=`M ${e.x} ${e.y} L ${n.x} ${n.y}`)):(e.y<n.y&&(t.type===u.MERGE&&r.id!==t.parents[0]?d=`M ${e.x} ${e.y} L ${n.x-h} ${e.y} ${$} ${n.x} ${e.y+f} L ${n.x} ${n.y}`:d=`M ${e.x} ${e.y} L ${e.x} ${n.y-h} ${o} ${e.x+f} ${n.y} L ${n.x} ${n.y}`),e.y>n.y&&(t.type===u.MERGE&&r.id!==t.parents[0]?d=`M ${e.x} ${e.y} L ${n.x-h} ${e.y} ${o} ${n.x} ${e.y-f} L ${n.x} ${n.y}`:d=`M ${e.x} ${e.y} L ${e.x} ${n.y+h} ${$} ${e.x+f} ${n.y} L ${n.x} ${n.y}`),e.y===n.y&&(d=`M ${e.x} ${e.y} L ${n.x} ${n.y}`));if(d===void 0)throw new Error("Line definition not found");a.append("path").attr("d",d).attr("class","arrow arrow"+x%z)},"drawArrow"),de=l((a,r)=>{const t=a.append("g").attr("class","commit-arrows");[...r.keys()].forEach(s=>{const e=r.get(s);e.parents&&e.parents.length>0&&e.parents.forEach(n=>{ie(t,r.get(n),e,r)})})},"drawArrows"),he=l((a,r)=>{const t=a.append("g");r.forEach((s,e)=>{var p;const n=e%z,c=(p=C.get(s.name))==null?void 0:p.pos;if(c===void 0)throw new Error(`Position not found for branch ${s.name}`);const o=t.append("line");o.attr("x1",0),o.attr("y1",c),o.attr("x2",q),o.attr("y2",c),o.attr("class","branch branch"+n),g==="TB"?(o.attr("y1",W),o.attr("x1",c),o.attr("y2",q),o.attr("x2",c)):g==="BT"&&(o.attr("y1",q),o.attr("x1",c),o.attr("y2",W),o.attr("x2",c)),A.push(c);const $=s.name,h=U($),f=t.insert("rect"),d=t.insert("g").attr("class","branchLabel").insert("g").attr("class","label branch-label"+n);d.node().appendChild(h);const y=h.getBBox();f.attr("class","branchLabelBkg label"+n).attr("rx",4).attr("ry",4).attr("x",-y.width-4-((m==null?void 0:m.rotateCommitLabel)===!0?30:0)).attr("y",-y.height/2+8).attr("width",y.width+18).attr("height",y.height+4),d.attr("transform","translate("+(-y.width-14-((m==null?void 0:m.rotateCommitLabel)===!0?30:0))+", "+(c-y.height/2-1)+")"),g==="TB"?(f.attr("x",c-y.width/2-10).attr("y",0),d.attr("transform","translate("+(c-y.width/2-5)+", 0)")):g==="BT"?(f.attr("x",c-y.width/2-10).attr("y",q),d.attr("transform","translate("+(c-y.width/2-5)+", "+q+")")):f.attr("transform","translate(-19, "+(c-y.height/2)+")")})},"drawBranches"),le=l(function(a,r,t,s,e){return C.set(a,{pos:r,index:t}),r+=50+(e?40:0)+(g==="TB"||g==="BT"?s.width/2:0),r},"setBranchPosition"),$e=l(function(a,r,t,s){var h,f;if(Xr(),v.debug("in gitgraph renderer",a+`
`,"id:",r,t),!m)throw new Error("GitGraph config not found");const e=(h=m.rotateCommitLabel)!=null?h:!1,n=s.db;G=n.getCommits();const c=n.getBranchesAsObjArray();g=n.getDirection();const o=mr(`[id="${r}"]`);let $=0;c.forEach((x,d)=>{var E;const y=U(x.name),p=o.append("g"),b=p.insert("g").attr("class","branchLabel"),k=b.insert("g").attr("class","label branch-label");(E=k.node())==null||E.appendChild(y);const P=y.getBBox();$=le(x.name,$,d,P,e),k.remove(),b.remove(),p.remove()}),rr(o,G,!1),m.showBranches&&he(o,c),de(o,G),rr(o,G,!0),wr.insertTitle(o,"gitTitleText",(f=m.titleTopMargin)!=null?f:0,n.getDiagramTitle()),vr(void 0,o,m.diagramPadding,m.useMaxWidth)},"draw"),fe={draw:$e},ye=l(a=>`
  .commit-id,
  .commit-msg,
  .branch-label {
    fill: lightgrey;
    color: lightgrey;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  ${[0,1,2,3,4,5,6,7].map(r=>`
        .branch-label${r} { fill: ${a["gitBranchLabel"+r]}; }
        .commit${r} { stroke: ${a["git"+r]}; fill: ${a["git"+r]}; }
        .commit-highlight${r} { stroke: ${a["gitInv"+r]}; fill: ${a["gitInv"+r]}; }
        .label${r}  { fill: ${a["git"+r]}; }
        .arrow${r} { stroke: ${a["git"+r]}; }
        `).join(`
`)}

  .branch {
    stroke-width: 1;
    stroke: ${a.lineColor};
    stroke-dasharray: 2;
  }
  .commit-label { font-size: ${a.commitLabelFontSize}; fill: ${a.commitLabelColor};}
  .commit-label-bkg { font-size: ${a.commitLabelFontSize}; fill: ${a.commitLabelBackground}; opacity: 0.5; }
  .tag-label { font-size: ${a.tagLabelFontSize}; fill: ${a.tagLabelColor};}
  .tag-label-bkg { fill: ${a.tagLabelBackground}; stroke: ${a.tagLabelBorder}; }
  .tag-hole { fill: ${a.textColor}; }

  .commit-merge {
    stroke: ${a.primaryColor};
    fill: ${a.primaryColor};
  }
  .commit-reverse {
    stroke: ${a.primaryColor};
    fill: ${a.primaryColor};
    stroke-width: 3;
  }
  .commit-highlight-outer {
  }
  .commit-highlight-inner {
    stroke: ${a.primaryColor};
    fill: ${a.primaryColor};
  }

  .arrow { stroke-width: 8; stroke-linecap: round; fill: none}
  .gitTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${a.textColor};
  }
`,"getStyles"),ge=ye,Be={parser:Vr,db:Z,renderer:fe,styles:ge};export{Be as diagram};
