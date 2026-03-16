import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import { getWeatherIconUrl, getWeatherInfo } from "../../utils/weatherCode";
import type { Coords } from "../../types";

type Props = {
	coords: Coords;
};

const HourlyForecast = ({ coords }: Props) => {
	const { data } = useSuspenseQuery({
		queryKey: ["weather", coords],
		queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
	return (
		<Card
			childrenClassName="flex gap-6 overflow-x-scroll"
			title="Hourly Forecast (48 Hours)"
		>
			{data?.hourly.map((hour) => {
				const { description, icon } = getWeatherInfo(
					hour.weatherCode,
					true,
				);

				// Get what date it is.
				const time = new Date(hour.time).toLocaleTimeString("en-IN", {
					hour: "numeric",
					minute: "2-digit",
					hour12: true,
				});

				return (
					<div
						key={hour.time}
						className="flex flex-col 2xl:justify-between items-center p-2"
					>
						<p className="whitespace-nowrap 2xl:scale-110">
							{time}
						</p>
						<img
							src={getWeatherIconUrl(icon)}
							alt={description}
							className="w-10 h-10 2xl:size-10"
						/>
						<p className="2xl:scale-110">
							{Math.round(hour.temp)}°F
						</p>
					</div>
				);
			})}
		</Card>
	);
};

export default HourlyForecast;
