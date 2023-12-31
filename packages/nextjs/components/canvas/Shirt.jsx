import { useRef } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "~~/store";



const Shirt = () => {
  const snap = useSnapshot(state);


  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (
    <group
      key={stateString}
      // renderOrder={1}
    >
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
      {snap.isFullTexture && (
        <Decal 
          mesh={nodes.T_Shirt_male}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={0.4}
          map={fullTexture}
        ></Decal>
      )}

      {snap.isLogoTexture && (
        <Decal 
          mesh={nodes.T_Shirt_male}
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={[0.3, 0.15, 1]}
          map={logoTexture}
          map-anisotropy={50}
          depthTest={false}
          depthWrite={true}
          >
            
        </Decal>
      )}
      </mesh>
    </group>
  )
}

export default Shirt;