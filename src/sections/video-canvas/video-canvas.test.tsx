import React from 'react';
import Webcam from 'react-webcam';

import { render, screen, waitFor } from '@testing-library/react';

import VideoCanvas from './video-canvas';

jest.mock('react-webcam', () =>
  jest.fn().mockImplementation(() => <div data-testid="webcam-mock" />),
);

describe('VideoCanvas', () => {
  let canvasRef: React.RefObject<HTMLCanvasElement>;
  let webCamRef: React.RefObject<Webcam>;

  beforeEach(() => {
    canvasRef = React.createRef<HTMLCanvasElement>();
    webCamRef = React.createRef<Webcam>();
  });

  it('should render correctly', () => {
    render(<VideoCanvas canvasRef={canvasRef} mirrored webCamRef={webCamRef} />);
    expect(screen.getByTestId('webcam-mock')).toBeInTheDocument();
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
  });

  it('should pass mirrored prop to Webcam', () => {
    render(<VideoCanvas canvasRef={canvasRef} mirrored webCamRef={webCamRef} />);
    expect(Webcam).toHaveBeenCalledWith(expect.objectContaining({ mirrored: true }), {});
  });

  it('should pass refs to Webcam and canvas', () => {
    render(<VideoCanvas canvasRef={canvasRef} mirrored webCamRef={webCamRef} />);
    waitFor(() => {
      expect(screen.getByTestId('canvas')).toHaveProperty('ref', canvasRef);
    });
  });
});
