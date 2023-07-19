import React from 'react';
import '../../sass/main.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export const SearchBox = () => {
  return (
    <div className='search-box-container'>
      <input type='text' placeholder='Vodoinstalater, kuhinja, veš mašine...' />
      <FontAwesomeIcon icon={faSearch} />
    </div>
  );
};
