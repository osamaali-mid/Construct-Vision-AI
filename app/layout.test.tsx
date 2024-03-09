import React from 'react';
import { render, waitFor } from '@testing-library/react';
import RootLayout from './layout';

describe('RootLayout', () => {
  it('renders children inside ThemeProvider', () => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with correct HTML structure', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    waitFor(() => {
      expect(container.firstChild).toHaveProperty('tagName', 'HTML');
      expect(container.firstChild).toHaveProperty('lang', 'en');
      expect(container.firstChild?.firstChild).toHaveProperty('tagName', 'BODY');
      expect(container.firstChild?.firstChild?.firstChild).toHaveProperty('tagName', 'DIV');
      expect(container.firstChild?.firstChild?.firstChild).toHaveTextContent('Test Content');
    });
  });
});
