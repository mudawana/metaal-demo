import React from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls,ContactShadows,Environment} from '@react-three/drei';
import {normalizeDesign,finishes} from './options.mjs';

function Steel({color}) {return <meshStandardMaterial color={color} metalness={.74} roughness={.35}/>;}
function Beam({position,size,color}){return <mesh castShadow receiveShadow position={position}><boxGeometry args={size}/><Steel color={color}/></mesh>;}
function Panel({width,height,color,glass,division,handleSide='right'}){
 const frame=.044;
 const w=Math.max(.05,width-2*frame),h=Math.max(.1,height-2*frame);
 const panes=division==='raster';
 return <group>
   <mesh position={[0,height/2,0]} castShadow><boxGeometry args={[w,h,.009]}/>
     {glass==='mat'?<meshPhysicalMaterial color="#cbd4d2" roughness={.8} transmission={.15} transparent opacity={.88} side={2}/>:
      <meshPhysicalMaterial color="#d7e9e9" metalness={0} roughness={.08} transmission={.85} thickness={.02} transparent opacity={1} side={2}/>}
   </mesh>
   <Beam position={[-width/2+frame/2,height/2,.02]} size={[frame,height,.06]} color={color}/>
   <Beam position={[width/2-frame/2,height/2,.02]} size={[frame,height,.06]} color={color}/>
   <Beam position={[0,frame/2,.02]} size={[width,frame,.06]} color={color}/>
   <Beam position={[0,height-frame/2,.02]} size={[width,frame,.06]} color={color}/>
   {panes&&<><Beam position={[0,height*.54,.052]} size={[w,.027,.03]} color={color}/><Beam position={[0,height*.78,.052]} size={[w,.027,.03]} color={color}/></>}
   <Beam position={[handleSide==='right'?width/2-.09:-width/2+.09,height*.48,.09]} size={[.02,.21,.04]} color="#c3ae93"/>
 </group>;
}
function DoorLeaf({hinge,width,height,color,glass,division,opened=false}){
 const right=hinge==='right';
 const offset=right?-width/2:width/2;
 const hingePos=right?width/2:-width/2;
 return <group position={[hingePos,0,0]} rotation={[0,opened?(right?.36:-.36):0,0]}>
    <group position={[offset,0,0]}><Panel width={width} height={height} color={color} glass={glass} division={division} handleSide={right?'left':'right'}/></group>
  </group>;
}
function Scene({design,opened}){
 const d=normalizeDesign(design),w=d.width/1000,h=d.height/1000;
 const color=finishes.find(x=>x.id===d.finish)?.hex||'#292c2b';
 return <>
   <color attach="background" args={['#e8e7e2']}/>
   <ambientLight intensity={1.4}/><hemisphereLight args={['#ffffff','#c4c0b6',1]}/>
   <directionalLight position={[4,7,6]} intensity={2.4} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}/>
   <directionalLight position={[-4,3,-2]} intensity={.55} color="#b7d8e4"/>
   <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.025,0]} receiveShadow><planeGeometry args={[24,24]}/><meshStandardMaterial color="#c6b8a5" roughness={.9}/></mesh>
   <mesh position={[0,2,-3]}><boxGeometry args={[18,7,.15]}/><meshStandardMaterial color="#d7d1c7" roughness={1}/></mesh>
   <group>{d.type==='dubbel'?<>
      <group position={[-w/4,0,0]}><DoorLeaf hinge="left" width={w/2} height={h} color={color} glass={d.glass} division={d.division} opened={opened}/></group>
      <group position={[w/4,0,0]}><DoorLeaf hinge="right" width={w/2} height={h} color={color} glass={d.glass} division={d.division} opened={opened}/></group>
    </>:<DoorLeaf hinge="left" width={w} height={h} color={color} glass={d.glass} division={d.division} opened={opened}/>}
   </group>
   <ContactShadows position={[0,-.01,.08]} scale={6} opacity={.38} blur={2.4} far={4}/>
   <OrbitControls enablePan={false} target={[0,1.12,0]} minDistance={3.2} maxDistance={10} minPolarAngle={.35} maxPolarAngle={Math.PI/2.05}/>
 </>;
}
export default function Door3D({design,opened}){
 return <Canvas shadows dpr={[1,1.7]} camera={{position:[3.05,2.7,5.4],fov:42,near:.1,far:100}} gl={{antialias:true,powerPreference:'high-performance'}} fallback={<p>Uw toestel ondersteunt geen 3D-weergave.</p>}>
   <Scene design={design} opened={opened}/>
 </Canvas>;
}
