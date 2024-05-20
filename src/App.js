import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls, PerspectiveCamera, Plane, Environment } from "@react-three/drei";
import Linkage from "./component/linkage";
import Pbd from "./component/pbd";
import Fourbar from "./component/fourbar";
import Peaucellier from "./component/peaucellier";
import Ball from "./component/ball.js"
import { Vector3 } from "three";
import Hoeken from "./component/hoeken";
function App() {
  //console.log("app rerender");
  const [reset, setReset] = useState(0);
  const [fourbar,setFourbar] = useState(false);
  const [hoeken,setHoeken] = useState(false);
  const [peaucellier,setPeaucellier] = useState(false);

  return (
    <div className="App">


      <button
        onClick={() => {
          setHoeken(false)
          setPeaucellier(false)
          setFourbar(!fourbar);

        }}
      >
        Fourbar
      </button>

      <button
        onClick={() => {
          setPeaucellier(false)
          setFourbar(false)
          setHoeken(!hoeken);
        }}
      >
        Hoecken
      </button>

      <button
        onClick={() => {
          setHoeken(false)
          setFourbar(false)
          setPeaucellier(!peaucellier);
        }}
      >
        Peaucellier
      </button>
      
      <Canvas className="Box">
      <color attach="background" args={["#f0fcfc"]} />
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <gridHelper args={[100,100]} rotation-x={Math.PI/2} />
        <ambientLight args={["#ffffff", 0.3]} />
        <pointLight args={["yellow", 1]} position={[0, 2, 8]} />
        <Environment files="/empty_warehouse_01_1k.hdr" />
        
        {peaucellier&&<Peaucellier position={[0,5,0]}/>}

        {fourbar&&<Fourbar position={[0,10,0]}/>}
        {hoeken&&<Hoeken position={[0,0,0]}/>}

      
    
      </Canvas>
      {/* 

        <Pbd position={[0,0,0]}/>
 

           <Plane args={[101,100,100]} position={[0,10,0]} rotation={[Math.PI/2,0,0]} color="blue"/>
        <Ball radius={2} position={[0,0,5]} velocity={new Vector3(0,0,0)}/>

        

        <mesh rotation={[0,0,0]} position={[0,0,-1.5/2]}>
          <boxGeometry args={[10,10,1.5]} />
          <meshStandardMaterial color="red"/>
        </mesh>
             

                       <Ui/>

                             <button
        onClick={() => {
          console.log("done reset");
          setReset(reset + 1);
        }}
      >
        CLICK TO RESET{" "}
      </button>


  */}
    </div>
  );
}

export default App;
