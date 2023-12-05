'use client';

import { useVideoTexture } from '@react-three/drei';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ContextType = {
  webcamStream: MediaStream | null;
  videoElement: HTMLVideoElement | null;
  startWebcam: () => void;
  stopWebcam: () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

const WebcamContext = React.createContext<ContextType | undefined>(undefined);

export const WebcamProvider = ({ children }: ProviderProps) => {
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);

  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null
  );

  const startWebcam = useCallback(async () => {
    try {
      const video = document.createElement('video') as HTMLVideoElement;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });

      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      video.play();

      setWebcamStream(stream);
      setVideoElement(video);
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  }, []);

  const stopWebcam = useCallback(() => {
    if (webcamStream && webcamStream.getTracks().length > 0) {
      webcamStream.getTracks().forEach((track) => {
        track.stop();
      });
      setWebcamStream(null);
    }
  }, [webcamStream]);

  useEffect(() => {
    return () => stopWebcam();
  }, [stopWebcam]);

  return (
    <WebcamContext.Provider
      value={{
        webcamStream,
        videoElement,
        startWebcam,
        stopWebcam,
      }}
    >
      {children}
    </WebcamContext.Provider>
  );
};

export const useWebcam = () => {
  const context = useContext(WebcamContext);
  if (!context)
    throw new Error('Called useWebcam before setting WebcamProvider context');

  return context;
};

type WebcamMaterialProps = {
  webcamStream: MediaStream;
};

export const WebcamMaterial = ({ webcamStream }: WebcamMaterialProps) => {
  const webcamTexture = useVideoTexture(webcamStream);

  const uniforms = useMemo(
    () => ({
      u_texture: { value: webcamTexture },
    }),
    [webcamTexture]
  );

  const vertexShader = `
  varying vec2 v_uv;
  uniform float u_time;
  
  void main() {
    v_uv = uv;
    vec3 newPosition = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }`;

  const fragmentShader = `
  varying vec2 v_uv;
  uniform sampler2D u_texture;
  uniform float u_time;
  
  void main() {
    vec4 final = texture2D(u_texture, v_uv);
    gl_FragColor = final;
  }
`;

  return (
    <shaderMaterial
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
    />
  );
};
