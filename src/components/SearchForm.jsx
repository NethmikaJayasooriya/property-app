import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './SearchForm.css';

function SearchForm({ onSearch }) {
  // Local state to manage the controlled DatePicker component
  const [startDate, setStartDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Get raw values for validation
    let minPrice = formData.get('minPrice');
    let maxPrice = formData.get('maxPrice');
    let minBedrooms = formData.get('minBedrooms');
    let maxBedrooms = formData.get('maxBedrooms');

    // Validation: Ensure no negative numbers and swap values if Min is greater than Max
    if (minPrice < 0) minPrice = 0;
    if (maxPrice < 0) maxPrice = 0;
    if (minBedrooms < 0) minBedrooms = 0;
    if (maxBedrooms < 0) maxBedrooms = 0;

    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
        [minPrice, maxPrice] = [maxPrice, minPrice];
    }
    if (minBedrooms && maxBedrooms && Number(minBedrooms) > Number(maxBedrooms)) {
        [minBedrooms, maxBedrooms] = [maxBedrooms, minBedrooms];
    }

    // Aggregate form data into a structured search criteria object
    const criteria = {
      type: formData.get('type'),
      minPrice: minPrice,
      maxPrice: maxPrice,
      minBedrooms: minBedrooms,
      maxBedrooms: maxBedrooms,
      postcode: formData.get('postcode').trim(),
      // Format the date object to YYYY-MM-DD string for easier comparison
      dateAdded: startDate ? startDate.toISOString().split('T')[0] : ''
    };
    
    // Pass the criteria up to the parent component to trigger filtering
    onSearch(criteria);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__inputs">
        
        <div className="search-form__group">
            <label className="search-form__label">Property Type</label>
            <select name="type" className="search-form__select">
                <option value="any">Any</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
                <option value="Bungalow">Bungalow</option>
            </select>
        </div>

        {/* Price Range Inputs */}
        <div className="search-form__range-group">
             <div className="search-form__group">
                <label className="search-form__label">Price (£)</label>
                <input 
                    type="number" 
                    name="minPrice" 
                    placeholder="Min" 
                    min="0" 
                    className="search-form__input search-form__input--short" 
                />
             </div>
             <span style={{ paddingBottom: '10px' }}>-</span>
             <input 
                type="number" 
                name="maxPrice" 
                placeholder="Max" 
                min="0" 
                className="search-form__input search-form__input--short" 
                style={{ marginBottom: 0 }} 
            />
        </div>

        {/* Bedroom Range Inputs */}
        <div className="search-form__range-group">
             <div className="search-form__group">
                <label className="search-form__label">Bedrooms</label>
                <input 
                    type="number" 
                    name="minBedrooms" 
                    placeholder="Min" 
                    min="0" 
                    className="search-form__input search-form__input--tiny" 
                />
             </div>
             <span style={{ paddingBottom: '10px' }}>-</span>
             <input 
                type="number" 
                name="maxBedrooms" 
                placeholder="Max" 
                min="0" 
                className="search-form__input search-form__input--tiny" 
                style={{ marginBottom: 0 }} 
            />
        </div>

        <div className="search-form__group">
            <label className="search-form__label">Postcode</label>
            <input type="text" name="postcode" placeholder="e.g. BR1" className="search-form__input search-form__input--short" />
        </div>

        {/*DatePicker integration */}
        <div className="search-form__group">
            <label className="search-form__label">Added After</label>
            <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                placeholderText="Select Date"
                customInput={<input className="search-form__input" style={{ width: '100%' }} />}
            />
        </div>

        <button type="submit" className="search-form__submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;