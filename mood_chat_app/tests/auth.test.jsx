import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { auth } from '../src/firebase';
import App from '../src/App'; 


// Mock the Firebase authentication module
jest.mock('../src/firebase', () => {
  const auth = {
    onAuthStateChanged: jest.fn(),
    signInWithPopup: jest.fn(),
    signOut: jest.fn(),
    GoogleAuthProvider: jest.fn(),
  };

jest.mock('../img/icons8-search-50.png', () => 'icons8-search-50.png');

  return {
    auth,
  };
});

// Mock the AddUser function (replace with your actual implementation)
jest.mock('../src/component/AddUser', () => {
  return (authUser) => {
    // Mock implementation of AddUser, replace with your own logic
    console.log('Mocked AddUser function called with:', authUser);
  };
});

describe('App Component', () => {
  // Restore the original implementation of GoogleAuthProvider after each test
  afterEach(() => {
    auth.GoogleAuthProvider.mockClear();
  });

  it('renders the component without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('renders the sign-in button when user is not authenticated', () => {
    const { getByText } = render(<App />);
    const signInButton = getByText('Please sign in to use the chat');
    expect(signInButton).toBeInTheDocument();
  });
});
