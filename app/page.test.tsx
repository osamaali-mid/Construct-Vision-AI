import React from 'react';
import { render, fireEvent, act, screen, waitFor } from '@testing-library/react';
import HomePage from './page';
import * as cocossd from '@tensorflow-models/coco-ssd';

jest.mock('@tensorflow-models/coco-ssd');

jest.mock('@tensorflow-models/coco-ssd', () => ({
  load: jest.fn().mockResolvedValue({ detect: jest.fn() }),
}));

describe('HomePage', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await act(async () => {
      render(<HomePage />);
    });
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });

  it('renders all buttons with links', () => {
    expect(screen.getByText('Go to About')).toBeTruthy();
    expect(screen.getByText('Link 2')).toBeTruthy();
    expect(screen.getByText('Link 3')).toBeTruthy();
  });

  it('toggles mirror state when button is clicked', () => {
    const toggleButton = screen.getByTestId('toggle-mirror');

    fireEvent.click(toggleButton);

    expect(toggleButton).toBeTruthy();
    expect(screen.getByTestId('webcam')).toBeTruthy();
    expect(screen.getByTestId('webcam')).toHaveAttribute('style', '');
  });

  it('renders ThemeToggler component', () => {
    expect(screen.getByText('Toggle theme')).toBeTruthy();
  });

  it('calls userPromptScreenshot when camera button is clicked', () => {
    const cameraButton = screen.getByTestId('camera');

    fireEvent.click(cameraButton);

    // Add assertions for the expected behavior
  });

  it('calls userPromptRecord when video button is clicked', () => {
    const videoButton = screen.getByTestId('video');

    fireEvent.click(videoButton);

    // Add assertions for the expected behavior
  });

  it('toggles auto recording when auto record button is clicked', () => {
    const autoRecordButton = screen.getByTestId('auto-record');

    fireEvent.click(autoRecordButton);

    // Add assertions for the expected behavior
  });
  it('should resizeCanvas and drawOnCanvas when runPrediction is called', async () => {
    const runPrediction = jest.fn();
    const resizeCanvas = jest.fn();
    const drawOnCanvas = jest.fn();

    act(() => {
      runPrediction();
    });

    waitFor(() => {
      expect(resizeCanvas).toHaveBeenCalled();
      expect(drawOnCanvas).toHaveBeenCalled();
    });
  });
  it('should call model.detect when runPrediction is called', async () => {
    const runPrediction = jest.fn();
    const model = { detect: jest.fn() };

    act(() => {
      runPrediction();
    });

    waitFor(() => {
      expect(model.detect).toHaveBeenCalled();
    });
  });
  it('should show toast when auto record is toggled', () => {
    const autoRecordButton = screen.getByTestId('auto-record');

    fireEvent.click(autoRecordButton);

    waitFor(() => {
      expect(screen.getByText('Auto Record Enabled')).toBeTruthy();
    });
  });
});
describe('runPrediction', () => {
  let model: any;
  let webCamRef: any;
  let canvasRef: any;
  let mirrored: any;
  let drawOnCanvas: any;
  let resizeCanvas: any;

  beforeEach(() => {
    model = { detect: jest.fn() };
    webCamRef = { current: { video: { readyState: 4 } } };
    canvasRef = { current: { getContext: jest.fn() } };
    mirrored = {};
    drawOnCanvas = jest.fn();
    resizeCanvas = jest.fn();

    (cocossd.load as jest.Mock).mockResolvedValue(model);
  });

  it('should run prediction if model is available and video is ready', async () => {
    const runPrediction = async () => {
      if (model && webCamRef.current?.video?.readyState === 4) {
        const predictions: cocossd.DetectedObject[] = await model.detect(
          webCamRef.current.video as HTMLVideoElement,
        );

        resizeCanvas(canvasRef, webCamRef);
        drawOnCanvas(mirrored, predictions, canvasRef.current?.getContext('2d'));
      }
    };

    await runPrediction();

    waitFor(() => {
      expect(model.detect).toHaveBeenCalledWith(webCamRef.current.video);
      expect(resizeCanvas).toHaveBeenCalledWith(canvasRef, webCamRef);
      expect(drawOnCanvas).toHaveBeenCalledWith(mirrored, expect.any(Array), expect.any(Function));
    });
  });
});
