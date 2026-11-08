import React,{useState,Suspense} from 'react';
import {doorTypes,finishes,glasses,initialDesign,normalizeDesign} from './options.mjs';
const Door3D=React.lazy(()=>import('./Door3D.jsx'));
const logo=<span className="brand-icon"><span/></span>;
function OptionGroup({title,options,value,onChange,kind}){
 return <fieldset className={'choice-group '+(kind||'')}><legend>{title}</legend><div className="choice-row">{options.map(item=><button type="button" key={item.id} className={'choice '+(value===item.id?'selected':'')} onClick={()=>onChange(item.id)} aria-pressed={value===item.id}>
  {item.hex&&<i className="color-dot" style={{backgroundColor:item.hex}}/>}<span><strong>{item.label}</strong>{item.subtitle&&<small>{item.subtitle}</small>}</span></button>)}</div></fieldset>;
}
export default function Demo(){
 const [design,setDesign]=useState(initialDesign),[opened,setOpened]=useState(false);
 const d=normalizeDesign(design);
 const update=patch=>{setDesign(old=>({...old,...patch}));setOpened(false);};
 return <>
 <header className="site-header"><div className="container navigation"><a href="#top" className="brand" aria-label="MetaalMeesters conceptdemo">{logo}<span>METAAL<span className="brand-light">MEESTERS</span></span></a><div className="nav-links"><a href="#concept">Het concept</a><a href="#configurator">3D configurator</a></div><a href="#configurator" className="nav-action">Bekijk het ontwerp <span aria-hidden="true">↗</span></a></div></header>
 <main id="top">
 <section className="hero"><div className="container hero-inner"><div className="hero-copy"><span className="eyebrow"><span className="little-line"/> CONCEPT · EERSTE VOORSTEL</span><h1>Metaal met <em>karakter.</em></h1><p>Een eerste ontwerp voor de vernieuwde MetaalMeesters-website. Sterk maatwerk, een rustige uitstraling en een eenvoudige manier om stalen deuren in 3D te ontdekken.</p><a className="hero-btn" href="#configurator">Probeer de basisconfigurator <span aria-hidden="true">↗</span></a><div className="hero-foot"><span>ONTWERP IN OPBOUW</span><span>DEMO · GEEN DEFINITIEVE WEBSITE</span></div></div><div className="hero-graphic" aria-hidden="true"><div className="graphic-door"><span className="graphic-line vertical"/><span className="graphic-line horizontal top"/><span className="graphic-line horizontal bottom"/><span className="graphic-handle"/></div><div className="graphic-caption">STAAL <span>×</span> GLAS</div></div></div></section>
 <section className="intro container" id="concept"><div><span className="eyebrow">DE RICHTING</span><h2>Een eerste blik op<br/><em>de mogelijkheden.</em></h2></div><p>We starten met een eenvoudige, interactieve voorstelling van stalen binnendeuren. De echte profielmaten, uitgebreide productkeuzes, projectfotografie en offerteverwerking worden in een volgende fase afgestemd.</p></section>
 <section className="demo-section" id="configurator"><div className="container"><div className="section-top"><div><span className="eyebrow">3D STUDIO · PROTOTYPE</span><h2>Stel een deur <em>samen.</em></h2></div><p>Een eerste werkend voorbeeld. Selecteer een deurtype en een paar afwerkingen om het ontwerp meteen in 3D te zien.</p></div>
 <div className="config-wrap"><section className="config-form" aria-label="Basisinstellingen van de deur"><div className="form-title"><span className="index">01 / BASIS</span><h3>Uw eerste ontwerp</h3><p>Beperkte keuzemogelijkheden voor deze conceptdemo.</p></div>
 <OptionGroup title="Deurtype" options={doorTypes} value={d.type} onChange={type=>update({type,width:type==='dubbel'?Math.max(1400,d.width):Math.min(1200,d.width)})}/>
 <div className="measure-grid"><label>Breedte (mm)<input type="number" min={d.type==='dubbel'?1200:650} max="2400" step="10" value={d.width} onChange={e=>update({width:Number(e.target.value)})}/></label><label>Hoogte (mm)<input type="number" min="1800" max="3000" step="10" value={d.height} onChange={e=>update({height:Number(e.target.value)})}/></label></div>
 <p className="field-note">De maatvoering is enkel illustratief. Productiematen worden nog afgestemd.</p>
 <OptionGroup title="Kleur van het staal" options={finishes} value={d.finish} onChange={finish=>update({finish})} kind="swatch-group"/>
 <OptionGroup title="Soort glas" options={glasses} value={d.glass} onChange={glass=>update({glass})}/>
 <OptionGroup title="Verdeling" options={[{id:'basis',label:'Strak',subtitle:'Geen tussenroeden'},{id:'raster',label:'Met roeden',subtitle:'Eenvoudig patroon'}]} value={d.division} onChange={division=>update({division})}/>
 <div className="form-footer"><span className="coming-soon">Offerteaanvragen volgen later</span><button className="reset-button" type="button" onClick={()=>{setDesign(initialDesign);setOpened(false);}}>Opnieuw beginnen ↻</button></div>
 </section><section className="preview-pane" aria-label="Interactieve 3D-voorvertoning"><div className="preview-top"><span><i className="live-dot"/> LIVE 3D-VOORBEELD</span><span>DEMO-ONTWERP</span></div><div className="preview-canvas"><Suspense fallback={<div className="loading">3D-model wordt geladen…</div>}><Door3D design={d} opened={opened}/></Suspense><div className="view-tip">Sleep om te draaien · Scroll om te zoomen</div></div><div className="preview-tools"><button type="button" onClick={()=>setOpened(v=>!v)}>{opened?'Sluit de deur':'Open de deur'} <span>↗</span></button><div className="size-readout">{d.width} × {d.height} mm</div></div><p className="preview-note">Dit is een vroege 3D-visualisatie, niet een exacte technische weergave van een afgewerkt MetaalMeesters-product.</p></section></div>
 </div></section>
 <section className="next-section"><div className="container"><span className="eyebrow">VOLGENDE STAPPEN</span><div className="next-content"><h2>Van concept naar <em>maatwerk.</em></h2><p>Dit eerste voorstel laat de richting van de website en de basis van de 3D-configurator zien. Productdetails en verdere functionaliteiten worden samen besproken.</p></div></div></section>
 </main><footer><div className="container footer-inner"><span className="brand footer-brand">{logo}<span>METAAL<span className="brand-light">MEESTERS</span></span></span><span>CONCEPTDEMO · NIET DE LIVE WEBSITE</span></div></footer>
 </>;
}
