import { render, screen } from '@testing-library/react';

import LeftNav from './left-nav';

jest.mock(
  'next/link',
  () =>
    function Link({ children }: { children: React.ReactNode }) {
      return <div>{children}</div>;
    },
);

describe('LeftNav', () => {
  it('renders without crashing', () => {
    render(<LeftNav />);
    expect(screen.getByText('IdentityIQ')).toBeInTheDocument();
  });

  it('renders the logo', () => {
    render(<LeftNav />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<LeftNav />);
    expect(
      screen.getByText(
        'AI-Powered Next.js 14 Web App with TensorFlow People Detection, Screenshot & Recording',
      ),
    ).toBeInTheDocument();
  });

  it('renders the LinkedIn button', () => {
    render(<LeftNav />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'LinkedIn' })).toBeInTheDocument();
  });

  it('renders the Website button', () => {
    render(<LeftNav />);
    expect(screen.getByText('Website')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Website' })).toBeInTheDocument();
  });

  it('renders the GitHub button', () => {
    render(<LeftNav />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'GitHub' })).toBeInTheDocument();
  });
});
