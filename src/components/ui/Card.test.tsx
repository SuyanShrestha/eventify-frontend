import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';
import '@testing-library/jest-dom';
import { act } from 'react';

describe('Card Component', () => {
  const imageProps = {
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Sample Image',
    imageTitle: 'Sample Title',
  };

  it('renders correctly with given image props', () => {
    render(<Card {...imageProps} />);
    const cardImage = screen.getByAltText('Sample Image');
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute('src', 'https://via.placeholder.com/150');
    expect(cardImage).toHaveAttribute('title', 'Sample Title');
  });

  it('applies hover effect on mouse enter and leave', () => {
    render(<Card {...imageProps} />);

    const card = screen.getByAltText('Sample Image').closest('div');
    
    act(() => {
      fireEvent.mouseEnter(card!);
    });

    expect(card).toHaveStyle('transform: scale(1)');
    expect(card).toHaveStyle('box-shadow: 0 2px 10px rgb(0 0 0 / 8%)');

    act(() => {
      fireEvent.mouseLeave(card!);
    });

    expect(card).toHaveStyle('transform: scale(1)');
    expect(card).toHaveStyle('box-shadow: 0 2px 10px rgb(0 0 0 / 8%)');
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<Card {...imageProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
