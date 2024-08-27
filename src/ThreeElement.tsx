import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
// import { useControls } from "leva";

const ThreeElement = () => {
  const { size, gl, scene, camera } = useThree();
  const boxRef = useRef<THREE.Mesh>(null);

  // const box = useControls({
  //   rotation: {
  //     value: 0,
  //     min: -360,
  //     max: 360,
  //     step: 1,
  //   },
  // });

  useFrame((state, delta) => {
    //   console.log("state:", state);
    //   console.log("delta", delta);
    // console.log("boxRef", boxRef);
    // boxRef.current.rotation.x += delta;
    // boxRef.current.rotation.y -= 0.01;
    // boxRef.current.scale.z += 0.01;
  });
  return (
    <>
      <directionalLight position={[5, 5, 5]} />
      <mesh
        ref={boxRef}
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        rotation={[
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(0),
        ]}
      >
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
};

export default ThreeElement;
