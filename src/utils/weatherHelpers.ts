import type { WeatherApiResponse } from "../schemas/weatherSchema";

export interface CurrentWeather {
  time: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  dewPoint: number;
  uvi: number;
  precipitation: number;
  weatherCode: number;
  cloudCover: number;
  pressure: number;
  visibility: number;
  windSpeed: number;
  windDeg: number;
  windGust: number;
  isDay: boolean;
}

export interface HourlyWeather {
  time: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  dewPoint: number;
  uvi: number;
  precipitationProbability: number;
  weatherCode: number;
  cloudCover: number;
  pressure: number;
  visibility: number;
  windSpeed: number;
  windDeg: number;
  windGust: number;
}

export interface DailyWeather {
  time: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipitationProbabilityMax: number;
  rainSum: number;
  windSpeedMax: number;
  windGustMax: number;
  windDeg: number;
}

export interface FormattedWeather {
  lat: number;
  lon: number;
  timezone: string;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

export function formatWeatherData(data: WeatherApiResponse): FormattedWeather {
  const { current, hourly, daily } = data;

  return {
    lat: data.latitude,
    lon: data.longitude,
    timezone: data.timezone,

    current: {
      time:          current.time,
      temp:          current.temperature_2m,
      feelsLike:     current.apparent_temperature,
      humidity:      current.relative_humidity_2m,
      dewPoint:      current.dew_point_2m,
      uvi:           current.uv_index,
      precipitation: current.precipitation,
      weatherCode:   current.weather_code,
      cloudCover:    current.cloud_cover,
      pressure:      current.pressure_msl,
      visibility:    current.visibility,
      windSpeed:     current.wind_speed_10m,
      windDeg:       current.wind_direction_10m,
      windGust:      current.wind_gusts_10m,
      isDay:         current.is_day === 1,
    },

    hourly: hourly.time.map((time, i) => ({
      time,
      temp:                     hourly.temperature_2m[i],
      feelsLike:                hourly.apparent_temperature[i],
      humidity:                 hourly.relative_humidity_2m[i],
      dewPoint:                 hourly.dew_point_2m[i],
      uvi:                      hourly.uv_index[i],
      precipitationProbability: hourly.precipitation_probability[i],
      weatherCode:              hourly.weather_code[i],
      cloudCover:               hourly.cloud_cover[i],
      pressure:                 hourly.pressure_msl[i],
      visibility:               hourly.visibility[i],
      windSpeed:                hourly.wind_speed_10m[i],
      windDeg:                  hourly.wind_direction_10m[i],
      windGust:                 hourly.wind_gusts_10m[i],
    })),

    daily: daily.time.map((time, i) => ({
      time,
      weatherCode:                 daily.weather_code[i],
      tempMax:                     daily.temperature_2m_max[i],
      tempMin:                     daily.temperature_2m_min[i],
      sunrise:                     daily.sunrise[i],
      sunset:                      daily.sunset[i],
      uvIndexMax:                  daily.uv_index_max[i],
      precipitationProbabilityMax: daily.precipitation_probability_max[i],
      rainSum:                     daily.rain_sum[i],
      windSpeedMax:                daily.wind_speed_10m_max[i],
      windGustMax:                 daily.wind_gusts_10m_max[i],
      windDeg:                     daily.wind_direction_10m_dominant[i],
    })),
  };
}