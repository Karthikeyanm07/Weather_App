import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import { getWeatherIconUrl, getWeatherInfo } from "../../utils/weatherCode";
import type { Coords } from "../../types";

type Props = {
	coords: Coords;
};

function DailyForecast({coords}: Props) {
	const { data } = useSuspenseQuery({
		queryKey: ["weather", coords],
		queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
	});
	return (
		<Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
			{data?.daily.map((day) => {
				const { description, icon } = getWeatherInfo(
					day.weatherCode,
					true,
				);

				// What day is.
				const weekday = new Date(
					day.time + "T00:00",
				).toLocaleDateString("en-IN", {
					weekday: "short",
				});

				// Round temp
				const avgTemp = Math.round((day.tempMax + day.tempMin) / 2);
				const maxTemp = Math.round(day.tempMax);
				const minTemp = Math.round(day.tempMin);
				return (
					<div key={day.time} className="flex justify-between">
						<p className="w-9">{weekday}</p>
						<img
							src={getWeatherIconUrl(icon)}
							alt={description}
							className="w-10 h-10"
						/>
						<p>{avgTemp}°F</p>
						<p className="text-gray-500">{maxTemp}°F</p>
						<p className="text-gray-500">{minTemp}°F</p>
					</div>
				);
			})}
		</Card>
	);
}

export default DailyForecast;
