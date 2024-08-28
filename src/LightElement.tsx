import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Environment, useHelper, useTexture } from "@react-three/drei";

const LightElement = () => {
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

  const dLight = useRef<THREE.DirectionalLight>(null!);
  useHelper(dLight, THREE.DirectionalLightHelper);

  return (
    <>
      {/* directionalLight : color값, position, intensity 를 가짐, 방향이 있는 빛 (햇빛) */}
      {/* <directionalLight
        ref={dLight}
        color={"#fff"}
        intensity={5}
        position={[0, 5, 0]}
        target-position={[0, 0, 2]}
      /> */}
      {/* ambientlight : color, intensity 넣는 것이 기본, 주변광 및 간접광 같은 형태*/}
      {/* <ambientLight color="blue" /> */}
      {/* hemisphereLight : 위쪽에서비추는 색상, 아래쪽에서비추는색상 강도, 돔 라이트 : 하늘색깔조명, 바닥색깔 조명*/}
      {/* <hemisphereLight args={["blue", "yellow", 3]} /> */}
      {/* <fog attach={"fog"} args={["blue", 3, 10]} /> */}
      {/* pointLight : 방향이 없이 전체적으로 퍼지는 빛, 백열등 */}
      {/* <pointLight
        color={"#fff"}
        intensity={50}
        position={[0, 0, 2]}
        distance={10}
      /> */}
      {/* 스포트라이트 : 각도 조절가능, 맨마지막은 빛의 가장자리부분의 흐릿함정도  */}
      {/* <spotLight
        color={"#fff"}
        intensity={300}
        position={[0, 5, 0]}
        distance={10}
        angle={THREE.MathUtils.degToRad(40)}
        target-position={[0, 0, 0]}
        penumbra={0.5}
      /> */}
      <Environment files={"./imgs/hdr1.hdr"} background blur={0.1} />
      <mesh rotation-x={[THREE.MathUtils.degToRad(-90)]} position-y={-1}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial side={THREE.DoubleSide} color={"#100d96"} />
      </mesh>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.2]} />
      </mesh>
      <group ref={groupRef}>
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
            thickness={0.5}
            ior={2}
          />
        </mesh>
        <mesh>
          {/* 몇개 톤만으로 이루어진 모습으로 렌더링, 컬러값 변경 가능, 빛에대해 영향 받음 */}
          <meshToonMaterial gradientMap={tone} color="pink" />
        </mesh>
      </group>
    </>
  );
};

export default LightElement;
