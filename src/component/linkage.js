import { useFrame } from "@react-three/fiber";
import { forwardRef, useEffect, useRef, useState } from "react";
import { BufferAttribute, BufferGeometry, Clock, Vector3 } from "three";
import { RoundedBox, Line } from "@react-three/drei";
import { floorPowerOfTwo } from "three/src/math/MathUtils";

const g = new Vector3(0, 0, -9.8);
const diff = new Vector3(0, 0, 0);
const from = new Vector3(0,0,0);
const temporigin = new Vector3(0, 0, 0);
const to = new Vector3();
const clock = new Clock();
const linegeo = new BufferGeometry();
const vertices = new Float32Array(6);
const link_position = [];
const temp = new Vector3();
const temp_link = {start:new Vector3(0,0,0),end:new Vector3(0,0,0)};
const End = new Vector3();
const Start = new Vector3(0,0,0);
const scale = new Vector3(0,1,1);
var mid_pos = new Vector3();

const GlassBar = ({start, end, scale ,tranZ=0}) => {

  if(!scale){
    scale =1 ;
  }
  const ref=  useRef(null);
 var angle;
  
  useFrame(()=>{
    if (!!ref.current){
      ref.current.position.copy(mid_pos.addVectors(start,end).divideScalar(2));
      console.log(ref.current.position)
      temp.subVectors(end,start);
      angle = Math.atan2(temp.y,temp.x);
      var l = start.distanceTo(end);
      ref.current.scale.x = l;
      ref.current.rotation.z = angle;
      ref.current.position.z = tranZ;
  }

  })
  return (
      <RoundedBox  ref={ref}  args={[1,scale*0.2,scale*0.2]}  radius={0.05} smoothness={10}>
        <meshPhysicalMaterial color={"black"} transmission={1} roughness={0} thickness={3} envMapIntensity={6} />
      </RoundedBox>
  )
}
//                <meshPhysicalMaterial color={"white"} roughness={0}  />




const Bar =  ({start,end}) => {
  console.log("bar re-render");

    const ref = useRef(null);
    console.log(ref)

    useFrame(()=>{
      if (!!ref.current){
        ref.current.geometry.setFromPoints([start,end]);
        const position = ref.current.geometry.attributes.position.array;
        position[0] = start.x;
        position[1] = start.y;
        position[2] = start.z;
        position[3] = end.x;
        position[4] = end.y;
        position[5] = end.z;
        ref.current.geometry.attributes.position.needsUpdate= true;
    }})

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={"blue"} />
    </line>
  );
};

const Linkage = ({}) => {

  console.log("link -rerender")
  const start2 = new Vector3(20,0,0);
  useFrame(() => {
    End.x = 10*Math.sin( Math.PI * clock.getElapsedTime()+Math.PI/2);
    End.y = 10*Math.sin(Math.PI * clock.getElapsedTime());
    End.z = 0;
  });
  return (
    <>  <Bar start={Start} end={End}/>
    <Bar start={start2} end={End}/>
      </>
  )
};



//<Block args={[10, 1.5, 4]} position={[11, -7, 0]} rotation={[0, 0, 0.7]} material={{ restitution: 1.2 }} />



export {Bar,GlassBar};
export default Linkage;

/*

const Bar = forwardRef(({start,end}, ref) => {
  useEffect(()=>{
    ref.current.geometry.setFromPoints([start,end]);
    const position = ref.current.geometry.attributes.position.array;
    position[0] = start.x;
    position[1] = start.y;
    position[2] = start.z;
    position[3] = end.x;
    position[4] = end.y;
    position[5] = end.z;
    ref.current.geometry.attributes.position.needsUpdate= true;
  },[])

  useFrame(()=>{
 
    const position = ref.current.geometry.attributes.position.array;
    position[0] = start.x;
    position[1] = start.y;
    position[2] = start.z;
    position[3] = end.x;
    position[4] = end.y;
    position[5] = end.z;
    ref.current.geometry.attributes.position.needsUpdate= true;

  })
  
  
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={"blue"} />
    </line>
  );
});
*/