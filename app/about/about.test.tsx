import { render, screen } from '@testing-library/react';
import AboutPage from './page';

describe('HomePage', () => {
  test('renders the heading and link', () => {
    render(<AboutPage />);

    const headingElement = screen.getByText('About');
    const linkElement = screen.getByText('Go to Home');

    expect(headingElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
