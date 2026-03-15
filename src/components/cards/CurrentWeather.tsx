import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import { getWeatherIconUrl, getWeatherInfo } from "../../utils/weatherCode";
import type { Coords } from "../../types";
import { MapPin, Sunrise, Sunset } from "lucide-react";


type Props = {
    coords: Coords;
    location: string;
};

const CurrentWeather = ({coords, location}: Props) => {
	const { data } = useSuspenseQuery({
		queryKey: ["weather", coords],
		queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon}),
	});

	const { description, icon } = getWeatherInfo(
		data.current.weatherCode,
		true,
	);

	const sunrise = new Intl.DateTimeFormat("en-IN", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
		timeZone: data.timezone,
	}).format(new Date(data.daily[0].sunrise));

	const sunset = new Intl.DateTimeFormat("en-IN", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
		timeZone: data.timezone,
	}).format(new Date(data.daily[0].sunset));

	const localTime = new Intl.DateTimeFormat("en-IN", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
		timeZone: data.timezone,
	}).format(new Date(data.current.time));

	return (
		<Card
			childrenClassName="flex flex-col items-center gap-4 2xl:justify-between"
			title="Current Forecast"
		>
			{/* Location */}
			<div className="flex items-center gap-1.5 text-gray-400">
				<MapPin className="size-4" />
				<span className="text-sm capitalize">{location === "custom" ? `${coords.lat.toFixed(2)}°, ${coords.lon.toFixed(2)}°` : location}</span>
			</div>

			{/* Temperature + Icon + Description */}
			<div className="flex flex-col items-center gap-1">
				<h2 className="text-5xl font-semibold text-center">
					{data.current.temp}°F
				</h2>
				<img src={getWeatherIconUrl(icon)} alt={description} className="w-20 h-20" />
				<h3 className="text-xl">{description}</h3>
			</div>

			{/* Local Time */}
			<p className="text-sm text-gray-400">Local Time: <span className="font-semibold text-foreground">{localTime}</span></p>

			{/* Sunrise / Sunset */}
			<div className="flex justify-between w-full">
				<div className="flex items-center gap-1.5">
					<Sunrise className="size-4 text-yellow-400" />
					<span className="text-sm">{sunrise}</span>
				</div>
				<div className="flex items-center gap-1.5">
					<Sunset className="size-4 text-orange-400" />
					<span className="text-sm">{sunset}</span>
				</div>
			</div>

			{/* Stats Row */}
			<div className="flex justify-between w-full">
				<div className="flex flex-col items-center gap-1">
					<p className="text-xs text-gray-500">Feels like</p>
					<p className="text-sm font-medium">{Math.round(data.current.feelsLike)}°F</p>
				</div>
				<div className="flex flex-col items-center gap-1">
					<p className="text-xs text-gray-500">Humidity</p>
					<p className="text-sm font-medium">{Math.round(data.current.humidity)}%</p>
				</div>
				<div className="flex flex-col items-center gap-1">
					<p className="text-xs text-gray-500">Wind</p>
					<p className="text-sm font-medium">{Math.round(data.current.windSpeed)}mph</p>
				</div>
			</div>
		</Card>
	);
};

export default CurrentWeather;

