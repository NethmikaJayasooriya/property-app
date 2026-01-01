import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

// MOCK DATA
vi.mock('./properties.json', () => ({
  default: [
    {
      id: "prop1",
      type: "House",
      price: 250000,
      bedrooms: 3,
      dateAdded: "2025-10-12",
      postcode: "BR5",
      location: "Test Location",
      description: "Test Description",
      images: ["test.jpg"]
    },
    {
      id: "prop2",
      type: "Flat",
      price: 150000,
      bedrooms: 2,
      dateAdded: "2025-09-14",
      postcode: "BR6",
      location: "Test Location 2",
      description: "Test Desc 2",
      images: ["test2.jpg"]
    }
  ]
}));

describe('Estate Agent App Tests', () => {

  // TEST 1: Smoke Test
  it('renders the main application title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Estate Agent App/i);
    expect(titleElement).toBeInTheDocument();
  });

  // TEST 2: UI Check
  it('renders key search form inputs', () => {
    render(<App />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  // TEST 3: Data Loading
  it('displays properties from the JSON data', () => {
    render(<App />);
    expect(screen.getByText(/£250,000/i)).toBeInTheDocument();
    expect(screen.getByText(/£150,000/i)).toBeInTheDocument();
  });

  // TEST 4: Search Logic (THE FIX IS HERE)
  it('filters properties when search criteria is applied', async () => {
    render(<App />);
    
    // 1. Verify specific card titles are visible
    expect(screen.getByText(/House - 3 Bed/i)).toBeInTheDocument();
    expect(screen.getByText(/Flat - 2 Bed/i)).toBeInTheDocument();

    // 2. Change the dropdown to "Flat"
    const typeSelect = screen.getByRole('combobox');
    fireEvent.change(typeSelect, { target: { value: 'Flat' } });

    // 3. Click the Search button
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    // 4. "House - 3 Bed" card should disappear. "Flat" card should remain.
    expect(screen.queryByText(/House - 3 Bed/i)).not.toBeInTheDocument(); 
    expect(screen.getByText(/Flat - 2 Bed/i)).toBeInTheDocument();
  });

  // TEST 5: Favorites Feature
  it('renders the favorites drop zone area', () => {
    render(<App />);
    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag properties here/i)).toBeInTheDocument();
  });
});