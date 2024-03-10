import { render, screen } from '@testing-library/react';

import HomePage from './page';

jest.mock('@/sections/left-nav/left-nav', () => ({
  __esModule: true,
  default: () => <div>LeftNav</div>,
}));

jest.mock('@/sections/loading-fullscreen/loading-fullscreen', () => ({
  __esModule: true,
  default: () => <div>LoadingFullScreen</div>,
}));

jest.mock('@/sections/middle-controls/middle-controls', () => ({
  __esModule: true,
  default: () => <div>MiddleControls</div>,
}));

jest.mock('@/sections/video-canvas/video-canvas', () => ({
  __esModule: true,
  default: () => <div>VideoCanvas</div>,
}));

jest.mock('@/hooks/use-identity-iq/use-identity-iq', () =>
  jest.fn(() => ({
    webCamRef: {},
    canvasRef: {},
    mirrored: false,
    isRecording: false,
    volume: 0,
    userEvents: [],
    loading: false,
    handleToggle: jest.fn(),
    userPrompRecord: jest.fn(),
    userPrompScreenshot: jest.fn(),
    setVolume: jest.fn(),
    registerUserEvent: jest.fn(),
  })),
);

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
    expect(screen.getByText('LeftNav')).toBeInTheDocument();
    expect(screen.getByText('LoadingFullScreen')).toBeInTheDocument();
    expect(screen.getByText('MiddleControls')).toBeInTheDocument();
    expect(screen.getByText('VideoCanvas')).toBeInTheDocument();
  });
});
