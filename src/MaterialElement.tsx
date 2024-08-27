import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const MaterialElement = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {});

  useEffect(() => {
    for (let i = 0; i < groupRef.current!.children.length; i++) {
      const mesh = groupRef.current!.children[i] as THREE.Mesh;
      mesh.geometry = meshRef.current!.geometry;
      mesh.position.x = (i + 1) * 2;
    }
  }, []);

  return (
    <>
      <directionalLight position={[5, 5, 5]} />
      {/* <fog attach={"fog"} args={["blue", 3, 10]} /> */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 16]} />
      </mesh>
      <group ref={groupRef}>
        <mesh>
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
        <mesh>
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
            emissive={"black"} // material 자체에서 방출하는 color, 기본값은 black
          />
        </mesh>
        <mesh>
          {/* phong 은 반사되는 빛에대한 영향을 받음, 플라스틱 같은 것*/}
          <meshPhongMaterial
            color="green"
            visible={true}
            transparent={false}
            opacity={1} // transparent 가 true 일 때만 조정됨
            side={THREE.FrontSide} // 앞면이 기본, 뒤를 바라보면 geometry 가 사라짐 frontside, backside, doubleside 가 있음
            alphaTest={0.5} // alphatest 보다 opacity가 낮아지면 geometry 안보임
            depthTest={true} // true 기본값,  뒤에있는 물체가 가려보이지않고 다 보이게 됨, 거리계산을 하지않음
            depthWrite={true} // 내가 카메라에서 얼마나 먼지를 계산하는 buffer 에 내가 설정한 geometry 는 사용하지 않겠다. z 값에 의한 ordering 이 사라지게됨
            fog={true} // fog 값에 의해서 영향을 받나/ 안받나, 기본값 false
            emissive={"black"} // material 자체에서 방출하는 color, 기본값은 black
            specular={"#fff"}
            shininess={40}
            flatShading={true}
          />
        </mesh>
        <mesh>
          {/* normal 은 x,y,z의 벡터값을 rgb로 변경*/}
          <meshNormalMaterial />
        </mesh>
      </group>
    </>
  );
};

export default MaterialElement;
