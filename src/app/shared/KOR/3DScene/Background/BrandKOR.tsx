import { useMemo } from 'react';
import { useGLTF, Instances, Instance } from '@react-three/drei';
import { Euler, Vector3 } from 'three';

function BrandKorBackground() {
  const glb = useGLTF('renderings/backgrounds/231130_BroadKOR.glb');

  const MIN_DISTANCE = 7;
  const positions = useMemo(
    () =>
      [...Array(250)].map(() => ({
        position: getRandomPosition(MIN_DISTANCE),
        rotation: new Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
      })),
    []
  );

  function getRandomPosition(minDistance: number): Vector3 {
    const direction = new Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();

    const distance = minDistance + Math.random() * 40;
    const position = direction.multiplyScalar(distance);

    return position;
  }

  return (
    <group>
      <Instances geometry={(glb as any).nodes.kor_broad.geometry}>
        <meshStandardMaterial roughness={0} metalness={1} />
        <group position={[0, 0, 0]}>
          {positions.map((position, i) => (
            <group key={i} {...position}>
              <Instance />
            </group>
          ))}
        </group>
      </Instances>
    </group>
  );
}

export default BrandKorBackground;
