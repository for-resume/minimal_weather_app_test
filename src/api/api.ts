import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

export const weatherAPI = {
  getWeather(city: string) {
    return instance
      .get(`weather?q=${city}&units=metric&appid=330216f9e3042b8a57a7865c3de67865`)
      .then(response => response.data);
  },
  getWeatherByIDs(IDs: Array<string>) {
    let stringOfIDs = '';
    for (let id of IDs) {
      stringOfIDs += `${id},`;
    }
    const newStringOfIDs = stringOfIDs.slice(0, -1);
    return instance
      .get(`group?id=${newStringOfIDs}&units=metric&appid=330216f9e3042b8a57a7865c3de67865`)
      .then(response => response.data);
  },
};
