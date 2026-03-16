import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import type { Coords } from "../../types";
import { Cloudy, Droplets, Gauge, Radiation, Wind } from "lucide-react";

type Props = {
	coords: Coords;
};

const AdditionalInfo = ({ coords }: Props) => {
	const { data } = useSuspenseQuery({
		queryKey: ["weather", coords],
		queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
	return (
		<Card
			title="Additional Weather Info"
			childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8"
		>
			{rows.map(({ label, value, Icon }) => (
				<div key={value} className="flex justify-between">
					<div className="flex gap-4">
						<span>{label}</span>
						<Icon className="w-6 h-6" />
					</div>
					<span>{data.current[value]}</span>
				</div>
			))}
		</Card>
	);
};

const rows = [
	{
		label: "Dew (°F)",
		value: "dewPoint",
		Icon: Droplets,
	},
	{
		label: "Cloudiness (%)",
		value: "cloudCover",
		Icon: Cloudy,
	},
	{
		label: "UV Index",
		value: "uvi",
		Icon: Radiation,
	},
	{
		label: "Wind Direction ( ° )",
		value: "windDeg",
		Icon: Wind,
	},
	{
		label: "Pressure (hPa)",
		value: "pressure",
		Icon: Gauge,
	},
] as const;

export default AdditionalInfo;
