import { weatherAPI } from '../../api/api';
import { CityType } from '../reducers/cityReducer';
import { Dispatch } from 'redux';

type LoadActionType = {
  type: 'LOAD';
};

type AddFoundCityActionType = {
  type: 'CITY_FOUND';
  city: CityType;
};

type AddFoundCityErrorActionType = {
  type: 'CITY_FOUND_ERROR';
  err: string;
};

type AddCitiesToListActionType = {
  type: 'ADD_CITIES_TO_CITY_WEATHER_LIST';
  cities: Array<CityType>;
};

type AddCitiesToListErrorActionType = {
  type: 'ADD_CITIES_TO_CITY_WEATHER_LIST_ERROR';
  err: string;
};

type AddCurrentCityWeatherActionType = {
  type: 'ADD_CURRENT_CITY_WEATHER';
  cityId: number;
};

type AddCityIdToListActionType = {
  type: 'ADD_CITY_ID_TO_LIST';
};

type DeleteCityIdFromListActionType = {
  type: 'DELETE_CITY_ID_FROM_LIST';
  id: number;
};

export type ActionsTypes =
  | LoadActionType
  | AddFoundCityActionType
  | AddFoundCityErrorActionType
  | AddCitiesToListActionType
  | AddCitiesToListErrorActionType
  | AddCurrentCityWeatherActionType
  | AddCityIdToListActionType
  | DeleteCityIdFromListActionType;

const load = (): LoadActionType => ({ type: 'LOAD' });

export const addFoundCity = (city: CityType): AddFoundCityActionType => ({
  type: 'CITY_FOUND',
  city,
});

const addFoundCityError = (err: string): AddFoundCityErrorActionType => ({
  type: 'CITY_FOUND_ERROR',
  err,
});

export const addCitiesToList = (cities: Array<CityType>): AddCitiesToListActionType => ({
  type: 'ADD_CITIES_TO_CITY_WEATHER_LIST',
  cities,
});

export const addCitiesToListError = (err: string): AddCitiesToListErrorActionType => ({
  type: 'ADD_CITIES_TO_CITY_WEATHER_LIST_ERROR',
  err,
});

export const addCurrentCityWeather = (cityId: number): AddCurrentCityWeatherActionType => ({
  type: 'ADD_CURRENT_CITY_WEATHER',
  cityId,
});

export const addCityIdToList = (): AddCityIdToListActionType => ({ type: 'ADD_CITY_ID_TO_LIST' });

export const deleteCityIdFromList = (id: number): DeleteCityIdFromListActionType => ({
  type: 'DELETE_CITY_ID_FROM_LIST',
  id: id,
});

export const getCityWeather = (city: string): any => {
  return (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(load());
    weatherAPI
      .getWeather(city)
      .then(data => dispatch(addFoundCity(data)))
      .catch(err => dispatch(addFoundCityError(err)));
  };
};

export const getCitiesWeatherByIDs = (IDs: Array<string>): any => {
  return (dispatch: Dispatch<ActionsTypes>) => {
    weatherAPI
      .getWeatherByIDs(IDs)
      .then(data => dispatch(addCitiesToList(data.list)))
      .catch(err => dispatch(addCitiesToListError(err)));
  };
};
