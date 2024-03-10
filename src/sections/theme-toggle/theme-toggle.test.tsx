import { useTheme } from 'next-themes';

import { fireEvent, render, waitFor } from '@testing-library/react';

import ThemeToggler from './theme-toggle';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

const mockSetTheme = jest.fn();
const mockRegisterUserEvent = jest.fn();

describe('ThemeToggler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({ setTheme: mockSetTheme });
  });

  test('renders without crashing', () => {
    render(<ThemeToggler registerUserEvent={mockRegisterUserEvent} />);
  });

  test('should call setTheme with light theme on button click', () => {
    const { getByTestId } = render(<ThemeToggler registerUserEvent={mockRegisterUserEvent} />);
    const toggleButton = getByTestId('toggle-button');
    fireEvent.click(toggleButton);

    waitFor(() => {
      const lightOption = getByTestId('light-option');
      fireEvent.click(lightOption);
    });

    waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalledWith('light'); // It should start with 'light'
      expect(mockRegisterUserEvent).toHaveBeenCalledWith('THEME', 'light');
    });
  });

  test('should call setTheme with dark theme when Dark option is clicked', () => {
    const { getByTestId } = render(<ThemeToggler registerUserEvent={mockRegisterUserEvent} />);
    const toggleButton = getByTestId('toggle-button');
    fireEvent.click(toggleButton);
    waitFor(() => {
      const lightOption = getByTestId('dark-option');
      fireEvent.click(lightOption);
    });

    waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
      expect(mockRegisterUserEvent).toHaveBeenCalledWith('THEME', 'dark');
    });
  });

  test('should call setTheme with system theme when System option is clicked', () => {
    const { getByTestId } = render(<ThemeToggler registerUserEvent={mockRegisterUserEvent} />);
    const toggleButton = getByTestId('toggle-button');
    fireEvent.click(toggleButton);
    waitFor(() => {
      const lightOption = getByTestId('system-option');
      fireEvent.click(lightOption);
    });

    waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalledWith('system');
      expect(mockRegisterUserEvent).toHaveBeenCalledWith('THEME', 'system');
    });
  });
});
