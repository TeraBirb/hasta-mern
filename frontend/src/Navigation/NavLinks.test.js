import React from 'react';
import { render } from '@testing-library/react';
import NavLinks from './NavLinks';
import { MemoryRouter } from 'react-router-dom';

describe('NavLinks component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    );
  });

  test('displays correct links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    );

    expect(getByText('HOME')).toBeInTheDocument();
    expect(getByText('FAVORITES')).toBeInTheDocument();
    expect(getByText('ABOUT')).toBeInTheDocument();
    expect(getByText('LOGIN')).toBeInTheDocument();
  });
});