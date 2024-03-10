import { UserEventsTypes } from '@/types';
import { beep } from '@/utils';
import { fireEvent, render, waitFor } from '@testing-library/react';

import MiddleControls from './middle-controls';

jest.mock(
  '@/sections/feature-highlights/feature-highlights',
  () =>
    function FeatureHighlights() {
      return <div data-testid="mock-feature-highlights" />;
    },
);
jest.mock(
  '@/sections/theme-toggle/theme-toggle',
  () =>
    function ThemeToggle() {
      return <div data-testid="mock-theme-toggle" />;
    },
);

jest.mock('@/utils/audio', () => ({ beep: jest.fn() }));

describe('MiddleControls', () => {
  const mockProps = {
    registerUserEvent: jest.fn(),
    handleToggle: jest.fn(),
    userPrompScreenshot: jest.fn(),
    isRecording: false,
    userPrompRecord: jest.fn(),
    volume: 0,
    setVolume: jest.fn(),
    userEvents: [],
  };

  it('should render correctly', () => {
    const { getByTestId } = render(<MiddleControls {...mockProps} />);
    waitFor(() => {
      expect(getByTestId('mock-button')).toBeInTheDocument();
      expect(getByTestId('mock-slider')).toBeInTheDocument();
      expect(getByTestId('mock-feature-highlights')).toBeInTheDocument();
      expect(getByTestId('mock-theme-toggle')).toBeInTheDocument();
    });
  });

  it('should call handleToggle when button is clicked', () => {
    const { getByTestId } = render(<MiddleControls {...mockProps} />);
    waitFor(() => {
      fireEvent.click(getByTestId('mock-button'));
      expect(mockProps.handleToggle).toHaveBeenCalled();
    });
  });

  it('should call userPrompScreenshot when camera button is clicked', () => {
    const { getByTestId } = render(<MiddleControls {...mockProps} />);
    waitFor(() => {
      fireEvent.click(getByTestId('mock-camera'));
      expect(mockProps.userPrompScreenshot).toHaveBeenCalled();
    });
  });

  it('should call userPrompRecord when video button is clicked', () => {
    const { getByTestId } = render(<MiddleControls {...mockProps} />);
    waitFor(() => {
      fireEvent.click(getByTestId('mock-video'));
      expect(mockProps.userPrompRecord).toHaveBeenCalled();
    });
  });

  it('should call beep when volume slider is clicked', () => {
    const { getByTestId } = render(<MiddleControls {...mockProps} />);
    waitFor(() => {
      fireEvent.click(getByTestId('mock-slider'));
      expect(mockProps.setVolume).toHaveBeenCalled();
      expect(beep).toHaveBeenCalled();
    });
  });

  it('should not render feature highlights when userEvents is empty', () => {
    const { getByTestId } = render(<MiddleControls {...mockProps} />);
    waitFor(() => {
      expect(getByTestId('mock-feature-highlights')).not.toBeInTheDocument();
    });
  });

  it('should render feature highlights when userEvents is not empty', () => {
    const { getByTestId } = render(
      <MiddleControls
        {...mockProps}
        userEvents={[{ type: UserEventsTypes.RECORD_DOWNLOAD, value: 'test' }]}
      />,
    );
    waitFor(() => {
      expect(getByTestId('mock-feature-highlights')).not.toBeInTheDocument();
    });
  });
});
