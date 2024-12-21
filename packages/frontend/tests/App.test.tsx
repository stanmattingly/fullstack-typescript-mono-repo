import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App Component', () => {
  it('renders the heading', () => {
    // Render the App component
    render(<App />);

    // Assert that the heading is rendered
    const heading = screen.getByText(/hello world/i);
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-xl');
    expect(heading).toHaveClass('text-indigo-900');
  });
});
