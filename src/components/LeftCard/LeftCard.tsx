import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import locationIcon from './img/locationIcon.svg';
import up from './img/arrowUp.svg';
import down from './img/arrowDown.svg';
import dayImage from './img/day.png';
import nightImage from './img/night.png';
import c from './img/c.svg';
import humidity from './img/humidity.svg';
import pressure from './img/pressure.svg';
import wind from './img/wind.svg';
import sunrise from './img/sunrise.svg';
import sunset from './img/sunset.svg';
import clock from './img/clock.svg';
import styles from './LeftCard.module.css';

import { AppStateType } from '../../store/reducers/rootReducer';
import { CityType } from '../../store/reducers/cityReducer';

type MapStatePropsType = {
  currentCityWeather: CityType;
};

type PropsType = MapStatePropsType;

const LeftCard: React.FC<PropsType> = ({ currentCityWeather }) => {
  let isDay;
  let date;
  let sunriseTime;
  let sunsetTime;
  let dayTime;

  if (Object.keys(currentCityWeather).length !== 0) {
    const localTimeZone = -new Date().getTimezoneOffset() / 60;
    const time = moment.unix(
      currentCityWeather.dt! + currentCityWeather.sys!.timezone! - localTimeZone * 3600
    );
    const hours = time.hours();
    const sunrise = moment.unix(
      currentCityWeather.sys!.sunrise! + currentCityWeather.sys!.timezone! - localTimeZone * 3600
    );
    const sunset = moment.unix(
      currentCityWeather.sys!.sunset! + currentCityWeather.sys!.timezone! - localTimeZone * 3600
    );
    isDay = hours >= 5 && hours <= 18;
    date = time.format('llll');
    sunriseTime = sunrise.format('LT');
    sunsetTime = sunset.format('LT');
    dayTime = sunset.diff(sunrise, 'hours');
  }

  return (
    <div className={`${styles.LeftCard}`}>
      {Object.keys(currentCityWeather).length === 0 ? (
        <div className={`${styles.LeftCardText}`}>
          <p>Select a city from your list to see weather</p>
        </div>
      ) : (
        <div className={styles.Weather}>
          <div className={styles.WeatherImg}>
            <img src={isDay ? dayImage : nightImage} alt="weather" />
          </div>
          <div className={styles.WeatherInfo}>
            <div className={styles.FirstRow}>
              <p className={styles.FirstRowDate}>{date}</p>
              <p className={styles.FirstRowLocation}>
                {currentCityWeather.name}, {currentCityWeather.sys!.country}
                <img src={locationIcon} alt="locationIcon" />
              </p>
            </div>
            <div className={styles.SecondRow}>
              <div className={styles.SecondRowBox}>
                <img
                  className={styles.WeatherIcon}
                  src={`https://openweathermap.org/img/wn/${
                    currentCityWeather.weather![0].icon
                  }@2x.png`}
                  alt="weatherIcon"
                />
                <p className={styles.SecondRowWeatherName}>{currentCityWeather.weather![0].main}</p>
              </div>
              <div className={`${styles.SecondRowBoxC} ${styles.SecondRowBox}`}>
                <p className={styles.WeatherCurrentTemp}>
                  {currentCityWeather.main!.temp!.toFixed()}
                </p>
                <img className={styles.WeatherC} src={c} alt="c" />
              </div>
              <div className={`${styles.SecondRowBoxTemp} ${styles.SecondRowBox}`}>
                <div className={`${styles.SecondRowBoxTempItem}`}>
                  <p className={styles.WeatherMaxTemp}>
                    {currentCityWeather.main!.temp_max!.toFixed()} &deg;C
                  </p>
                  <img className={`${styles.WeatherTempIcon}`} src={up} alt="up" />
                </div>
                <div className={`${styles.SecondRowBoxTempItem}`}>
                  <p className={styles.WeatherMinTemp}>
                    {currentCityWeather.main!.temp_min!.toFixed()} &deg;C
                  </p>
                  <img className={`${styles.WeatherTempIcon}`} src={down} alt="down" />
                </div>
              </div>
            </div>
            <div className={styles.ThirdRow}>
              <div className={styles.ThirdRowBox}>
                <img className={styles.ThirdRowIcon} src={humidity} alt="humidity" />
                <p className={styles.WeatherInfoMain}>{currentCityWeather.main!.humidity}%</p>
                <p className={styles.WeatherInfoLabel}>Humidity</p>
              </div>
              <div className={styles.ThirdRowBox}>
                <img className={styles.ThirdRowIcon} src={pressure} alt="pressure" />
                <p className={styles.WeatherInfoMain}>{currentCityWeather.main!.pressure}mBar</p>
                <p className={styles.WeatherInfoLabel}>Pressure</p>
              </div>
              <div className={styles.ThirdRowBox}>
                <img className={styles.ThirdRowIcon} src={wind} alt="wind" />
                <p className={styles.WeatherInfoMain}>
                  {(currentCityWeather.wind!.speed! * 3.6).toFixed()} km/h
                </p>
                <p className={styles.WeatherInfoLabel}>Wind</p>
              </div>
            </div>
            <div className={styles.ThirdRow}>
              <div className={styles.ThirdRowBox}>
                <img className={styles.ThirdRowIcon} src={sunrise} alt="sunrise" />
                <p className={styles.WeatherInfoMain}>{sunriseTime}</p>
                <p className={styles.WeatherInfoLabel}>Sunrise</p>
              </div>
              <div className={styles.ThirdRowBox}>
                <img className={styles.ThirdRowIcon} src={sunset} alt="sunset" />
                <p className={styles.WeatherInfoMain}>{sunsetTime}</p>
                <p className={styles.WeatherInfoLabel}>Sunset</p>
              </div>
              <div className={styles.ThirdRowBox}>
                <img className={styles.ThirdRowIcon} src={clock} alt="daytime" />
                <p className={styles.WeatherInfoMain}>{dayTime}h</p>
                <p className={styles.WeatherInfoLabel}>Daytime</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  currentCityWeather: state.city.currentCityWeather,
});

export default connect(mapStateToProps)(LeftCard);
