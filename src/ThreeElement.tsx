import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Box } from "@react-three/drei";
import { useControls } from "leva";
// import { useControls } from "leva";

const ThreeElement = () => {
  const { size, gl, scene, camera } = useThree();
  const boxRef = useRef<THREE.Mesh>(null);
  const boxCopyRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const boxControls = useControls({
    width: {
      value: 1,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    height: {
      value: 1,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    depth: {
      value: 1,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    widthSeg: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    heightSeg: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    depthSeg: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
  });

  const circleControls = useControls({
    radius: {
      value: 1,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    seg: {
      value: 32,
      min: 1,
      max: 100,
      step: 1,
    },
    thetaStart: {
      value: 0,
      min: 0,
      max: 360,
      step: 0.1,
    },
    thetaLength: {
      value: 360,
      min: 0,
      max: 360,
      step: 0.1,
    },
  });

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
  });

  useEffect(() => {
    // element 가 처음 rendering 될 때 호출, 다음의 component 가 준비가 될 때 호출됨
    boxCopyRef.current.geometry = boxRef.current?.geometry;
  }, [boxControls]);

  return (
    <>
      <directionalLight position={[5, 5, 5]} />
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* mesh 추가하는 방법3, drei 이용, 제일 쉬운방식으로 구조에 익숙해지면 사용 추천*/}
        <Box position={[-2, 0, 0]}>
          <meshStandardMaterial color="green" />
        </Box>

        {/* mesh 추가하는 방법2 */}
        <mesh geometry={new THREE.BoxGeometry(1, 1, 1, 1)}>
          <meshStandardMaterial color="blue" />
        </mesh>

        {/* mesh 추가하는 방법 1 => mesh,geometry,material 의 관계가 제일 중요하므로 이방식 추천*/}
        <mesh
          ref={boxRef}
          position={[0, 0, 2]}
          // position-x={[5]} // position x 축만 이동하고 싶은 경우
          scale={[1, 1, 1]}

          // rotation={[
          //   THREE.MathUtils.degToRad(0),
          //   THREE.MathUtils.degToRad(0),
          //   THREE.MathUtils.degToRad(0),
          // ]}
        >
          {/* args=width, height, depth, widthSegments, heightSegments, depthSegments */}
          <boxGeometry
            args={[
              boxControls.width,
              boxControls.height,
              boxControls.depth,
              boxControls.widthSeg,
              boxControls.heightSeg,
              boxControls.depthSeg,
            ]}
          />
          <meshStandardMaterial color="red" />
        </mesh>

        {/* geometry 공유하는방법 */}
        <mesh ref={boxCopyRef} position={[0, 2, 0]}>
          <meshStandardMaterial wireframe />
        </mesh>

        {/* circleGeometry */}
        <mesh position={[4, 0, 0]}>
          <circleGeometry
            args={[
              circleControls.radius,
              circleControls.seg,
              THREE.MathUtils.degToRad(circleControls.thetaStart),
              THREE.MathUtils.degToRad(circleControls.thetaLength),
            ]}
          />
          <meshStandardMaterial color="pink" />
        </mesh>
      </group>
    </>
  );
};

export default ThreeElement;
