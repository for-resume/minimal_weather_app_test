import React from 'react';

import styles from './City.module.css';

type PropsType = {
  name: string;
  country: string;
  deg: number;
  addCityIdToList: () => void;
};

const City: React.FC<PropsType> = ({ name, country, deg, addCityIdToList }) => {
  const onClickHandler = () => {
    addCityIdToList();
  };

  return (
    <div onClick={onClickHandler} className={`${styles.City}`}>
      <p className={`${styles.CityName}`}>
        {name}, {country}
      </p>
      <p className={`${styles.CityTemp}`}>{deg.toFixed()} &deg;C</p>
    </div>
  );
};

export default City;
