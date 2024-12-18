import { OrbitControls } from '@react-three/drei';

function ControleCamera() {
  return (
    <OrbitControls
      enableZoom={true} 
      maxPolarAngle={Math.PI / 2} 
      minPolarAngle={0}
      enablePan={false}
    />
  );
}

export default ControleCamera;
