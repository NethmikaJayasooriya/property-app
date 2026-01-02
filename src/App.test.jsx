import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// --- MOCKS ---

// 1. Mock the JSON Data
jest.mock('./properties.json', () => [
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
]);

// 2. Mock ScrollToTop
jest.mock('./components/ScrollToTop', () => {
  return () => null;
});

// 3. Mock DatePicker CSS
jest.mock("react-datepicker/dist/react-datepicker.css", () => ({}));

describe('Estate Agent App Tests', () => {

  // TEST 1: Smoke Test
  test('renders the main application title', () => {
    render(<App />);
    const titleElements = screen.getAllByText(/Estate Agent App/i);
    // Check that at least one of them exists
    expect(titleElements[0]).toBeInTheDocument();
  });

  // TEST 2: UI Check
  test('renders key search form inputs', () => {
    render(<App />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  // TEST 3: Data Loading
  test('displays properties from the mock data', () => {
    render(<App />);
    expect(screen.getByText(/£250,000/i)).toBeInTheDocument();
    expect(screen.getByText(/£150,000/i)).toBeInTheDocument();
  });

  // TEST 4: Search Logic
  test('filters properties when search criteria is applied', async () => {
    render(<App />);
    
    // 1. Verify BOTH cards are visible initially
    expect(screen.getByText(/House - 3 Bed/i)).toBeInTheDocument();
    expect(screen.getByText(/Flat - 2 Bed/i)).toBeInTheDocument();

    // 2. Change the dropdown to "Flat"
    const typeSelect = screen.getByRole('combobox');
    fireEvent.change(typeSelect, { target: { value: 'Flat' } });

    // 3. Click the Search button
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    // 4. Wait for the "House" to disappear
    await waitFor(() => {
        expect(screen.queryByText(/House - 3 Bed/i)).not.toBeInTheDocument();
    });

    // 5. The "Flat" should still be there
    expect(screen.getByText(/Flat - 2 Bed/i)).toBeInTheDocument();
  });

  // TEST 5: Favorites Feature
  test('renders the favorites drop zone area', () => {
    render(<App />);

    //check specifically for the unique text inside the sidebar:
    expect(screen.getByText(/Drag properties here/i)).toBeInTheDocument();
  });
});

// Delayed import
const App = require('./App').default;