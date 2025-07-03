import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ProductCard from '../ProductCard/ProductCard';
import { ThemeProvider } from '../../contexts/ThemeContext';

vi.mock('../../contexts/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    meal: 'Test Burger',
    price: 10.99,
    img: 'test-burger.png',
    description: 'A delicious test burger',
    category: 'burger'
  };

  const mockOnAddToCart = vi.fn();

  beforeEach(() => {
    mockOnAddToCart.mockClear();
  });

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    expect(screen.getByText('Test Burger')).toBeInTheDocument();
    expect(screen.getByText('$ 10.99 USD')).toBeInTheDocument();
    expect(screen.getByText('A delicious test burger')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-burger.png');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Burger');
  });

  it('adds product to cart with default quantity of 1', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const addToCartButton = screen.getByText('Add to cart');
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith('1', 1, mockProduct);
  });

  it('adds product to cart with custom quantity', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const quantityInput = screen.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: '3' } });
    
    const addToCartButton = screen.getByText('Add to cart');
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith('1', 3, mockProduct);
  });

  it('prevents quantity from going below 1', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const quantityInput = screen.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: '-2' } });
    
    const addToCartButton = screen.getByText('Add to cart');
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith('1', 1, mockProduct);
  });

  it('handles empty input by defaulting to 1', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const quantityInput = screen.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: '' } });
    
    const addToCartButton = screen.getByText('Add to cart');
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith('1', 1, mockProduct);
  });
}); 