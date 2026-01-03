import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from './App';

/*
  Mock property data so tests run with predictable values
*/
jest.mock('./properties.json', () => [
  {
    id: 'p1',
    type: 'House',
    price: 300000,
    bedrooms: 3,
    dateAdded: '2025-10-01',
    postcode: 'BR1',
    location: 'Test Location 1',
    description: 'Test House',
    images: ['img1.jpg']
  },
  {
    id: 'p2',
    type: 'Flat',
    price: 150000,
    bedrooms: 2,
    dateAdded: '2025-09-01',
    postcode: 'NW1',
    location: 'Test Location 2',
    description: 'Test Flat',
    images: ['img2.jpg']
  }
]);

/*
  Disable scroll behaviour during tests
*/
jest.mock('./components/ScrollToTop', () => () => null);

describe('Estate Agent Application', () => {

  /* TEST 1: App renders successfully */
  test('renders application title', () => {
    render(<App />);
    const titles = screen.getAllByText(/Estate Agent App/i);
    expect(titles.length).toBeGreaterThan(0);
  });

  /* TEST 2: Properties load from JSON */
  test('displays property cards from data source', () => {
    render(<App />);
    expect(screen.getByText(/House - 3 Bed/i)).toBeInTheDocument();
    expect(screen.getByText(/Flat - 2 Bed/i)).toBeInTheDocument();
  });

  /* TEST 3: Search filters results correctly */
  test('filters properties when searching by type', async () => {
    render(<App />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Flat' }
    });

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.queryByText(/House - 3 Bed/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Flat - 2 Bed/i)).toBeInTheDocument();
  });

  /* TEST 4: Property can be added to favourites */
  test('adds a property to favourites list', async () => {
    render(<App />);

    fireEvent.click(screen.getAllByTitle(/add to favorites/i)[0]);

    const favouritesHeading = screen.getByRole('heading', { name: 'Favorites' });
    expect(favouritesHeading).toBeInTheDocument();

    const favouritesSection = favouritesHeading.closest('.favorites-container');
    expect(within(favouritesSection).getByText(/£300,000/i)).toBeInTheDocument();
  });

  /* TEST 5: Duplicate favourites are prevented */
  test('prevents duplicate favourites', async () => {
    render(<App />);

    const favButton = screen.getAllByTitle(/add to favorites/i)[0];
    fireEvent.click(favButton);
    fireEvent.click(favButton);

    const favouritesSection = screen
      .getByRole('heading', { name: 'Favorites' })
      .closest('.favorites-container');

    const savedItems = within(favouritesSection).getAllByText(/£300,000/i);
    expect(savedItems.length).toBe(1);
  });

});
