'use client';

import { useIdentityIQ } from '@/hooks';
import { LeftNav, LoadingFullScreen, MiddleControls, VideoCanvas } from '@/sections';

import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

function HomePage() {
  const {
    webCamRef,
    canvasRef,
    mirrored,
    isRecording,
    volume,
    userEvents,
    loading,
    handleToggle,
    userPrompRecord,
    userPrompScreenshot,
    setVolume,
    registerUserEvent,
  } = useIdentityIQ();

  return (
    <>
      <div className="flex h-screen w-screen justify-center items-center">
        <div className="flex h-[80vh] max-w-[80vw] justify-center border p-2 border-violet-700 m-1 relative rounded-md">
          <LeftNav />

          <VideoCanvas {...{ webCamRef, mirrored, canvasRef }} />

          <MiddleControls
            {...{
              handleToggle,
              isRecording,
              registerUserEvent,
              userPrompRecord,
              userPrompScreenshot,
              setVolume,
              volume,
              userEvents,
            }}
          />
        </div>
      </div>
      <LoadingFullScreen {...{ loading }} />
    </>
  );
}

export default HomePage;
