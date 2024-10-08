import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const MaterialElement = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {});

  const matcap = useTexture("./imgs/matcap2.jpg");
  const tone = useTexture("./imgs/fiveTone.jpg");
  tone.minFilter = THREE.NearestFilter;
  tone.magFilter = THREE.NearestFilter;

  useEffect(() => {
    for (let i = 0; i < groupRef.current!.children.length; i++) {
      const mesh = groupRef.current!.children[i] as THREE.Mesh;
      mesh.geometry = meshRef.current!.geometry;
      mesh.position.x = (i + 1) * 2 - 10;
    }
  }, []);

  return (
    <>
      {/* <directionalLight position={[5, 5, 5]} /> */}
      {/* <fog attach={"fog"} args={["blue", 3, 10]} /> */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.2]} />
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

        {/* 물리기반 렌더링 material */}

        <mesh>
          <meshStandardMaterial
            color="orange"
            visible={true}
            transparent={false}
            opacity={1} // transparent 가 true 일 때만 조정됨
            side={THREE.FrontSide} // 앞면이 기본, 뒤를 바라보면 geometry 가 사라짐 frontside, backside, doubleside 가 있음
            alphaTest={0.5} // alphatest 보다 opacity가 낮아지면 geometry 안보임
            depthTest={true} // true 기본값,  뒤에있는 물체가 가려보이지않고 다 보이게 됨, 거리계산을 하지않음
            depthWrite={true} // 내가 카메라에서 얼마나 먼지를 계산하는 buffer 에 내가 설정한 geometry 는 사용하지 않겠다. z 값에 의한 ordering 이 사라지게됨
            fog={true} // fog 값에 의해서 영향을 받나/ 안받나, 기본값 false
            emissive={"black"}
            roughness={0.3} // 높일수록 표면 거칠어지는 느낌
            metalness={0.5} // 높일수록 금속느낌
          />
        </mesh>
        <mesh>
          <meshPhysicalMaterial
            color="purple"
            visible={true}
            transparent={false}
            opacity={1} // transparent 가 true 일 때만 조정됨
            side={THREE.FrontSide} // 앞면이 기본, 뒤를 바라보면 geometry 가 사라짐 frontside, backside, doubleside 가 있음
            alphaTest={0.5} // alphatest 보다 opacity가 낮아지면 geometry 안보임
            depthTest={true} // true 기본값,  뒤에있는 물체가 가려보이지않고 다 보이게 됨, 거리계산을 하지않음
            depthWrite={true} // 내가 카메라에서 얼마나 먼지를 계산하는 buffer 에 내가 설정한 geometry 는 사용하지 않겠다. z 값에 의한 ordering 이 사라지게됨
            fog={true} // fog 값에 의해서 영향을 받나/ 안받나, 기본값 false
            emissive={"black"}
            roughness={0.3} // 높일수록 표면 거칠어지는 느낌
            metalness={0.5} // 높일수록 금속느낌
            clearcoat={1}
            clearcoatRoughness={0}
            transmission={0}
            thickness={10}
            ior={2}
          />
        </mesh>
        <mesh>
          {/* 카메라와의 거리에따라 흰색, 검은색으로 변경 */}
          <meshDepthMaterial />
        </mesh>

        <mesh>
          {/* light 가 필요가 없음 */}
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
        <mesh>
          {/* 몇개 톤만으로 이루어진 모습으로 렌더링, 컬러값 변경 가능 */}
          <meshToonMaterial gradientMap={tone} color="pink" />
        </mesh>
      </group>
    </>
  );
};

export default MaterialElement;
