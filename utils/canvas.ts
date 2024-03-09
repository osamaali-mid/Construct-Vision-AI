import { DetectedObject } from '@tensorflow-models/coco-ssd';
import { RefObject } from 'react';
import Webcam from 'react-webcam';

export const resizeCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  webcamRef: RefObject<Webcam>,
) => {
  const canvas = canvasRef.current;
  const video = webcamRef.current?.video;

  if (video && canvas) {
    const { videoWidth, videoHeight } = video;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
  }
};

export const drawOnCanvas = (
  mirrored: boolean,
  predictions: DetectedObject[],
  ctx: CanvasRenderingContext2D | null | undefined,
) => {
  predictions.forEach((detectedObject: DetectedObject) => {
    const { class: name, bbox, score } = detectedObject;
    const [x, y, width, height] = bbox;
    const namePerson = `${name} - ${Math.round(score * 100)}%`;
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = name === 'person' ? 'red' : 'blue';
      ctx.globalAlpha = 0.4;
      mirrored
        ? ctx.roundRect(ctx.canvas.width - x, y, -width, height, 8)
        : ctx.roundRect(x, y, width, height, 8);
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.globalAlpha = 1;
      mirrored
        ? ctx.fillText(namePerson, ctx.canvas.width - x - width + 15, y + 25)
        : ctx.fillText(namePerson, x + 15, y + 25);
    }
  });
};
