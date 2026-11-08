export const doorTypes=[{id:'enkel',label:'Enkele deur',subtitle:'Eén draaivleugel'},{id:'dubbel',label:'Dubbele deur',subtitle:'Twee draaivleugels'}];
export const finishes=[{id:'zwart',label:'Mat zwart',hex:'#292c2b'},{id:'antraciet',label:'Antraciet',hex:'#555d61'}];
export const glasses=[{id:'helder',label:'Helder glas'},{id:'mat',label:'Mat glas'}];
export const initialDesign={type:'enkel',width:900,height:2200,finish:'zwart',glass:'helder',division:'basis'};
export function normalizeDesign(d){
 const type=doorTypes.some(x=>x.id===d?.type)?d.type:'enkel';
 const minWidth=type==='dubbel'?1200:650;
 const num=(value,fallback,min,max)=>Number.isFinite(Number(value))?Math.min(max,Math.max(min,Math.round(Number(value)))):fallback;
 return {type,width:num(d?.width,type==='dubbel'?1600:900,minWidth,2400),height:num(d?.height,2200,1800,3000),finish:finishes.some(x=>x.id===d?.finish)?d.finish:'zwart',glass:glasses.some(x=>x.id===d?.glass)?d.glass:'helder',division:d?.division==='raster'?'raster':'basis'};
}
