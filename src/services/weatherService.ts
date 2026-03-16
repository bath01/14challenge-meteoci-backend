import axios from 'axios';
import { config } from '../config';
import { geocodeCity } from './geocodingService';
import {
  WeatherResponse,
  OpenMeteoResponse,
  DailyForecast,
} from '../types/weather';

export async function getWeatherByCity(city: string): Promise<WeatherResponse> {
  const geo = await geocodeCity(city);
  const lat = parseFloat(geo.lat);
  const lon = parseFloat(geo.lon);

  const response = await axios.get<OpenMeteoResponse>(
    `${config.openMeteoBaseUrl}/forecast`,
    {
      params: {
        latitude: lat,
        longitude: lon,
        current: [
          'temperature_2m',
          'apparent_temperature',
          'relative_humidity_2m',
          'wind_speed_10m',
          'uv_index',
        ].join(','),
        daily: ['temperature_2m_max', 'temperature_2m_min'].join(','),
        timezone: config.defaultTimezone,
        forecast_days: 7,
        wind_speed_unit: 'kmh',
      },
    }
  );

  const { current, daily } = response.data;

  const forecast7Days: DailyForecast[] = daily.time.map((date, i) => ({
    date,
    temperature_max: daily.temperature_2m_max[i],
    temperature_min: daily.temperature_2m_min[i],
  }));

  return {
    city: city.trim(),
    country: "Côte d'Ivoire",
    latitude: lat,
    longitude: lon,
    timezone: response.data.timezone,
    current: {
      temperature: current.temperature_2m,
      feels_like: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      wind_speed: current.wind_speed_10m,
      uv_index: current.uv_index,
      unit: {
        temperature: '°C',
        feels_like: '°C',
        humidity: '%',
        wind_speed: 'km/h',
      },
    },
    forecast_7_days: forecast7Days,
  };
}
