import { AirPollutionSchema } from "./schemas/airPollutionSchema";
import { geoCodeSchema } from "./schemas/geoCodeSchema";
import { weatherSchema } from "./schemas/weatherSchema";
import { formatWeatherData } from "./utils/weatherHelpers";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
	const params = new URLSearchParams({
		latitude: lat.toString(),
		longitude: lon.toString(),
		current: [
			"temperature_2m",
			"apparent_temperature",
			"relative_humidity_2m",
			"dew_point_2m",
			"uv_index",
			"precipitation",
			"weather_code",
			"cloud_cover",
			"pressure_msl",
			"visibility",
			"wind_speed_10m",
			"wind_direction_10m",
			"wind_gusts_10m",
			"is_day",
		].join(","),
		hourly: [
			"temperature_2m",
			"relative_humidity_2m",
			"dew_point_2m",
			"apparent_temperature",
			"precipitation_probability",
			"visibility",
			"weather_code",
			"pressure_msl",
			"cloud_cover",
			"wind_speed_10m",
			"wind_direction_10m",
			"wind_gusts_10m",
			"uv_index",
		].join(","),
		daily: [
			"weather_code",
			"temperature_2m_max",
			"temperature_2m_min",
			"sunrise",
			"sunset",
			"uv_index_max",
			"precipitation_probability_max",
			"rain_sum",
			"wind_speed_10m_max",
			"wind_gusts_10m_max",
			"wind_direction_10m_dominant",
		].join(","),
		temperature_unit: "fahrenheit",
		wind_speed_unit: "mph",
		timezone: "auto",
	});

	const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

	if (!res.ok) {
		throw new Error(`Failed to fetch weather: ${res.statusText}`);
	}

	const data = await res.json();
	//console.log(data);
	const validated = weatherSchema.parse(data); // ← Zod validates raw API shape
	return formatWeatherData(validated); // ← transforms to clean FormattedWeather
}

export async function getGeoCode(location: string) {
	const response = await fetch(
		`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`,
	);

	const data = await response.json();
	//console.log(data);
	return geoCodeSchema.parse(data);
}

// Air pollution
export async function getAirPollution({
	lat,
	lon,
}: {
	lat: number;
	lon: number;
}) {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
	);

	const data = await response.json();
	return AirPollutionSchema.parse(data);
}

/* 
export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
	const res = await fetch(`https://api.open-meteo.com/v1/forecast
  ?latitude=${lat}
  &longitude=${lon}
  &current=temperature_2m,apparent_temperature,relative_humidity_2m,dew_point_2m,uv_index,precipitation,weather_code,cloud_cover,pressure_msl,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day
  &hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,visibility,weather_code,pressure_msl,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index
  &daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,rain_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant
  &temperature_unit=fahrenheit
  &wind_speed_unit=mph
  &timezone=auto`);

	// const response = await fetch(
	// 	`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`,
	// );

	const data = await res.json();
	console.log(data);
	return data;
}  
*/
