import { useFrame } from "@react-three/fiber";
import { forwardRef, useEffect, useRef, useState } from "react";
import {  Vector3 } from "three";
import Linkage,{Bar} from "./linkage";
const g = new Vector3(0, 0, -9.8);
var iframe = 0;
const p = new Vector3();
const origin = new Vector3(0,0,0);
const Pbd = ({}) => {

   const particle_1 = useRef(null);
   const link_1 = useRef(null);
   const pos = [];
   const vel = [];
   var end = new Vector3();
   var old_pos;
   var norm_x = new Vector3();
   pos.push(new Vector3(10,0,0));
   vel.push(new Vector3(0,1,0));

useEffect(()=>{
    particle_1.current.position.copy(pos[0]);
},[]);

  useFrame((state,delta) => {
   
    if(iframe>1){
    old_pos = particle_1.current.position;
    p.copy(old_pos);
    vel[0].addScaledVector(g,delta);
    p.addScaledVector(vel[0],delta);
    norm_x.copy(p).normalize();
    p.addScaledVector(norm_x, (10-p.length()));
    vel[0].subVectors(p,old_pos).divideScalar(delta);
    particle_1.current.position.copy(p).setY(0);
    end.copy(p);
    }
    iframe++;
  });

  return (
    <>
    <mesh ref={particle_1} position={[10,0,0]}>
        <sphereGeometry />
        <meshStandardMaterial color="red"/>
    </mesh>
    <Bar start={origin} end={end}/>
    </>
  )
};

export default Pbd;

