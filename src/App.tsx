import "./App.css";
import { Canvas } from "@react-three/fiber";
import ThreeElement from "./ThreeElement";

function App() {
  return (
    <>
      <Canvas
        // orthographic // camera type, orthographic :2d, 기본값은 3d
        camera={{
          // zoom: 150,
          near: 1,
          far: 20,
          fov: 150, // 2d camera에 없는부분으로 orthographic 에서 zoom 이 대신한다.
          position: [5, 5, 0],
        }}
      >
        <ThreeElement />
      </Canvas>
      R3F basic
    </>
  );
}

export default App;
