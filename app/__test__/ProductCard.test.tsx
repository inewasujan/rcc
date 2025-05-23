import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/productCard';

describe('ProductCard', () => {
  const product = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    image: 'test-image.png',
  };

  it('renders product info correctly', () => {
    render(<ProductCard {...product} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    const img = screen.getByRole('img', { name: /test product/i });
    expect(img).toHaveAttribute('src', 'test-image.png');
  });

  it('handles click event', () => {
    const handleClick = jest.fn();

    render(<ProductCard {...product} onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button')); // CardActionArea acts as button

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
