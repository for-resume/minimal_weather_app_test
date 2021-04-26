import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './CityList.module.css';

import CityListItem from './CityListItem/CityListItem';
import {
  ActionsTypes,
  addCitiesToList,
  addCurrentCityWeather,
  deleteCityIdFromList,
  getCitiesWeatherByIDs,
} from '../../store/actions/cityActions';
import Loader from '../Loader/Loader';

import { CityType } from '../../store/reducers/cityReducer';
import { AppStateType } from '../../store/reducers/rootReducer';
import { Dispatch } from 'redux';

type MapStatePropsType = {
  cityWeatherList: Array<CityType>;
  cityIDsStr: string;
  isListLoading: boolean;
  loadingListError: string;
};

type MapDispatchPropsType = {
  getCitiesWeatherByIDs: (cityIDs: Array<string>) => void;
  addCurrentCityWeather: (cityId: number) => void;
  deleteCityIdFromList: (cityId: number) => void;
  addCitiesToList: (cities: Array<CityType>) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const CityList: React.FC<PropsType> = ({
  cityWeatherList,
  getCitiesWeatherByIDs,
  addCurrentCityWeather,
  cityIDsStr,
  isListLoading,
  deleteCityIdFromList,
  addCitiesToList,
  loadingListError,
}) => {
  useEffect(() => {
    if (cityIDsStr) {
      const cityIDsList = cityIDsStr.split(',');
      getCitiesWeatherByIDs(cityIDsList);
    } else {
      addCitiesToList([]);
    }
  }, [cityIDsStr, getCitiesWeatherByIDs, addCitiesToList]);

  const content = loadingListError ? (
    <p className={styles.WeatherError}>Something went wrong</p>
  ) : (
    <div className={`${styles.CityListBox}`}>
      {cityWeatherList.map(city => (
        <CityListItem
          key={city.id}
          name={city.name!}
          country={city.sys!.country!}
          deg={city.main!.temp!}
          id={city.id!}
          addCurrentCityWeather={addCurrentCityWeather}
          deleteCityIdFromList={deleteCityIdFromList}
        />
      ))}
    </div>
  );

  return (
    <div className={`${styles.CityList}`}>
      <h2 className={`${styles.CityListTitle}`}>City List</h2>
      {isListLoading ? (
        <div className={styles.LoaderList}>
          <Loader />
        </div>
      ) : (
        content
      )}
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  cityWeatherList: state.city.cityWeatherList,
  cityIDsStr: state.city.cityIDsStr,
  isListLoading: state.city.isListLoading,
  loadingListError: state.city.loadingListError,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>) => ({
  getCitiesWeatherByIDs: (cityIDs: Array<string>) => dispatch(getCitiesWeatherByIDs(cityIDs)),
  addCurrentCityWeather: (cityId: number) => dispatch(addCurrentCityWeather(cityId)),
  deleteCityIdFromList: (cityId: number) => dispatch(deleteCityIdFromList(cityId)),
  addCitiesToList: (cities: Array<CityType>) => dispatch(addCitiesToList(cities)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
