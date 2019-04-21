import React from 'react';
import './style.scss';

const Search = props => (
    <div className="search">
        <input
            className="search__input"
            type="text"
            onChange={props.getSearchQuery}
            placeholder="Search"
        />
    </div>
);

export default Search;
