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
var h_pos=new Vector3();
const norm = new Vector3();
const temp = new Vector3();
var time = new Clock();
var t;
var hoeken_end = new Vector3();


function hoeken(){
  pos.push(new Vector3(0, 0, 0));
  pos.push(new Vector3(0, 1, 0));
  pos.push(new Vector3(2, 2.5, 0));
  pos.push(new Vector3(2, 0, 0));
  old_pos.push(new Vector3(0, 0, 0));
  old_pos.push(new Vector3(0, 1, 0));
  old_pos.push(new Vector3(2, 2.5, 0));
  old_pos.push(new Vector3(2, 0, 0));
  vel.push(new Vector3(0, 0, 0));
  vel.push(new Vector3(0, 0, 0));
  vel.push(new Vector3(0, 0, 0));
  vel.push(new Vector3(0, 0, 0));
  type.push("fixed");
  type.push("driver");
  type.push("normal");
  type.push("fixed");
  e.push([0, 1]);
  e.push([1, 2]);
  e.push([2, 3]);
  el.push(1);
  el.push(2.5);
  el.push(2.5);
  N = pos.length;
  Ne = e.length;
}



function driver_hoeken(i){
  pos[i].x = Math.sin((5*Math.PI * t) / 5);

pos[i].y = Math.sin((5*Math.PI / 5) * t + Math.PI/2);

pos[i].z = 0;

}


const Hoeken = () => {
  console.log("four bar rerender");

  const ref = useRef([]);
  var iframe = 0;
  pos = [];
  type = [];
  old_pos = [];
  vel = [];
  type = [];
  e = [];
  el= [];

  hoeken();

  useEffect(() => console.log("useeffect rerender"), []);
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
          driver_hoeken(i)
 
        }

        if (type[i] === "normal") {
          //console.log(i,"TIME INTEGRATION:NORMAL")

          old_pos[i].copy(pos[i]);
          // console.log("before pos", pos[i]);
          // console.log("updating with Veloctiy", vel[i]);
          pos[i].addScaledVector(vel[i], delta);
          //  console.log("after time integration pos", pos[i]);
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
        /*
            if(type[e[i][1]]==="normal" && type[e[i][0]]==="normal"){
        
            }
            */
      }

      //loop point

      for (let i = 0; i < N; i++) {
        if (type[i] === "normal") {
          // console.log("pos",pos[i]);
          // console.log("old",old_pos[i]);

          vel[i].subVectors(pos[i], old_pos[i]).divideScalar(delta);
          vel[i].z = 0;
        }
      }
      /*
      p1.current.position.copy(pos[0]);
      p2.current.position.copy(pos[1]);
      p3.current.position.copy(pos[2]);
      p4.current.position.copy(pos[3]);
      */

      //console.log(p3.current)
      
      ref.current[0].position.copy(pos[0]);
      ref.current[1].position.copy(pos[1]);
      ref.current[2].position.copy(pos[2]);
      ref.current[3].position.copy(pos[3]);

      hoeken_end.subVectors(hoeken_end.copy(pos[2]).multiplyScalar(2),pos[1]);
      
 
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
           <GlassBar start={pos[1]} end={pos[2]} tranZ={0.5}/>

      <GlassBar start={pos[2]} end={pos[3]} tranZ={0.25}/>
      <GlassBar start={pos[3]} end={pos[0]} />
  <GlassBar start={pos[2]} end={hoeken_end} tranZ={0.5}/>
      <GlassBar start={pos[0]} end={pos[1]} tranZ={0.25}/> 
      
  
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

export default Hoeken;

/*
        
        { pos.map( (p)=>
            {return (<mesh position={p}><sphereGeometry args={[0.1]}/><meshStandardMaterial color="red"/></mesh>)}
            )
        }
*/

/*
            p1.current.position.copy(pos[0]);
            p2.current.position.copy(pos[1]);
            p3.current.position.copy(pos[2]);
            p4.current.position.copy(pos[3]);

         }

        iframe++;
   
    });

    return(
        <>
<mesh ref={p1} ><sphereGeometry args={[0.1]}/><meshStandardMaterial color="red"/></mesh>
        <mesh ref={p2} ><sphereGeometry args={[0.1]}/><meshStandardMaterial color="green"/></mesh>
<mesh ref={p3} ><sphereGeometry args={[0.1]}/><meshStandardMaterial color="blue"/></mesh>
<mesh ref={p4} ><sphereGeometry args={[0.1]}/><meshStandardMaterial color="yellow"/></mesh>
</>
    )

    
}
*/


/*
      ref.current[0].position.copy(pos[0]);
      ref.current[1].position.copy(pos[1]);
      ref.current[2].position.copy(pos[2]);
      ref.current[3].position.copy(pos[3]);
      console.log();
    }
    iframe++;
  });

  return (
    <>
      {type.map((p, index) => {
        return (
          <mesh key={index} ref={(el) => (ref.current[index] = el)}>
            <sphereGeometry args={[0.1]} />
            <meshStandardMaterial color="red" />
          </mesh>
        );
      })}
    </>
  );
};
*/