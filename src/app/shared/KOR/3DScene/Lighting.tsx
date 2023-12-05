'use client';

const Lighting = ({ color = 'white' }: { color?: string }) => {
  return (
    <>
      <ambientLight color={'white'} intensity={4.2} />
      <directionalLight
        castShadow={false}
        receiveShadow={false}
        color={color}
        position={[2, 2, -6.7]}
        intensity={1}
      />
      <directionalLight
        castShadow={false}
        receiveShadow={false}
        color={color}
        position={[-2, 2, -6.7]}
        intensity={1}
      />
      <directionalLight
        castShadow={false}
        receiveShadow={false}
        color={color}
        position={[0, 10, 0]}
        intensity={1}
      />

      <directionalLight
        castShadow={false}
        receiveShadow={false}
        color={color}
        position={[-2, -0.4, -4]}
        intensity={1}
      />
      <directionalLight
        castShadow={false}
        receiveShadow={false}
        color={color}
        position={[2, -0.4, -4]}
        intensity={1}
      />
    </>
  );
};

export default Lighting;
