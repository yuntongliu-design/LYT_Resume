window.ParticleRibbon=function(canvas){
 const ctx=canvas.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let W=0,H=0;
 const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>x*x*(3-2*x);
 let seed=2027;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 const dots=Array.from({length:innerWidth<761?3500:11000},()=>({u:rand(),v:rand()*2-1,z:rand()*2-1,r:.3+rand()*.6,phase:rand()*6.283}));
 this.draw=(time,flight,stage,finaleAt)=>{
 if(W!==innerWidth||H!==innerHeight){W=innerWidth;H=innerHeight;const d=Math.min(devicePixelRatio,1.5);canvas.width=W*d;canvas.height=H*d;ctx.setTransform(d,0,0,d,0,0)}ctx.clearRect(0,0,W,H);
 const hero=stage===0||stage===11,boost=hero?1.8:1;const t=reduced?0:time*.00020,q=flight?clamp((time-flight.start)/flight.duration):0,energy=flight&&!reduced?Math.pow(Math.sin(q*Math.PI),1.4):0,finale=stage===11?.23*smooth(clamp((time-finaleAt)/3100)):0;
 const bins=Array.from({length:6},()=>[]);
 for(const n of dots){const u=(n.u+t*.024)%1,a=u*Math.PI*2,twist=a*1.7-t*.7,spread=Math.sqrt(Math.max(0,1-n.v*n.v));
 let x=(u*1.16-.08)*W,y=H*(stage===11?.96:hero?.86:.865)+Math.sin(a*1.25+t)*H*.026*boost+Math.sin(a*2.4-t*.65)*H*.013*boost+n.v*Math.cos(twist)*H*.024*boost+n.z*H*.006*boost;
 const phi=n.u*Math.PI*5.6+t*2,nr=(.12+.88*Math.sqrt(Math.abs(n.v)))*Math.min(W,H)*.23,tx=W*.73+Math.cos(phi)*nr,ty=H*.52+Math.sin(phi)*nr*.62+n.z*H*.06;
 x+=(tx-x)*energy;y+=(ty-y)*energy;
 if(finale){x+=(W*.75+(n.u-.5)*W*.30-x)*finale;y-=finale*H*.05}
 const edge=Math.pow(Math.sin(Math.PI*u),.5),alpha=(.22+.5*spread)*edge*(1-finale),b=Math.min(5,Math.floor(alpha*7));bins[b].push([x,y,n.r*(1+energy*.55)*(hero?1.25:1),alpha]);}
 ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<6;i++){ctx.fillStyle=`rgba(${i>3?'250,219,162':'189,145,72'},${(.08+i*.075)*(1-finale)*(hero?1.65:1)})`;ctx.beginPath();for(const [x,y,r]of bins[i]){ctx.moveTo(x+r,y);ctx.arc(x,y,r,0,Math.PI*2)}ctx.fill()}ctx.restore();canvas.dataset.motion=flight?'morph':'flow';
 };
};
