import React from "react";
import * as THREE from "three";

const InteractionTest = () => {
  const clickFunc = (e: any) => {
    // 한 축 방향에서 클릭하면 세개의 상자가 모두 바뀌게됨, 이벤트 버블링을 막아서 겹치는 부분이 생기더라도 해당되지 않게 함
    e.stopPropagation();
    e.object.material.color = new THREE.Color("green");
  };
  return (
    <>
      <ambientLight />
      <directionalLight intensity={5} />
      <mesh onClick={(e) => clickFunc(e)} position={[-2, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      <mesh onClick={(e) => clickFunc(e)} position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      <mesh onClick={(e) => clickFunc(e)} position={[2, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default InteractionTest;
