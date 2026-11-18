window.createPracticeTree=()=>{const groups={baidu:{point:[-2.7,6.15,1.8]},jd:{point:[2.65,7.25,1.2]}};
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),lerp=(a,b,t)=>a+(b-a)*t,smooth=t=>t*t*(3-2*t),add=(a,b)=>a.map((v,i)=>v+b[i]),scale=(a,n)=>a.map(v=>v*n),mix=(a,b,t)=>a.map((v,i)=>lerp(v,b[i],t)),norm=a=>scale(a,1/(Math.hypot(...a)||1));
let seed=2026;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const branches=[],foliage=[],roots=[],ground=[];
function branch(points,r,depth=0){branches.push({points,r,depth});}
const trunk=[];for(let i=0;i<=30;i++){const y=i/30*8.5;trunk.push([Math.sin(y*.65)*.16,y,Math.cos(y*.5)*.12])}branch(trunk,.18,0);
function grow(base,direction,length,depth,phase){const points=[base],dir=norm(direction);for(let j=1;j<=7;j++){const t=j/7;points.push(add(base,[dir[0]*length*t+Math.sin(t*Math.PI)*.12*Math.cos(phase),dir[1]*length*t+length*.18*t*t,dir[2]*length*t+Math.sin(t*Math.PI)*.12*Math.sin(phase)]))}branch(points,depth===0?.075:depth===1?.033:.012,depth+1);const tip=points.at(-1);if(depth<2){for(let j=0;j<3;j++){const a=phase+j*2.399+(rand()-.5)*.8;grow(points[3+j],[dir[0]*.45+Math.cos(a)*.68,.32+rand()*.65,dir[2]*.45+Math.sin(a)*.68],length*(.48+rand()*.19),depth+1,a)}}else{for(let j=0;j<10;j++){const b=mix(points[3],tip,rand());const pos=add(b,[(rand()-.5)*.75,(rand()-.25)*.65,(rand()-.5)*.75]);foliage.push({pos,a:rand()*Math.PI*2,tilt:(rand()-.5)*3.0,size:.13+rand()*.21,phase:rand()*6.28})}}}
for(let i=0;i<16;i++){const y=2.8+i*.22,a=i*2.399;grow([Math.sin(y*.65)*.16,y,Math.cos(y*.5)*.12],[Math.cos(a),.20+rand()*.30,Math.sin(a)],3.3+(1-Math.abs(i-7)/10)*.9,0,a)}
for(let i=0;i<14;i++){const a=i/14*Math.PI*2,pts=[];for(let j=0;j<=15;j++){const t=j/15,r=t*(2.2+rand()*.07);pts.push([Math.cos(a+.10*Math.sin(t*3))*r,-.08-t*.70,Math.sin(a+.1*Math.sin(t*3))*r])}roots.push(pts)}
for(let i=0;i<14;i++){const a=i/14*Math.PI*2,pts=[];for(let j=0;j<=30;j++){const t=j/30,r=t*(3.8+(i%3)*.7);pts.push([Math.cos(a)*r,-.035+Math.sin(t*12+i)*.025,Math.sin(a)*r])}ground.push(pts)}
for(let i=0;i<5;i++){const pts=[];for(let j=0;j<=140;j++){const a=j/140*Math.PI*2,r=2+i*.65+.18*Math.sin(a*3+i);pts.push([Math.cos(a)*r,-.055,Math.sin(a)*r*.80])}ground.push(pts)}
for(const [key,g] of Object.entries(groups)){const p=g.point;branch([[0,3.8,0],[p[0]*.45,p[1]-.7,p[2]*.5],p],.035,1)}

return {branches,foliage,ground,roots};};