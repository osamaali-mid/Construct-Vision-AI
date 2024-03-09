import { render, screen, act } from '@testing-library/react';
import Page from '../app/page';

describe('Page', () => {
  it('renders a heading', async () => {
    await act(async () => {
      render(<Page />);
    });

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
