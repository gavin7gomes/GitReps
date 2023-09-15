import React from 'react';
import styles from './SearchBar.module.css';
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

function SearchBar({ searchParams, onSearchQueryChange, onSearch, onFocus }) {

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === 'Return') {
      onSearch();
    }
  };

  return (
    <div className={styles['search-bar-container']}>
      <SearchIcon />
      <input
        type="text"
        placeholder="Search public repos..."
        className={styles['search-input']}
        value={searchParams.query}
        onChange={(e) => onSearchQueryChange(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={onFocus}
      />
      <label htmlFor="sortOptionSelect" className={styles['sort-label']}>
        Sort by:
      </label>
      <select 
        value={searchParams.sortOption} 
        onChange={(e) => {
          onSearchQueryChange(e.target.value, "sort");
        }} 
        className={styles['sort-select']}>
        <option value="stars">Stars</option>
        <option value="watchers">Watchers</option>
        <option value="score">Score</option>
        <option value="name">Name</option>
        <option value="created_at">Created At</option>
        <option value="updated_at">Updated At</option>
      </select>
      <label htmlFor="sortOptionSelect" className={styles['sort-label']}>
        Order by:
      </label>
      <select 
        value={searchParams.order} 
        onChange={(e) => {
          onSearchQueryChange(e.target.value, "order");
        }} 
        className={styles['sort-select']}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default SearchBar;
