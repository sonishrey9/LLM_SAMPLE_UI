
import React from 'react';
import SearchInterface from '../search/SearchInterface';

const SearchSection: React.FC = () => {
  return (
    <section className="flex flex-col">
      <h2 className="dlite-heading mb-4">Web Search & AI Analysis</h2>
      <SearchInterface />
    </section>
  );
};

export default SearchSection;
