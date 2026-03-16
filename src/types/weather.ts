export interface CurrentWeather {
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  uv_index: number;
  unit: {
    temperature: string;
    feels_like: string;
    humidity: string;
    wind_speed: string;
  };
}

export interface DailyForecast {
  date: string;
  temperature_max: number;
  temperature_min: number;
}

export interface WeatherResponse {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeather;
  forecast_7_days: DailyForecast[];
}

export interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
}

export interface OpenMeteoCurrentResponse {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  uv_index: number;
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: OpenMeteoCurrentResponse;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}
