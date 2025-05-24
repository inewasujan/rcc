import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/productCard'; 

describe('ProductCard', () => {
  const sampleProps = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
    onClick: jest.fn(),
    isSelected: false,
  };
 

  it('calls onClick handler when clicked', () => {
    render(<ProductCard {...sampleProps} />);
    const card = screen.getByRole('button'); 
    fireEvent.click(card);
    expect(sampleProps.onClick).toHaveBeenCalled();
  });

 
});
