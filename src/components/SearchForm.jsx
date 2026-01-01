import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './SearchForm.css'; // Import CSS

function SearchForm({ onSearch }) {
  const [startDate, setStartDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const criteria = {
      type: formData.get('type'),
      minPrice: formData.get('minPrice'),
      maxPrice: formData.get('maxPrice'),
      minBedrooms: formData.get('minBedrooms'),
      maxBedrooms: formData.get('maxBedrooms'),
      postcode: formData.get('postcode'),
      dateAdded: startDate ? startDate.toISOString().split('T')[0] : ''
    };
    onSearch(criteria);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__inputs">
        
        {/* Type Select */}
        <div className="search-form__group">
            <label className="search-form__label">Property Type</label>
            <select name="type" className="search-form__select">
                <option value="any">Any</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
                <option value="Bungalow">Bungalow</option>
            </select>
        </div>

        {/* Price Group */}
        <div className="search-form__range-group">
             <div className="search-form__group">
                <label className="search-form__label">Price (£)</label>
                <input type="number" name="minPrice" placeholder="Min" className="search-form__input search-form__input--short" />
             </div>
             <span style={{ paddingBottom: '10px' }}>-</span>
             <input type="number" name="maxPrice" placeholder="Max" className="search-form__input search-form__input--short" style={{ marginBottom: 0 }} />
        </div>

        {/* Bedrooms Group */}
        <div className="search-form__range-group">
             <div className="search-form__group">
                <label className="search-form__label">Bedrooms</label>
                <input type="number" name="minBedrooms" placeholder="Min" className="search-form__input search-form__input--tiny" />
             </div>
             <span style={{ paddingBottom: '10px' }}>-</span>
             <input type="number" name="maxBedrooms" placeholder="Max" className="search-form__input search-form__input--tiny" style={{ marginBottom: 0 }} />
        </div>

        {/* Postcode */}
        <div className="search-form__group">
            <label className="search-form__label">Postcode</label>
            <input type="text" name="postcode" placeholder="e.g. BR1" className="search-form__input search-form__input--short" />
        </div>

        {/* DatePicker */}
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