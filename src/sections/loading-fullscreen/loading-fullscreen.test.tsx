import { render, screen } from '@testing-library/react';

import LoadingFullScreen from './loading-fullscreen';

jest.mock('react-loader-spinner', () => ({
  Rings: () => <div data-testid="mock-rings" />,
}));

describe('LoadingFullScreen', () => {
  it('should render Rings when loading is true', () => {
    render(<LoadingFullScreen loading />);
    expect(screen.getByTestId('mock-rings')).toBeInTheDocument();
  });

  it('should not render Rings when loading is false', () => {
    render(<LoadingFullScreen loading={false} />);
    expect(screen.queryByTestId('mock-rings')).not.toBeInTheDocument();
  });
});
