import { useFrame } from "@react-three/fiber";
import { useRef,useState } from "react";
import { Clock, Vector3 } from "three";

const g = new Vector3(0,0,-9.8);

const Ball = ({radius,position,velocity}) => {
    const mesh = useRef(null);
    const [hover,setHover] = useState(false);

    const over = ()=>{setHover(true)};
    const out = ()=>{setHover(false)};

    useFrame((state,delta)=>{
      
      mesh.current.userData.vel.addScaledVector(g,delta)
      mesh.current.position.addScaledVector(mesh.current.userData.vel,delta);
      if(mesh.current.position.z<=0){
        mesh.current.position.z = 0;
        mesh.current.userData.vel.setZ(-mesh.current.userData.vel.z)
      }
    });
    return (
      <mesh  ref={mesh} onPointerOver={over} onPointerOut={out} position={position} userData-vel={velocity} >
        <sphereGeometry args={[radius]}/>
        <meshLambertMaterial color={hover?"blue":"yellow"} />
      </mesh>
    )
};

export default Ball;
