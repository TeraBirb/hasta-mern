import React from 'react';
import { render } from '@testing-library/react';
import SideDrawer from './SideDrawer';

describe('SideDrawer component', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    div.id = 'drawer-hook'; // Add ID to the container element
    document.body.appendChild(div); // Append container to the document body
    render(<SideDrawer show={true} />, { container: div }); // Render SideDrawer with the container
  });
});
