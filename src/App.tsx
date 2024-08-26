import "./App.css";
import { Canvas } from "@react-three/fiber";
import ThreeElement from "./ThreeElement";

function App() {
  return (
    <>
      <Canvas>
        <ThreeElement />
      </Canvas>
      R3F basic
    </>
  );
}

export default App;
