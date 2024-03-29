import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Authenticate from './Authenticate';
import { AuthContext } from '../Context/auth-context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Mock axios and useNavigate
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Authenticate Component', () => {
  // Provide a mock implementation for AuthContext
  const mockLogin = jest.fn();
  const authProviderValue = {
    isLoggedIn: false,
    login: mockLogin,
  };

  beforeEach(() => {
    // Reset mocks before each test
    axios.post.mockClear();
    useNavigate.mockClear();
  });

  it('renders and shows LOGIN as default mode', () => {
    render(
      <AuthContext.Provider value={authProviderValue}>
        <Authenticate />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.queryByText(/confirm password/i)).not.toBeInTheDocument();
  });

  // New test case for invalid credentials
  it('shows an error message on invalid login credentials', async () => {
    // Mock axios to simulate a failed login attempt
    axios.post.mockRejectedValue(new Error('Invalid credentials'));

    render(
      <AuthContext.Provider value={authProviderValue}>
        <Authenticate />
      </AuthContext.Provider>
    );

    // Simulate user input for invalid credentials
    fireEvent.input(screen.getByLabelText(/username/i), { target: { value: 'wronguser' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

    // Click the login button
    fireEvent.click(screen.getByText(/login/i));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });

    // Verify that the login function was not called
    expect(mockLogin).not.toHaveBeenCalled();
  });
});
