import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
// import { useControls } from "leva";

const ThreeElement = () => {
  const { size, gl, scene, camera } = useThree();
  const boxRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // const box = useControls({
  //   rotation: {
  //     value: 0,
  //     min: -360,
  //     max: 360,
  //     step: 1,
  //   },
  // });

  useFrame((state, delta) => {
    // boxRef.current.rotation.x += delta;
    // boxRef.current.rotation.y -= 0.01;
    // boxRef.current.scale.z += 0.01;
    // scene.position.x += 0.01; // scene 자체가 x축으로 이동, object3d 이기 때문에 position 속성 사용 가능
    groupRef.current.rotation.x += delta;
  });
  return (
    <>
      <directionalLight position={[5, 5, 5]} />
      <group
        ref={groupRef}
        position={[0, 0, 0]}
        rotation={[
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(45),
          THREE.MathUtils.degToRad(0),
        ]}
      >
        <mesh
          ref={boxRef}
          position={[0, 0, 0]}
          // position-x={[5]} // position x 축만 이동하고 싶은 경우
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
        <mesh
          ref={boxRef}
          position={[2, 0, 0]}
          // position-x={[5]} // position x 축만 이동하고 싶은 경우
          scale={[1, 1, 1]}
          rotation={[
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0),
          ]}
        >
          <axesHelper args={[3]} />
          <boxGeometry />
          <meshStandardMaterial color="blue" />
        </mesh>
        <mesh
          ref={boxRef}
          position={[0, 2, 0]}
          // position-x={[5]} // position x 축만 이동하고 싶은 경우
          scale={[1, 1, 1]}
          rotation={[
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0),
          ]}
        >
          <boxGeometry />
          <meshStandardMaterial color="green" />
        </mesh>
      </group>
    </>
  );
};

export default ThreeElement;
