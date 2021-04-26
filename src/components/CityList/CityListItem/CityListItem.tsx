import React from 'react';

import deleteIcon from './delete.svg';
import styles from './CityListItem.module.css';

type PropsType = {
  name: string;
  country: string;
  deg: number;
  id: number;
  addCurrentCityWeather: (id: number) => void;
  deleteCityIdFromList: (id: number) => void;
};

const CityListItem: React.FC<PropsType> = ({
  name,
  country,
  deg,
  id,
  addCurrentCityWeather,
  deleteCityIdFromList,
}) => {
  const onItemClickHandler = (e: { currentTarget: { id: string } }) => {
    addCurrentCityWeather(+e.currentTarget.id);
  };

  const onDeleteClickHandler = (e: { currentTarget: { id: string } }) => {
    deleteCityIdFromList(+e.currentTarget.id);
  };

  return (
    <div id={id.toString()} onClick={onItemClickHandler} className={`${styles.CityListItem}`}>
      <img id={id.toString()} onClick={onDeleteClickHandler} src={deleteIcon} alt="delete" />
      <p className={`${styles.CityListItemName}`}>
        {name}, {country}
      </p>
      <p className={`${styles.CityListItemTemp}`}>{deg.toFixed()} &deg;C</p>
    </div>
  );
};

export default CityListItem;
