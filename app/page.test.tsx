import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import HomePage from './page';

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children,
);

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
});
