import React, { useState, FormEvent } from 'react';

interface SearchFormProps {
  onSearch: (searchTerm: string, searchType: 'user' | 'company') => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<'user' | 'company'>('user');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchTerm) {
      onSearch(searchTerm, searchType); // Trigger search with search term and type
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value as 'user' | 'company')}
        className="border p-2 rounded"
        aria-label="Search type"
      >
        <option value="user">User</option>
        <option value="company">Company</option>
      </select>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search ID"
        className="border p-2 rounded ml-2"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
