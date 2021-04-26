import React from 'react';

import styles from './RightCard.module.css';

import SearchCity from '../SearchCity/SearchCity';
import CityList from '../CityList/CityList';

const RightCard = () => {
  return (
    <div className={`${styles.RightCard}`}>
      <SearchCity />
      <CityList />
    </div>
  );
};

export default RightCard;
