import { useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { Raycaster } from "three";

const InteractionTest = () => {
  const { camera, scene, raycaster, pointer } = useThree();
  const clickFunc = (e: any) => {
    // 한 축 방향에서 클릭하면 세개의 상자가 모두 바뀌게됨, 이벤트 버블링을 막아서 겹치는 부분이 생기더라도 해당되지 않게 함
    e.stopPropagation();
    e.object.material.color = new THREE.Color("green");
  };

  const groupClickFunc = (e: any) => {
    // e.stopPropagation();
    // event 에 해당되는 mesh 만 변경된다.
    // e.object.material.color = new THREE.Color("yellow");
    raycaster.setFromCamera(pointer, camera);

    // scene 안에 있는 모든 object를 검출
    // const intersects = raycaster.intersectObject(scene, true);
    // console.log(intersects);

    // 이벤트가 발생한 안에 있는 모든 object를 검출
    const intersects = raycaster.intersectObject(e.eventObject, true);
    console.log(intersects);

    if (intersects.length > 0) {
      console.log(intersects[0]);
      const mesh = intersects[0].object as any;
      mesh.material.color = new THREE.Color("red");
    }
  };
  return (
    <>
      <ambientLight />
      <directionalLight intensity={5} />
      <group onClick={(e) => groupClickFunc(e)}>
        <mesh position={[-2, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <mesh position={[2, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </group>
    </>
  );
};

export default InteractionTest;
