// // App.test.js
// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Added this line
// import { render } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import App from './App'; // Adjust the import path according to your file structure

// // At the top of your test file
// jest.mock('axios', () => ({
//   get: jest.fn(),
//   post: jest.fn(),
//   // Add other methods as needed
// }));

// describe('App Component', () => {
//   test('renders without crashing', () => {
//     const div = document.createElement('div');
//     div.id = 'root';
//     document.body.appendChild(div);

//     ReactDOM.render(<App />, div);
//     const { getByText } = render(<App />);
//     // Assuming your App component renders a button with "SEARCH" text as part of the Search component
//     expect(getByText(/SEARCH/i)).toBeInTheDocument();
//   });
// });