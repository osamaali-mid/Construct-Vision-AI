import { RefObject } from 'react';
import Webcam from 'react-webcam';

import { DetectedObject } from '@tensorflow-models/coco-ssd';

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
      ctx.fillStyle = name === 'person' ? '#a855f7' : '#22c55e';
      ctx.globalAlpha = 0.4;
      if (mirrored) {
        ctx.roundRect(ctx.canvas.width - x, y, -width, height, 8);
      } else {
        ctx.roundRect(x, y, width, height, 8);
      }
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.globalAlpha = 1;
      if (mirrored) {
        ctx.fillText(namePerson, ctx.canvas.width - x - width + 15, y + 25);
      } else {
        ctx.fillText(namePerson, x + 15, y + 25);
      }
    }
  });
};
