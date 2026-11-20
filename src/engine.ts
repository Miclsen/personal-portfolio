// Pixel-art canvas engine: bedroom, Headspace and Whitespace scenes.
// React owns the UI state and talks to this module through initEngine().
export type World = 'head' | 'white';
export type View = 'room' | World;
export interface ViewRef { v: View }
export interface EngineEvents {
  /** The sleep animation finished: show the chosen world. */
  enter: (k: World) => void;
  /** The wake-up animation finished: Jed is back at his desk. */
  woke: () => void;
}
export interface Engine {
  hover: (v: World | null) => void;
  go: (k: World) => void;
  wake: () => void;
}

const cvs = (id: string): HTMLCanvasElement => document.getElementById(id) as HTMLCanvasElement;

export function initEngine(EV: EngineEvents, VIEW: ViewRef): Engine {
// canvas
const cv=cvs('cv'),g=cv.getContext('2d')!;
const R=(x:number,y:number,w:number,h:number,c:string)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h)};
let st:string='idle',t0=0,hover:string|null=null,choice:{k:string;done?:number}|null=null,messy=0;
const SK='#f6d9c4',HR='#15121c',WH='#f6f4ff';
function room(t:number):void{
 R(0,0,160,72,'#7a58b0');for(let x=0;x<160;x+=8)R(x,0,4,68,'#7253a8');
 R(0,68,160,4,'#4b3478');R(0,72,160,28,'#35224f');for(let y=72;y<100;y+=8)R(0,y,160,1,'#2a1a40');
 R(56,86,50,11,'#9b78d6');R(58,88,46,7,'#b79cf0');
 R(66,10,32,30,'#e9deff');R(68,12,28,26,'#1c1446');R(81,12,2,26,'#e9deff');R(68,24,28,2,'#e9deff');R(88,15,4,4,'#fff6c8');
 ([[72,16],[75,30],[90,32],[70,20]] as const).forEach(([x,y],i)=>R(x,y,1,1,(t*2+i)%3<2?'#fff':'#6a5aa0'));
 R(62,10,4,32,'#b79cf0');R(98,10,4,32,'#b79cf0');
 R(108,14,20,16,'#e9deff');R(110,16,16,12,'#ffb6e0');R(115,18,5,5,'#fff2a8');R(110,24,16,4,'#6fd3c0');
 R(132,20,14,18,'#e9deff');R(134,22,10,14,'#2a1a40');R(136,26,2,2,'#ff9fd0');R(140,26,2,2,'#ff9fd0');R(136,28,6,2,'#ff9fd0');R(138,30,2,2,'#ff9fd0');
 R(6,12,13,11,'#e9deff');R(8,14,9,7,'#9be7ff');R(10,16,5,5,'#ff9fd0');
 ([[22,14,'#ffe66d'],[29,17,'#ff9fd0'],[36,13,'#9ff0c8'],[43,18,'#8fd3ff'],[50,14,'#ffe66d'],[25,24,'#9ff0c8'],[33,26,'#ffe66d'],[41,27,'#ff9fd0'],[49,24,'#8fd3ff']] as const).forEach(([x,y,c])=>{R(x,y,6,6,c);R(x+1,y+2,4,1,'#0003');R(x+1,y+4,3,1,'#0003')});
 R(6,58,58,3,'#c9a27a');R(6,61,58,2,'#9b7653');R(8,63,3,14,'#9b7653');R(59,63,3,14,'#9b7653');
 R(56,52,5,6,'#57c785');R(55,56,7,3,'#c0763c');
 R(10,40,22,15,'#1a1a28');R(11,41,20,12,'#1e1b3a');R(19,55,4,3,'#1a1a28');
 ([[3,9,'#9be7ff'],[6,13,'#ffe66d'],[6,7,'#ff9fd0'],[9,11,'#9ff0c8'],[3,15,'#9be7ff'],[6,10,'#ffe66d']] as const).forEach(([x,w,c],i)=>R(12+x,42+i*2,w,1,c));
 if(t%1<.5)R(24,50,2,1,'#fff');
 R(36,40,22,15,'#1a1a28');R(37,41,20,12,'#2b1d54');R(38,43,10,2,'#ff9fd0');R(42,46,12,2,'#9be7ff');R(38,49,8,2,'#c9b6ff');R(38+(t*6)%18,42,1,10,'#fff');R(45,55,4,3,'#1a1a28');
 R(24,57,20,2,'#2a2a3a');
 R(110,97,36,3,'#2a1a40');R(112,64,32,8,'#5a3d8a');R(112,64,32,2,'#7a58b0');R(112,72,2,22,'#4a3270');R(142,72,2,22,'#4a3270');R(114,72,28,21,'#f0e6ff');R(118,73,20,6,'#fff');R(112,93,32,3,'#5a3d8a');R(112,96,3,3,'#3a2558');R(141,96,3,3,'#3a2558');
 
 R(90,64,8,10,'#57c785');R(91,74,6,5,'#c0763c');
}
function chair(){R(27,66,13,10,'#2d2d3d');R(29,68,9,1,'#555');R(29,71,9,1,'#555');R(32,76,3,4,'#666');R(26,80,15,2,'#444');[26,32,39].forEach(x=>R(x,82,2,2,'#222'))}
function seated(t:number):void{
 const glance=t%5>3.6,b=Math.floor(t*6)%2;
 R(28,58,12,9,WH);R(26,59,3,5+b,WH);R(39,59,3,5+(1-b),WH);R(26,63+b,3,2,SK);R(39,63+(1-b),3,2,SK);
 R(32,57,4,2,SK);
 if(glance){R(29,48,10,10,HR);R(30,52,8,6,SK);R(31,53,3,2,'#222');R(35,53,3,2,'#222');R(32,54,1,1,'#bfe6ff');R(36,54,1,1,'#bfe6ff');R(34,56,2,1,'#c77')}
 else{R(29,48,10,10,HR);R(28,53,1,3,SK);R(39,53,1,3,SK)}
}
function front(x:number,t:number,walk:boolean):void{
 const y=61,f=walk?Math.floor(t*8)%2:0;
 R(x,y,9,3,HR);R(x,y+3,1,2,HR);R(x+1,y+3,7,6,SK);
 R(x+1,y+4,3,2,'#222');R(x+5,y+4,3,2,'#222');R(x+2,y+5,1,1,'#bfe6ff');R(x+6,y+5,1,1,'#bfe6ff');R(x+3,y+7,3,1,'#c77');
 R(x,y+9,9,9,WH);R(x-2,y+10+f,2,7,WH);R(x+9,y+10+(1-f),2,7,WH);R(x-2,y+17+f,2,2,SK);R(x+9,y+17+(1-f),2,2,SK);
 R(x+1,y+18,3,6+f,WH);R(x+5,y+18,3,6+(1-f),WH);R(x+1,y+24+f,3,2,'#c9b6ff');R(x+5,y+24+(1-f),3,2,'#c9b6ff');
}
function sleeper(t:number):void{
 R(114,82,28,11,'#a98be0');R(114,82,28,3,'#c9b6ff');R(126,85,3,8,'#8f6fd0');
 R(123,73,10,8,HR);R(124,76,8,5,SK);R(125,78,2,1,'#222');R(129,78,2,1,'#222');
 const a=(t*1.2)%1;[0,1,2].forEach(i=>{const s=3+i,x=136+i*5,y=62-i*6-a*3;R(x,y,s,1,'#fff');R(x,y+s-1,s,1,'#fff');for(let k=0;k<s;k++)R(x+s-1-k,y+k,1,1,'#fff')});
}
const T=(a:number,b:number,v:number)=>a+(b-a)*Math.min(1,Math.max(0,v));
function sit(e:number):void{const x=123,y=60,up=e<2,ey=e<1.6;
 R(x,y,9,3,HR);R(x-1,y+2,1,3,HR);R(x+9,y+2,1,3,HR);R(x,y+3,9,6,SK);
 if(ey){R(x+1,y+5,3,1,'#222');R(x+5,y+5,3,1,'#222')}else{R(x+1,y+4,3,2,'#222');R(x+5,y+4,3,2,'#222');R(x+2,y+5,1,1,'#bfe6ff');R(x+6,y+5,1,1,'#bfe6ff')}
 R(x+3,y+7,3,e<2.2?2:1,'#c77');R(x,y+9,9,9,WH);
 if(up){R(x-2,y+1,2,9,WH);R(x+9,y+1,2,9,WH);R(x-2,y-1,2,2,SK);R(x+9,y-1,2,2,SK)}else{R(x-2,y+10,2,6,WH);R(x+9,y+10,2,6,WH)}
 R(114,76,28,17,'#a98be0');R(114,76,28,3,'#c9b6ff')}
function frame(ms:number):void{
 const t=ms/1000,e=t-t0;
 room(t);
 if(messy&&st!='sleep'&&st!='go'){R(114,81,28,12,'#a98be0');R(114,81,28,2,'#c9b6ff')}
 if(st=='idle'){seated(t);chair()}
 else{chair();
  if(st=='go'){
   if(e<.4)front(29,e,false);
   else if(e<1.8)front(T(29,100,(e-.4)/1.4),e,true);
   else if(e<2.1)front(100,e,false);
   else {st='sleep';t0=t}
  }
  if(st=='wake'){
   if(e<1){sleeper(t)}else if(e<2.4){sit(e)}else if(e<2.6){messy=1;front(100,e,false)}else if(e<4){front(T(100,29,(e-2.6)/1.4),e,true)}
   else{st='idle';messy=1;EV.woke()}
   const d=Math.max(0,.55*(1-e/1.2));if(d>0&&st=='wake'){g.globalAlpha=d;R(0,0,160,100,'#0a0520');g.globalAlpha=1}
  }
  if(st=='sleep'){sleeper(t);g.globalAlpha=Math.min(.55,(t-t0)*.4);R(0,0,160,100,'#0a0520');g.globalAlpha=1;
   if(choice&&t-t0>1.2&&!choice.done){choice.done=1;EV.enter(choice.k as World)}}
 }
 if(hover&&st=='idle'){g.globalAlpha=.22;R(0,0,160,100,hover=='head'?'#ff9fd0':'#fff');g.globalAlpha=1}
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
// Headspace animated backdrop (original scene, dreamy night playground)
const hc=cvs('hc'),h=hc.getContext('2d')!,W=200,H=125;hc.width=W;hc.height=H;
const B=(x:number,y:number,w:number,ht:number,c:string)=>{h.fillStyle=c;h.fillRect(x|0,y|0,w,ht)};
const ell=(cx:number,cy:number,rx:number,ry:number,c:string)=>{h.fillStyle=c;for(let y=-ry;y<=ry;y++){const w=Math.floor(rx*Math.sqrt(1-y*y/(ry*ry)));h.fillRect((cx-w)|0,(cy+y)|0,2*w+1,1)}};
function headBG(ms:number):void{
 requestAnimationFrame(headBG);
 if(VIEW.v!=='head')return;
 const t=ms/1000;
 ['#1b1245','#231656','#2b1b66','#33216f','#3b2677'].forEach((c,i)=>B(0,i*20,W,21,c));
 for(let i=0;i<60;i++)if((t*1.5+i)%4<3)B((i*53)%W,(i*37)%70,1,1,'#fff');
 ([[28,22,12,'#7be0cf','#bff5ea'],[170,20,14,'#7be0cf','#bff5ea'],[110,12,6,'#ffd86b','#fff0a8'],[140,30,5,'#ffa86b','#ffd0a0'],[190,60,9,'#c9b6ff','#7be0cf'],[6,56,8,'#9fd8ff','#e0f4ff']] as const).forEach(([x,y,r,c,c2],i)=>{const yy=y+Math.sin(t*.6+i)*2;ell(x,yy,r,r,c);h.globalAlpha=.4;ell(x-r*.3,yy-r*.3,r*.5,r*.5,c2);h.globalAlpha=1;B(x-r+2,yy+1,r*2-3,1,c2)});
 ell(100,78,50,28,'#f2c94c');ell(100,74,40,20,'#f7dc7a');ell(100,58,34,10,'#bff0c8');
 B(78,50,9,7,'#2a2a3a');B(79,51,7,5,(t*3)%2<1?'#9be7ff':'#c9b6ff');B(112,48,7,9,'#e9deff');B(113,49,5,7,'#ffb6e0');
 ([[92,52],[104,54],[70,56],[124,56]] as const).forEach(([x,y],i)=>{B(x,y,1,3,'#9be7ff');B(x-1,y+1,3,1,(t*2+i)%2<1?'#fff':'#9be7ff')});
 ell(100,112,130,40,'#b08af0');ell(100,114,128,40,'#8a63d8');
 B(95,68,10,5,'#f08a5d');B(95,66,10,2,'#fff');B(97,63,1,3,'#fff');B(102,63,1,3,'#fff');B(97,61,1,2,(t*8)%2<1?'#ffd86b':'#ff9a5d');B(102,61,1,2,(t*8+1)%2<1?'#ffd86b':'#ff9a5d');
 ell(100,106,150,20,'#f6c3e8');ell(18,98,24,5,'#9fe8c8');ell(186,99,22,5,'#9fe8c8');
 B(30,74,28,1,'#5a7fe0');B(30,74,1,22,'#5a7fe0');B(57,74,1,22,'#5a7fe0');for(let x=34;x<57;x+=4)B(x,74,1,3,'#5a7fe0');
 B(142,72,26,1,'#e6b84a');B(142,72,1,24,'#e6b84a');B(167,72,1,24,'#e6b84a');
 const a=Math.sin(t*1.2)*.35,sx=155+Math.sin(a)*12,sy=72+Math.cos(a)*14;for(let k=0;k<=14;k+=2){B(155+(sx-155)*k/14-3,72+(sy-72)*k/14,1,2,'#fff8');B(155+(sx-155)*k/14+3,72+(sy-72)*k/14,1,2,'#fff8')}B(sx-4,sy,9,2,'#ff7ab8');
 for(let i=0;i<10;i++)B(172+i,80+i,2,1,'#c9b6ff'),B(172+i,81+i,2,1,'#ff9fd0');
 ([[70,96,'#ff7a7a'],[86,100,'#ffd86b'],[118,98,'#ff7a7a'],[130,95,'#7be0cf'],[52,99,'#ffd86b']] as const).forEach(([x,y,c],i)=>{if((t*2+i)%3<2.4)B(x,y,3,2,c)});
 const kx=22+Math.sin(t*.7)*4,ky=90+Math.sin(t*1.1)*3;B(kx,ky,1,1,'#ff9fd0');B(kx-1,ky+1,3,1,'#ff9fd0');B(kx-2,ky+2,5,1,'#ffd86b');B(kx-1,ky+3,3,1,'#ff9fd0');B(kx,ky+4,1,1,'#ff9fd0');B(kx,ky+5,1,4,'#fff8');
 ([[58,92],[96,98],[128,92],[150,100]] as const).forEach(([x,y],i)=>{const j=Math.abs(Math.sin(t*3+i*1.7))*3,yy=y-j;B(x,yy,5,3,'#fff');B(x+1,yy-2,1,2,'#fff');B(x+3,yy-2,1,2,'#fff');B(x+1,yy+1,1,1,'#2a1a40');B(x+3,yy+1,1,1,'#2a1a40')});
 B(0,108,W,17,'#1a1040');B(0,108,W,1,'#fff');
 for(let x=0;x<W;x++)B(x,107+Math.round(Math.sin(x*.25+t*2)),1,1,'#fff');
 [112,117,122].forEach((y,r)=>{for(let x=0;x<W;x++)if(((x+t*(r%2?-9:9)+r*7)%26+26)%26<9)B(x,y,1,1,'#7a63c8')});
 [10,44,80,118,154,188].forEach((bx,i)=>{const ht=12+(i%3)*3+Math.sin(t*1.5+i)*3;for(let k=0;k<ht;k++){const x=bx+Math.sin(t*1.8+i+k*.25)*3*(k/ht),w=k>ht-4?2:k>ht-8?3:4;B(x,121-k,w,1,'#f4694a');if(k%5==2&&k<ht-3)B(x+1,121-k,1,1,'#fff')}});
}
requestAnimationFrame(headBG);
// Whitespace animated backdrop (original 1-bit void room with dev props)
const wc=cvs('wc'),q=wc.getContext('2d')!;let ox=0,oy=0;
function wsize(){const r=innerWidth/innerHeight;let H=125,W=Math.round(H*r);if(W<120){W=120;H=Math.round(W/r)}wc.width=W;wc.height=H;ox=Math.round((W-200)/2);oy=Math.round((H-125)/2)}
wsize();addEventListener('resize',wsize);
const P=(x:number,y:number,w:number,ht:number,c:string='#000')=>{q.fillStyle=c;q.fillRect(Math.round(x),Math.round(y),w,ht)};
const O=(x:number,y:number,w:number,ht:number,c:string='#000')=>{P(x,y,w,1,c);P(x,y+ht-1,w,1,c);P(x,y,1,ht,c);P(x+w-1,y,1,ht,c)};
const GL:Record<string,string[]>={'{':['.##','.#.','##.','.#.','.##'],'}':['##.','.#.','.##','.#.','##.'],'<':['..#','.#.','#..','.#.','..#'],'>':['#..','.#.','..#','.#.','#..'],'/':['..#','..#','.#.','#..','#..'],';':['...','.#.','...','.#.','#..'],'0':['###','#.#','#.#','#.#','###'],'1':['.#.','##.','.#.','.#.','###'],'=':['...','###','...','###','...'],'(':['.#.','#..','#..','#..','.#.'],')':['.#.','..#','..#','..#','.#.']};
const gl=(s:string,x:number,y:number,c:string)=>{[...s].forEach((ch,i)=>{const m=GL[ch];if(m)m.forEach((row,ry)=>[...row].forEach((v,rx)=>v=='#'&&P(x+i*4+rx,y+ry,1,1,c)))})};
const TK=[['</>',.08,6,.1],['{}',.22,4,.5],['0110',.35,7,.8],['();',.5,5,.3],['=>',.63,6,.65],['1',.75,4,.9],['{ }',.88,5,.2],['</>',.95,7,.55],['1010',.15,5,.7],['()',.42,4,.05],['0',.58,6,.4],['};',.82,5,.95]] as const;
function whiteBG(ms:number):void{
 requestAnimationFrame(whiteBG);
 if(VIEW.v!=='white')return;
 const t=ms/1000,W=wc.width;
 q.setTransform(1,0,0,1,0,0);q.fillStyle='#fff';q.fillRect(0,0,W,wc.height);q.setTransform(1,0,0,1,ox,oy);
 TK.forEach(([s,f,sp,ph])=>gl(s,f*W-ox,((ph*140-t*sp)%140+140)%140-10-oy*0,'#c8c8c8'));
 // hanging bulb
 const bx=100+Math.sin(t*.9)*2;for(let y=-oy;y<28;y++)P(100+(bx-100)*Math.max(0,y)/28,y,1,1);
 P(bx-1,27,3,2);P(bx-1,29,3,1);P(bx-2,30,5,3);P(bx-1,33,3,1);P(bx,31,1,1,'#fff');
 ([[-6,31],[6,31],[-5,26],[5,26],[-5,36],[5,36],[0,38]] as const).forEach(([dx,dy],i)=>{if((Math.floor(t*4)+i)%3)P(bx+dx,dy,2,1)});
 P(96,53,8,2,'#d0d0d0');
 // room
 O(56,60,88,52);
 // monitor with scrolling code
 O(66,66,14,11);P(71,77,3,2);P(69,79,7,1);
 for(let i=0;i<4;i++){const n=Math.floor(t*2)+i,len=3+(n*7)%7,ind=(n*3)%3;P(68+ind,68+i*2,Math.min(len,9-ind),1)}
 if(t%1<.5)P(75,75,2,1);
 // notebook with </>
 O(124,66,15,13);for(let i=0;i<4;i++)P(123,68+i*3,2,1);gl('</>',126,71,'#000');
 // rubber duck
 const db=Math.floor(t*1.2)%2;P(127,100+db,8,4);P(133,97+db,4,4);P(137,99+db,2,1);P(134,98+db,1,1,'#fff');
 // character
 const bob=Math.floor(t*1.5)%2,y0=77+bob,ty=Math.floor(t*6)%2;
 P(95,y0,9,3);P(94,y0+2,1,3);P(104,y0+2,1,3);P(100,y0-2,1,2);P(101,y0-3,1,1);
 P(96,y0+3,8,5,'#fff');
 O(96,y0+4,3,2);O(100,y0+4,3,2);P(99,y0+4,1,1);
 if(t%4<.15)P(96,y0+5,7,1);
 P(98,y0+7,3,1);
 O(95,y0+9,9,7);O(93,y0+10+ty,2,5);O(104,y0+10+(1-ty),2,5);
 P(96,y0+16,2,4);P(101,y0+16,2,4);P(95,y0+19,3,1);P(100,y0+19,3,1);
 // cat
 const tl=Math.round(Math.sin(t*2.2)*1.5);
 P(40,117,12,5);P(34,116,6,5);P(34,114,2,2);P(38,114,2,2);P(52,119+tl,7,2);P(36,118,1,1,(t%5<.2)?'#000':'#fff');P(38,118,1,1,(t%5<.2)?'#000':'#fff');
 // floating terminal typing
 O(150,26,40,26);P(150,26,40,4);[152,156,160].forEach(x=>P(x,27,2,2,'#fff'));
 for(let i=0;i<4;i++){const L=Math.max(0,Math.min(26,Math.floor((t*9-i*10)%60)));P(153,33+i*4,L,1);if(i==3&&L<26&&t%1<.5)P(153+L+1,32+i*4,2,3)}
 // git graph
 P(20,38,1,38);P(30,52,1,15);P(21,52,9,1);P(21,66,9,1);
 [38,50,62,74].forEach(y=>P(18,y,5,5));[54,64].forEach(y=>P(28,y,5,5));
 const hl=Math.floor(t*2)%6,pts=[[18,38],[18,50],[28,54],[28,64],[18,62],[18,74]][hl];P(pts[0]+1,pts[1]+1,3,3,'#fff');
}
requestAnimationFrame(whiteBG);

  return {
    hover: (v) => { hover = v; },
    go: (k) => {
      if (st !== 'idle') return;
      hover = null; choice = { k }; messy = 0; st = 'go'; t0 = performance.now() / 1000;
    },
    wake: () => { st = 'wake'; t0 = performance.now() / 1000; choice = null; },
  };
}
