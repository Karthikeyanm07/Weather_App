import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import { getWeatherIconUrl, getWeatherInfo } from "../../utils/weatherCode";
import type { Coords } from "../../types";

type Props = {
    coords: Coords
};

const CurrentWeather = ({coords}: Props) => {
	const { data } = useSuspenseQuery({
		queryKey: ["weather", coords],
		queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon}),
	});

	const { description, icon } = getWeatherInfo(
		data.current.weatherCode,
		true,
	);
	return (
		<Card
			childrenClassName="flex flex-col items-center gap-6"
			title="Current Forecast"
		>
			<div className="flex flex-col gap-2 items-center">
				<h2 className="text-6xl font-semibold text-center">
					{data.current.temp}°F
				</h2>
				<img src={getWeatherIconUrl(icon)} alt={description} />
				<h3 className="text-2xl mb-2">{description}</h3>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-xl text-center">Local Time:</p>
				<h3 className="text-4xl font-semibold">
					{new Intl.DateTimeFormat("en-IN", {
						hour: "2-digit",
						minute: "2-digit",
						hour12: true,
						timeZone: data.timezone,
					}).format(new Date(data.current.time))}
				</h3>
			</div>
			<div className="flex justify-between w-full">
				<div className="flex flex-col items-center gap-2">
					<p className="text-gray-500">Feels like</p>
					<p>{Math.round(data.current.feelsLike)}°F</p>
				</div>
				<div className="flex flex-col items-center gap-2">
					<p className="text-gray-500">Humidity</p>
					<p>{Math.round(data.current.humidity)}°F</p>
				</div>
				<div className="flex flex-col items-center gap-2">
					<p className="text-gray-500">Wind</p>
					<p>{Math.round(data.current.windSpeed)}km/hr</p>
				</div>
			</div>
		</Card>
	);
};

export default CurrentWeather;
