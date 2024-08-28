import "./App.css";
import { Canvas } from "@react-three/fiber";
import ThreeElement from "./ThreeElement";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import MaterialElement from "./MaterialElement";
import LightElement from "./LightElement";

function App() {
  // GUI 로 control 하려는 항목을 작성할 수 있음.
  const color = useControls({
    value: "black",
  });

  const grid = useControls({
    segment: {
      value: 10,
      min: 2,
      max: 100,
      step: 1,
    },
  });

  return (
    <>
      <Canvas
        // orthographic // camera type, orthographic :2d, 기본값은 3d
        camera={{
          // zoom: 150,
          near: 1,
          far: 100,
          fov: 75, // 2d camera에 없는부분으로 orthographic 에서 zoom 이 대신한다.
          position: [5, 5, 5],
        }}
      >
        <color attach="background" args={[color.value]} />
        {/* 카메라의 시점을 변경할수 있는 controler */}
        <OrbitControls
          // AzimuthAngle => 방위각, 좌우 움직이는데 제한거는 것
          minAzimuthAngle={-Math.PI / 4} // Math.PI 기본적으로 180도
          maxAzimuthAngle={Math.PI / 4}
          // PolarAngle => 상하 움직이는데 제한거는 것
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
        {/* 좌표값을 확인할수 있는 controler, args 값은 길이로 기본단위는 m임*/}
        {/* <axesHelper args={[5]} /> */}
        {/* 바닥에 grid 를 깔고 규격에 맞춰서 보여주는 controler args={[grid 크기, 전체 segmentation, center 에는 red 색상으로 표시, 마지막은 나머지 그리드 색상]}*/}
        {/* <gridHelper args={[20, grid.segment]} /> */}
        {/* <ThreeElement /> */}
        {/* <MaterialElement /> */}
        <LightElement />
      </Canvas>
      R3F basic
    </>
  );
}

export default App;
