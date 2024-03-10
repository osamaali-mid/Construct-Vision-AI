import { RefObject } from 'react';
import Webcam from 'react-webcam';

type VideoCanvasProps = {
  webCamRef: RefObject<Webcam>;
  mirrored: boolean;
  canvasRef: RefObject<HTMLCanvasElement>;
};

function VideoCanvas({ canvasRef, mirrored, webCamRef }: VideoCanvasProps) {
  return (
    <div className="relative mt-1">
      <div className="relative h-full w-full">
        <Webcam
          ref={webCamRef}
          mirrored={mirrored}
          className="h-full w-full object-contain p-2"
          data-testid="webcam"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 h-full w-full object-contain"
          data-testid="canvas"
        />
      </div>
    </div>
  );
}

export default VideoCanvas;
