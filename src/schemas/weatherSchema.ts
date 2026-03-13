import { z } from "zod";

export const weatherSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  utc_offset_seconds: z.number(),

  current: z.object({
    time: z.string(),
    interval: z.number(),
    temperature_2m: z.number(),
    apparent_temperature: z.number(),
    relative_humidity_2m: z.number(),
    dew_point_2m: z.number(),
    uv_index: z.number(),
    precipitation: z.number(),
    weather_code: z.number(),
    cloud_cover: z.number(),
    pressure_msl: z.number(),
    visibility: z.number(),
    wind_speed_10m: z.number(),
    wind_direction_10m: z.number(),
    wind_gusts_10m: z.number(),
    is_day: z.number(),
  }),

  hourly: z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    relative_humidity_2m: z.array(z.number()),
    dew_point_2m: z.array(z.number()),
    apparent_temperature: z.array(z.number()),
    precipitation_probability: z.array(z.number()),
    visibility: z.array(z.number()),
    weather_code: z.array(z.number()),
    pressure_msl: z.array(z.number()),
    cloud_cover: z.array(z.number()),
    wind_speed_10m: z.array(z.number()),
    wind_direction_10m: z.array(z.number()),
    wind_gusts_10m: z.array(z.number()),
    uv_index: z.array(z.number()),
  }),

  daily: z.object({
    time: z.array(z.string()),
    weather_code: z.array(z.number()),
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    sunrise: z.array(z.string()),
    sunset: z.array(z.string()),
    uv_index_max: z.array(z.number()),
    precipitation_probability_max: z.array(z.number()),
    rain_sum: z.array(z.number()),
    wind_speed_10m_max: z.array(z.number()),
    wind_gusts_10m_max: z.array(z.number()),
    wind_direction_10m_dominant: z.array(z.number()),
  }),
});

export type WeatherApiResponse = z.infer<typeof weatherSchema>;