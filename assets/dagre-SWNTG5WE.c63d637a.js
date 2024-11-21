var q=Object.defineProperty,U=Object.defineProperties;var V=Object.getOwnPropertyDescriptors;var k=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable;var B=(e,t,n)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,P=(e,t)=>{for(var n in t||(t={}))z.call(t,n)&&B(e,n,t[n]);if(k)for(var n of k(t))$.call(t,n)&&B(e,n,t[n]);return e},A=(e,t)=>U(e,V(t));import{_ as b,bx as K,by as Q,bz as W,bA as Z,t as i,n as I,bB as L,bC as ee,bl as ne,bq as te,bm as J,bk as se,bD as ie,bE as re,bF as oe}from"./vendor.c2a4d007.js";import{G as j}from"./graph.4fb06faf.js";import{l as ce}from"./layout.4a69ae5a.js";import{m as G}from"./_basePickBy.bfee314b.js";import{c as ae}from"./clone.5f0277c4.js";import{i as S}from"./_baseUniq.3e850cc2.js";function E(e){var t={options:{directed:e.isDirected(),multigraph:e.isMultigraph(),compound:e.isCompound()},nodes:de(e),edges:le(e)};return S(e.graph())||(t.value=ae(e.graph())),t}function de(e){return G(e.nodes(),function(t){var n=e.node(t),o=e.parent(t),a={v:t};return S(n)||(a.value=n),S(o)||(a.parent=o),a})}function le(e){return G(e.edges(),function(t){var n=e.edge(t),o={v:t.v,w:t.w};return S(t.name)||(o.name=t.name),S(n)||(o.value=n),o})}var f=new Map,N=new Map,R=new Map,fe=b(()=>{N.clear(),R.clear(),f.clear()},"clear"),O=b((e,t)=>{const n=N.get(t)||[];return i.trace("In isDescendant",t," ",e," = ",n.includes(e)),n.includes(e)},"isDescendant"),ue=b((e,t)=>{const n=N.get(t)||[];return i.info("Descendants of ",t," is ",n),i.info("Edge is ",e),e.v===t||e.w===t?!1:n?n.includes(e.v)||O(e.v,t)||O(e.w,t)||n.includes(e.w):(i.debug("Tilt, ",t,",not in descendants"),!1)},"edgeInCluster"),T=b((e,t,n,o)=>{i.warn("Copying children of ",e,"root",o,"data",t.node(e),o);const a=t.children(e)||[];e!==o&&a.push(e),i.warn("Copying (nodes) clusterId",e,"nodes",a),a.forEach(c=>{if(t.children(c).length>0)T(c,t,n,o);else{const r=t.node(c);i.info("cp ",c," to ",o," with parent ",e),n.setNode(c,r),o!==t.parent(c)&&(i.warn("Setting parent",c,t.parent(c)),n.setParent(c,t.parent(c))),e!==o&&c!==e?(i.debug("Setting parent",c,e),n.setParent(c,e)):(i.info("In copy ",e,"root",o,"data",t.node(e),o),i.debug("Not Setting parent for node=",c,"cluster!==rootId",e!==o,"node!==clusterId",c!==e));const u=t.edges(c);i.debug("Copying Edges",u),u.forEach(l=>{i.info("Edge",l);const v=t.edge(l.v,l.w,l.name);i.info("Edge data",v,o);try{ue(l,o)?(i.info("Copying as ",l.v,l.w,v,l.name),n.setEdge(l.v,l.w,v,l.name),i.info("newGraph edges ",n.edges(),n.edge(n.edges()[0]))):i.info("Skipping copy of edge ",l.v,"-->",l.w," rootId: ",o," clusterId:",e)}catch(C){i.error(C)}})}i.debug("Removing node",c),t.removeNode(c)})},"copy"),M=b((e,t)=>{const n=t.children(e);let o=[...n];for(const a of n)R.set(a,e),o=[...o,...M(a,t)];return o},"extractDescendants"),ge=b((e,t,n)=>{const o=e.edges().filter(l=>l.v===t||l.w===t),a=e.edges().filter(l=>l.v===n||l.w===n),c=o.map(l=>({v:l.v===t?n:l.v,w:l.w===t?t:l.w})),r=a.map(l=>({v:l.v,w:l.w}));return c.filter(l=>r.some(v=>l.v===v.v&&l.w===v.w))},"findCommonEdges"),D=b((e,t,n)=>{const o=t.children(e);if(i.trace("Searching children of id ",e,o),o.length<1)return e;let a;for(const c of o){const r=D(c,t,n),u=ge(t,n,r);if(r)if(u.length>0)a=r;else return r}return a},"findNonClusterChild"),_=b(e=>!f.has(e)||!f.get(e).externalConnections?e:f.has(e)?f.get(e).id:e,"getAnchorId"),we=b((e,t)=>{if(!e||t>10){i.debug("Opting out, no graph ");return}else i.debug("Opting in, graph ");e.nodes().forEach(function(n){e.children(n).length>0&&(i.warn("Cluster identified",n," Replacement id in edges: ",D(n,e,n)),N.set(n,M(n,e)),f.set(n,{id:D(n,e,n),clusterData:e.node(n)}))}),e.nodes().forEach(function(n){const o=e.children(n),a=e.edges();o.length>0?(i.debug("Cluster identified",n,N),a.forEach(c=>{const r=O(c.v,n),u=O(c.w,n);r^u&&(i.warn("Edge: ",c," leaves cluster ",n),i.warn("Descendants of XXX ",n,": ",N.get(n)),f.get(n).externalConnections=!0)})):i.debug("Not a cluster ",n,N)});for(let n of f.keys()){const o=f.get(n).id,a=e.parent(o);a!==n&&f.has(a)&&!f.get(a).externalConnections&&(f.get(n).id=a)}e.edges().forEach(function(n){const o=e.edge(n);i.warn("Edge "+n.v+" -> "+n.w+": "+JSON.stringify(n)),i.warn("Edge "+n.v+" -> "+n.w+": "+JSON.stringify(e.edge(n)));let a=n.v,c=n.w;if(i.warn("Fix XXX",f,"ids:",n.v,n.w,"Translating: ",f.get(n.v)," --- ",f.get(n.w)),f.get(n.v)||f.get(n.w)){if(i.warn("Fixing and trying - removing XXX",n.v,n.w,n.name),a=_(n.v),c=_(n.w),e.removeEdge(n.v,n.w,n.name),a!==n.v){const r=e.parent(a);f.get(r).externalConnections=!0,o.fromCluster=n.v}if(c!==n.w){const r=e.parent(c);f.get(r).externalConnections=!0,o.toCluster=n.w}i.warn("Fix Replacing with XXX",a,c,n.name),e.setEdge(a,c,o,n.name)}}),i.warn("Adjusted Graph",E(e)),F(e,0),i.trace(f)},"adjustClustersAndEdges"),F=b((e,t)=>{var a,c;if(i.warn("extractor - ",t,E(e),e.children("D")),t>10){i.error("Bailing out");return}let n=e.nodes(),o=!1;for(const r of n){const u=e.children(r);o=o||u.length>0}if(!o){i.debug("Done, no node has children",e.nodes());return}i.debug("Nodes = ",n,t);for(const r of n)if(i.debug("Extracting node",r,f,f.has(r)&&!f.get(r).externalConnections,!e.parent(r),e.node(r),e.children("D")," Depth ",t),!f.has(r))i.debug("Not a cluster",r,t);else if(!f.get(r).externalConnections&&e.children(r)&&e.children(r).length>0){i.warn("Cluster without external connections, without a parent and with children",r,t);let l=e.graph().rankdir==="TB"?"LR":"TB";((c=(a=f.get(r))==null?void 0:a.clusterData)==null?void 0:c.dir)&&(l=f.get(r).clusterData.dir,i.warn("Fixing dir",f.get(r).clusterData.dir,l));const v=new j({multigraph:!0,compound:!0}).setGraph({rankdir:l,nodesep:50,ranksep:50,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}});i.warn("Old graph before copy",E(e)),T(r,e,v,r),e.setNode(r,{clusterNode:!0,id:r,clusterData:f.get(r).clusterData,label:f.get(r).label,graph:v}),i.warn("New graph after copy node: (",r,")",E(v)),i.debug("Old graph after copy",E(e))}else i.warn("Cluster ** ",r," **not meeting the criteria !externalConnections:",!f.get(r).externalConnections," no parent: ",!e.parent(r)," children ",e.children(r)&&e.children(r).length>0,e.children("D"),t),i.debug(f);n=e.nodes(),i.warn("New list of nodes",n);for(const r of n){const u=e.node(r);i.warn(" Now next level",r,u),(u==null?void 0:u.clusterNode)&&F(u.graph,t+1)}},"extractor"),Y=b((e,t)=>{if(t.length===0)return[];let n=Object.assign([],t);return t.forEach(o=>{const a=e.children(o),c=Y(e,a);n=[...n,...c]}),n},"sorter"),me=b(e=>Y(e,e.children()),"sortNodesByHierarchy"),H=b(async(e,t,n,o,a,c)=>{i.warn("Graph in recursive render:XAX",E(t),a);const r=t.graph().rankdir;i.trace("Dir in recursive render - dir:",r);const u=e.insert("g").attr("class","root");t.nodes()?i.info("Recursive render XXX",t.nodes()):i.info("No nodes found for",t),t.edges().length>0&&i.info("Recursive edges",t.edge(t.edges()[0]));const l=u.insert("g").attr("class","clusters"),v=u.insert("g").attr("class","edgePaths"),C=u.insert("g").attr("class","edgeLabels"),g=u.insert("g").attr("class","nodes");await Promise.all(t.nodes().map(async function(d){const s=t.node(d);if(a!==void 0){const m=JSON.parse(JSON.stringify(a.clusterData));i.trace(`Setting data for parent cluster XXX
 Node.id = `,d,`
 data=`,m.height,`
Parent cluster`,a.height),t.setNode(a.id,m),t.parent(d)||(i.trace("Setting parent",d,a.id),t.setParent(d,a.id,m))}if(i.info("(Insert) Node XXX"+d+": "+JSON.stringify(t.node(d))),s==null?void 0:s.clusterNode){i.info("Cluster identified XBX",d,s.width,t.node(d));const{ranksep:m,nodesep:h}=t.graph();s.graph.setGraph(A(P({},s.graph.graph()),{ranksep:m+25,nodesep:h}));const p=await H(g,s.graph,n,o,t.node(d),c),x=p.elem;L(s,x),s.diff=p.diff||0,i.info("New compound node after recursive render XAX",d,"width",s.width,"height",s.height),ee(x,s)}else t.children(d).length>0?(i.trace("Cluster - the non recursive path XBX",d,s.id,s,s.width,"Graph:",t),i.trace(D(s.id,t)),f.set(s.id,{id:D(s.id,t),node:s})):(i.trace("Node - the non recursive path XAX",d,g,t.node(d),r),await ne(g,t.node(d),{config:c,dir:r}))})),await b(async()=>{const d=t.edges().map(async function(s){const m=t.edge(s.v,s.w,s.name);i.info("Edge "+s.v+" -> "+s.w+": "+JSON.stringify(s)),i.info("Edge "+s.v+" -> "+s.w+": ",s," ",JSON.stringify(t.edge(s))),i.info("Fix",f,"ids:",s.v,s.w,"Translating: ",f.get(s.v),f.get(s.w)),await oe(C,m)});await Promise.all(d)},"processEdges")(),i.info("Graph before layout:",JSON.stringify(E(t))),i.info("############################################# XXX"),i.info("###                Layout                 ### XXX"),i.info("############################################# XXX"),ce(t),i.info("Graph after layout:",JSON.stringify(E(t)));let y=0,{subGraphTitleTotalMargin:X}=te(c);return await Promise.all(me(t).map(async function(d){var m;const s=t.node(d);if(i.info("Position XBX => "+d+": ("+s.x,","+s.y,") width: ",s.width," height: ",s.height),s==null?void 0:s.clusterNode)s.y+=X,i.info("A tainted cluster node XBX1",d,s.id,s.width,s.height,s.x,s.y,t.parent(d)),f.get(s.id).node=s,J(s);else if(t.children(d).length>0){i.info("A pure cluster node XBX1",d,s.id,s.x,s.y,s.width,s.height,t.parent(d)),s.height+=X,t.node(s.parentId);const h=(s==null?void 0:s.padding)/2||0,p=((m=s==null?void 0:s.labelBBox)==null?void 0:m.height)||0,x=p-h||0;i.debug("OffsetY",x,"labelHeight",p,"halfPadding",h),await se(l,s),f.get(s.id).node=s}else{const h=t.node(s.parentId);s.y+=X/2,i.info("A regular node XBX1 - using the padding",s.id,"parent",s.parentId,s.width,s.height,s.x,s.y,"offsetY",s.offsetY,"parent",h,h==null?void 0:h.offsetY,s),J(s)}})),t.edges().forEach(function(d){const s=t.edge(d);i.info("Edge "+d.v+" -> "+d.w+": "+JSON.stringify(s),s),s.points.forEach(x=>x.y+=X/2);const m=t.node(d.v);var h=t.node(d.w);const p=ie(v,s,f,n,m,h,o);re(s,p)}),t.nodes().forEach(function(d){const s=t.node(d);i.info(d,s.type,s.diff),s.isGroup&&(y=s.diff)}),i.warn("Returning from recursive render XAX",u,y),{elem:u,diff:y}},"recursiveRender"),Ne=b(async(e,t)=>{var c,r,u,l,v,C;const n=new j({multigraph:!0,compound:!0}).setGraph({rankdir:e.direction,nodesep:((c=e.config)==null?void 0:c.nodeSpacing)||((u=(r=e.config)==null?void 0:r.flowchart)==null?void 0:u.nodeSpacing)||e.nodeSpacing,ranksep:((l=e.config)==null?void 0:l.rankSpacing)||((C=(v=e.config)==null?void 0:v.flowchart)==null?void 0:C.rankSpacing)||e.rankSpacing,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}}),o=t.select("g");K(o,e.markers,e.type,e.diagramId),Q(),W(),Z(),fe(),e.nodes.forEach(g=>{n.setNode(g.id,P({},g)),g.parentId&&n.setParent(g.id,g.parentId)}),i.debug("Edges:",e.edges),e.edges.forEach(g=>{if(g.start===g.end){const w=g.start,y=w+"---"+w+"---1",X=w+"---"+w+"---2",d=n.node(w);n.setNode(y,{domId:y,id:y,parentId:d.parentId,labelStyle:"",label:"",padding:0,shape:"labelRect",style:"",width:10,height:10}),n.setParent(y,d.parentId),n.setNode(X,{domId:X,id:X,parentId:d.parentId,labelStyle:"",padding:0,shape:"labelRect",label:"",style:"",width:10,height:10}),n.setParent(X,d.parentId);const s=structuredClone(g),m=structuredClone(g),h=structuredClone(g);s.label="",s.arrowTypeEnd="none",s.id=w+"-cyclic-special-1",m.arrowTypeEnd="none",m.id=w+"-cyclic-special-mid",h.label="",d.isGroup&&(s.fromCluster=w,h.toCluster=w),h.id=w+"-cyclic-special-2",n.setEdge(w,y,s,w+"-cyclic-special-0"),n.setEdge(y,X,m,w+"-cyclic-special-1"),n.setEdge(X,w,h,w+"-cyc<lic-special-2")}else n.setEdge(g.start,g.end,P({},g),g.id)}),i.warn("Graph at first:",JSON.stringify(E(n))),we(n),i.warn("Graph after XAX:",JSON.stringify(E(n)));const a=I();await H(o,n,e.type,e.diagramId,void 0,a)},"render");export{Ne as render};
