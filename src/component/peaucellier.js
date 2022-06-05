import { useFrame } from "@react-three/fiber";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Clock, Vector3 } from "three";
import Linkage, { Bar, GlassBar } from "./linkage";
import { RoundedBox } from "@react-three/drei";

var pos = [];
var old_pos = [];
var vel = [];
var type = [];
var e = [];
var el = [];
var Ne;
var N;
const norm = new Vector3();
const temp = new Vector3();
var time = new Clock();
var t;
var hoeken_end = new Vector3();
var bar_render;

function initialize_link(){
  pos.push(new Vector3(0, 0, 0));
  pos.push(new Vector3(1, 0, 0));
  pos.push(new Vector3(-1, 0, 0));
  pos.push(new Vector3(2.414, 1.414, 0));
  pos.push(new Vector3(2.414, -1.414, 0));
  pos.push(new Vector3(3.818, 0, 0));


  old_pos.push(new Vector3(0, 0, 0));
  old_pos.push(new Vector3(1, 0, 0));
  old_pos.push(new Vector3(-1, 0, 0));
  old_pos.push(new Vector3(2.414, 1.414, 0));
  old_pos.push(new Vector3(2.414, -1.414, 0));
  old_pos.push(new Vector3(3.828, 0, 0));

  vel.push(new Vector3(0, 0, 0));
  vel.push(new Vector3(0, 0, 0));
  vel.push(new Vector3(0, 0, 0));
  vel.push(new Vector3(0, 0, 0));
  vel.push(new Vector3(0, 0, 0));
  vel.push(new Vector3(0, 0, 0));

  type.push("fixed");
  type.push("driver");
  type.push("fixed");
  type.push("normal");
  type.push("normal");
  type.push("normal");

  
  e.push([0, 1]);
  e.push([1, 3]);
  e.push([1, 4]);
  e.push([2, 3]);
  e.push([2, 4]);
  e.push([3, 5]);
  e.push([4, 5]);


  el.push(1);
  el.push(2);
  el.push(2);
  el.push(3.7);
  el.push(3.7);
  el.push(2);
  el.push(2);
  N = pos.length;
  Ne = e.length;
}



function driver_peaucellier(i){
  let omega = 2*Math.PI/2.5;
  pos[i].x = 0.933+0.067*Math.sin(2*omega *t +Math.PI/2);

pos[i].y = 0.5*Math.sin(omega * t);

pos[i].z = 0;

}


const Peaucellier = () => {
  console.log("paeucellier lipkin rerender");

  const ref = useRef([]);
  var iframe = 0;
  pos = [];
  type = [];
  old_pos = [];
  vel = [];
  type = [];
  e = [];
  el= [];

  initialize_link();


  useFrame((state, delta) => {
    if (iframe === 1) {
      time.start();

    }
    if (iframe >= 1) {
      t = time.getElapsedTime();
      //loop point
      for (let i = 0; i < N; i++) {
        if (type[i] === "driver") {
          // console.log(i,"TIME INTEGRATION:DRIVER")
          driver_peaucellier(i)
 
        }

        if (type[i] === "normal") {
          //console.log(i,"TIME INTEGRATION:NORMAL")
          old_pos[i].copy(pos[i]);
          pos[i].addScaledVector(vel[i], delta);
        }
      }

      const scaling = 1.0;
      // loop edge
      for (let i = 0; i < Ne; i++) {
        if (
          (type[e[i][0]] === "driver" || type[e[i][0]] === "fixed") &&
          type[e[i][1]] === "normal"
        ) {
          // console.log("CONTRAINTS [",i,"] ", "DRIVER/FIXED --- NORMAL")

          temp.subVectors(pos[e[i][1]], pos[e[i][0]]);
          norm.copy(temp).normalize();

          pos[e[i][1]].addScaledVector(norm, scaling*(el[i] - temp.length()));
          pos[e[i][1]].z = 0;
        }
        if (
          type[e[i][0]] === "normal" &&
          (type[e[i][1]] === "driver" || type[e[i][1]] === "fixed")
        ) {
          //console.log("CONTRAINTS [",i,"] ", "NORMAL --- DRIVER/FIXED")

          temp.subVectors(pos[e[i][0]], pos[e[i][1]]);
          norm.copy(temp).normalize();

          pos[e[i][0]].addScaledVector(norm, scaling*(el[i] - temp.length()));
          pos[e[i][0]].z = 0;
        }
        
        if(type[e[i][1]]==="normal" && type[e[i][0]]==="normal"){
          temp.subVectors(pos[e[i][1]], pos[e[i][0]]);
          norm.copy(temp).normalize();

          pos[e[i][0]].addScaledVector(norm, -0.5*scaling*(el[i] - temp.length()));
          pos[e[i][0]].z = 0;
          pos[e[i][1]].addScaledVector(norm, -0.5*scaling*(temp.length()-el[i]));
          pos[e[i][1]].z = 0;
        
          }
            
      }

      //loop point

      for (let i = 0; i < N; i++) {
        if (type[i] === "normal") {

          vel[i].subVectors(pos[i], old_pos[i]).divideScalar(delta);
          vel[i].z = 0;
        }
      }

      //console.log(p3.current)
      for (let i=0; i<N; i++){
        ref.current[i].position.copy(pos[i]);
      }


    }
    iframe++;

  });


  return(
    <>

{type.map((p, index) => {
        let color;
        if (p==="driver")
          color = "green"
        else if(p==="normal")
          color="red"
        else color = "black"
        return (
          <mesh key={index} ref={(el) => (ref.current[index] = el)}>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial color={color} />
          </mesh>
          
        );
      })}
      {
        e.map((edge,index)=>{
          return  (<GlassBar scale={0.5} start={pos[edge[0]]} end={pos[edge[1]]}/>)

        })

      }
         

      
  
</>
)
  /*
  return (
    <>
      <mesh ref={p1} ><sphereGeometry args={[0.1]}/><meshStandardMaterial color="red"/></mesh>
  <mesh ref={p2} ><sphereGeometry args={[0.1]}/><meshStandardMaterial color="green"/></mesh>
  <mesh ref={p3} ><sphereGeometry args={[0.1]}/><meshStandardMaterial color="blue"/></mesh>
  <mesh ref={p4} ><sphereGeometry args={[0.1]}/><meshStandardMaterial color="yellow"/></mesh>

    </>
  );
  */
};

export default Peaucellier;

