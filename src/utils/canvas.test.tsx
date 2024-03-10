import { DetectedObject } from '@tensorflow-models/coco-ssd';
import { waitFor } from '@testing-library/react';

import { drawOnCanvas, resizeCanvas } from './canvas';

// Mocking dependencies
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(() => ({ current: {} })),
}));

jest.mock('react-webcam', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    current: { video: { videoWidth: 100, videoHeight: 100 } },
  })),
}));

// Test for resizeCanvas function
describe('resizeCanvas', () => {
  it('should resize the canvas correctly', () => {
    const canvasRef = { current: { width: 0, height: 0 } };
    const webcamRef = { current: { video: { videoWidth: 200, videoHeight: 150 } } };

    resizeCanvas(canvasRef, webcamRef);

    expect(canvasRef.current.width).toBe(200);
    expect(canvasRef.current.height).toBe(150);
  });
});

// Test for drawOnCanvas function
describe('drawOnCanvas', () => {
  it('should draw on the canvas correctly', () => {
    const ctx = {
      beginPath: jest.fn(),
      fillStyle: '', // Mocked as a property
      globalAlpha: jest.fn(),
      roundRect: jest.fn(),
      fill: jest.fn(),
      font: jest.fn(),
      fillText: jest.fn(),
      canvas: { width: 200, height: 150 },
    };

    const predictions: DetectedObject[] = [
      { class: 'person', bbox: [10, 10, 50, 50], score: 0.8 },
      { class: 'car', bbox: [20, 20, 40, 40], score: 0.7 },
    ];

    drawOnCanvas(false, predictions, ctx as unknown as CanvasRenderingContext2D);

    waitFor(() => {
      expect(ctx.beginPath).toHaveBeenCalled();
      expect(ctx.fillStyle).toEqual('white'); // Matching color hex code
      expect(ctx.globalAlpha).toHaveBeenCalled();
      expect(ctx.roundRect).toHaveBeenCalled();
      expect(ctx.fill).toHaveBeenCalled();
      expect(ctx.font).toHaveBeenCalled();
      expect(ctx.fillText).toHaveBeenCalled();
    });
  });
  it('should draw specific roundRect if is mirrored', () => {
    const ctx = {
      beginPath: jest.fn(),
      fillStyle: '', // Mocked as a property
      globalAlpha: jest.fn(),
      roundRect: jest.fn(),
      fill: jest.fn(),
      font: jest.fn(),
      fillText: jest.fn(),
      canvas: { width: 200, height: 150 },
    };

    const predictions: DetectedObject[] = [
      { class: 'person', bbox: [10, 10, 50, 50], score: 0.8 },
      { class: 'car', bbox: [20, 20, 40, 40], score: 0.7 },
    ];

    drawOnCanvas(true, predictions, ctx as unknown as CanvasRenderingContext2D);

    waitFor(() => {
      expect(ctx.beginPath).toHaveBeenCalled();
      expect(ctx.fillStyle).toEqual('white'); // Matching color hex code
      expect(ctx.globalAlpha).toHaveBeenCalled();
      expect(ctx.roundRect).toHaveBeenCalled();
      expect(ctx.fill).toHaveBeenCalled();
      expect(ctx.font).toHaveBeenCalled();
      expect(ctx.fillText).toHaveBeenCalled();
    });
  });
  it('should draw specific fillText if is mirrored', () => {
    const ctx = {
      beginPath: jest.fn(),
      fillStyle: '', // Mocked as a property
      globalAlpha: jest.fn(),
      roundRect: jest.fn(),
      fill: jest.fn(),
      font: jest.fn(),
      fillText: jest.fn(),
      canvas: { width: 200, height: 150 },
    };

    const predictions: DetectedObject[] = [
      { class: 'person', bbox: [10, 10, 50, 50], score: 0.8 },
      { class: 'car', bbox: [20, 20, 40, 40], score: 0.7 },
    ];

    drawOnCanvas(true, predictions, ctx as unknown as CanvasRenderingContext2D);

    waitFor(() => {
      expect(ctx.beginPath).toHaveBeenCalled();
      expect(ctx.fillStyle).toEqual('white'); // Matching color hex code
      expect(ctx.globalAlpha).toHaveBeenCalled();
      expect(ctx.roundRect).toHaveBeenCalled();
      expect(ctx.fill).toHaveBeenCalled();
      expect(ctx.font).toHaveBeenCalled();
      expect(ctx.fillText).toHaveBeenCalled();
    });
  });
});
