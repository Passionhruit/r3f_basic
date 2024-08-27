import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const MaterialElement = () => {
  useFrame((state, delta) => {});

  useEffect(() => {}, []);

  return (
    <>
      <directionalLight position={[5, 5, 5]} />
      <fog attach={"fog"} args={["blue", 3, 10]} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry />
        <meshBasicMaterial wireframe color="red" />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <boxGeometry />
        <meshBasicMaterial
          color="red"
          visible={true}
          transparent={false}
          opacity={1} // transparent 가 true 일 때만 조정됨
          side={THREE.FrontSide} // 앞면이 기본, 뒤를 바라보면 geometry 가 사라짐 frontside, backside, doubleside 가 있음
          alphaTest={0.5} // alphatest 보다 opacity가 낮아지면 geometry 안보임
          depthTest={true} // true 기본값,  뒤에있는 물체가 가려보이지않고 다 보이게 됨, 거리계산을 하지않음
          depthWrite={true} // 내가 카메라에서 얼마나 먼지를 계산하는 buffer 에 내가 설정한 geometry 는 사용하지 않겠다. z 값에 의한 ordering 이 사라지게됨
          fog={true} // fog 값에 의해서 영향을 받나/ 안받나, 기본값 false
        />
      </mesh>
      <mesh position={[4, 0, 0]}>
        <boxGeometry />
        {/* ambertMaterial 은 빛에대한 영향을 받음 */}
        <meshLambertMaterial
          color="red"
          visible={true}
          transparent={false}
          opacity={1} // transparent 가 true 일 때만 조정됨
          side={THREE.FrontSide} // 앞면이 기본, 뒤를 바라보면 geometry 가 사라짐 frontside, backside, doubleside 가 있음
          alphaTest={0.5} // alphatest 보다 opacity가 낮아지면 geometry 안보임
          depthTest={true} // true 기본값,  뒤에있는 물체가 가려보이지않고 다 보이게 됨, 거리계산을 하지않음
          depthWrite={true} // 내가 카메라에서 얼마나 먼지를 계산하는 buffer 에 내가 설정한 geometry 는 사용하지 않겠다. z 값에 의한 ordering 이 사라지게됨
          fog={true} // fog 값에 의해서 영향을 받나/ 안받나, 기본값 false
          emissive={"yellow"} // material 자체에서 방출하는 color, 기본값은 black
        />
      </mesh>
    </>
  );
};

export default MaterialElement;
