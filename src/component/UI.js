import { OrthographicCamera } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {OrbitControls,PerspectiveCamera, Plane} from "@react-three/drei";

const h = window.innerHeight;
const w = window.innerWidth;
const Ui = () => {
  const [point, setPoint] = useState([]);
  console.log(w, h);

  function addPoint(e){
    console.log("x: ");
  }

  return (
    <>
      <Canvas on orthographic camera={{ zoom: 10, position: [0, 0,20] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Plane args={[101,100,100]} position={[0,0,0]} rotation={[0,0,0]} color="blue"/>

        <directionalLight intensity={4.16} />
        <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
          <boxGeometry args={[5, 5, 5]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </Canvas>
    </>
  );
};

export default Ui;
