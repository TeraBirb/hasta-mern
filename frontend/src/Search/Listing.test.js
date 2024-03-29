import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Listing from './Listing';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/auth-context';
import axios from 'axios';

// Mocking axios and react-router-dom's useLocation, components for isolation
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));
jest.mock('../UIElements/NavigateBack', () => () => <div>Mock NavigateBack</div>);
jest.mock('../UIElements/Map', () => () => <div>Mock Map</div>);

// Describing a test suite for the Listing Component
describe('Listing Component', () => {
  // Mock data to simulate a listing object and authentication context
  const mockListing = {
    id: '123',
    title: 'Test Listing',
    price: '1000',
    location: {
      address: {
        street_number: '123',
        street_name: 'Main St',
        city: 'Anytown',
        state_code: 'AN',
        coordinate: { lat: 0, lon: 0 },
      },
    },
    photos: [{ href: 'http://example.com/photo.jpg' }],
    description: {
      beds: 3,
      baths: 2,
      sqft: '1000',
    },
    tags: ['tag1', 'tag2'],
    contact: 'http://example.com/contact',
  };

  const mockAuthContext = {
    isLoggedIn: true,
    userId: 'user123',
    token: 'token',
  };

  // Setting up mocks for each test
  beforeEach(() => {
    useLocation.mockImplementation(() => ({ state: mockListing }));
  });

  // Test to verify that the Listing component renders correctly, favorite status is checked on load
  it('renders correctly and checks favorite status on load', async () => {
    axios.get.mockResolvedValue({ data: { isListingInFavorites: true } });

    const { findByAltText, findByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <Listing />
      </AuthContext.Provider>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(await findByAltText('Test Listing')).toHaveAttribute('src', 'https://www.svgrepo.com/show/404845/black-heart.svg');
    expect(await findByText('Test Listing')).toBeInTheDocument();
  });

  // Test to verify that clicking the favorite icon toggles the favorite status of the listing
  it('toggles favorite status when clicked', async () => {
    axios.get.mockResolvedValue({ data: { isListingInFavorites: false } });
    axios.patch.mockResolvedValue({});
    axios.delete.mockResolvedValue({});

    const { findByAltText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <Listing />
      </AuthContext.Provider>
    );

    const favoriteIcon = await findByAltText('Test Listing');
    expect(favoriteIcon).toHaveAttribute('src', 'https://www.svgrepo.com/show/404845/black-heart.svg');

    fireEvent.click(favoriteIcon);

    await waitFor(() => expect(axios.patch).toHaveBeenCalledTimes(1));
    act(() => {
      axios.get.mockResolvedValue({ data: { isListingInFavorites: true } });
    });

    expect(axios.patch).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
      userId: 'user123',
      listingId: '123',
    }), expect.anything());
  });
});
