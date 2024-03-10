import { UserEvents, UserEventsTypes } from '@/types';
import { render, screen } from '@testing-library/react';

import FeatureHighlights from './feature-highlights';

describe('renderValue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.HTMLElement.prototype.scrollTo = jest.fn();
  });
  it('should render correctly for SCREENSHOT', () => {
    const event: UserEvents[] = [{ type: UserEventsTypes.SCREENSHOT, value: '/test.png' }];
    render(<FeatureHighlights userEvents={event} />);
    expect(screen.getByAltText('camera')).toBeInTheDocument();
  });

  it('should render correctly for RECORD_STARTED', () => {
    const event: UserEvents[] = [{ type: UserEventsTypes.RECORD_STARTED, value: new Date() }];
    render(<FeatureHighlights userEvents={event} />);
    expect(screen.getByText(/Recording started at/)).toBeInTheDocument();
  });

  it('should render correctly for RECORD_STOPPED', () => {
    const event: UserEvents[] = [{ type: UserEventsTypes.RECORD_STOPPED, value: new Date() }];
    render(<FeatureHighlights userEvents={event} />);
    expect(screen.getByText(/Recording stopped at/)).toBeInTheDocument();
  });

  it('should render correctly for RECORD_DOWNLOAD', () => {
    const event: UserEvents[] = [{ type: UserEventsTypes.RECORD_DOWNLOAD, value: 'test.mp4' }];
    render(<FeatureHighlights userEvents={event} />);
    expect(screen.getByText('Recording succesfully downloaded')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
  });

  it('should render correctly for TOGGLE_MIRROR', () => {
    const event: UserEvents[] = [{ type: UserEventsTypes.TOGGLE_MIRROR, value: 'test' }];
    render(<FeatureHighlights userEvents={event} />);
    expect(screen.getByText(/Image test/)).toBeInTheDocument();
  });

  it('should render correctly for VOLUME', () => {
    const event: UserEvents[] = [{ type: UserEventsTypes.VOLUME, value: 0.5 }];
    render(<FeatureHighlights userEvents={event} />);
    expect(screen.getByText(/Volume set to 50%/)).toBeInTheDocument();
  });
  it('should render correctly for THEME', () => {
    const event: UserEvents[] = [{ type: UserEventsTypes.THEME, value: 'dark' }];
    render(<FeatureHighlights userEvents={event} />);
    expect(screen.getByText(/Theme changed to DARK/)).toBeInTheDocument();
  });
  it('should render null as default', () => {
    const event: UserEvents[] = [];
    render(<FeatureHighlights userEvents={event} />);
    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });
});
