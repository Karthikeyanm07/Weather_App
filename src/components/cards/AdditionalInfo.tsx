import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Humidity from "../../assets/humidity.svg?react";
import Cloud from "../../assets/cloud.svg?react";
import Pressure from "../../assets/pressure.svg?react";
import UV from "../../assets/uv.svg?react";
import Wind from "../../assets/wind.svg?react";
import type { Coords } from "../../types";

type Props = {
    coords: Coords;
};

const AdditionalInfo = ({coords}: Props) => {
	const { data } = useSuspenseQuery({
		queryKey: ["weather", coords],
		queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
	});
	return (
		<Card
			title="Additional Weather Info"
			childrenClassName="flex flex-col gap-6"
		>
			{rows.map(({ label, value, Icon }) => (
				<div key={value} className="flex justify-between">
					<div className="flex gap-10">
						<span>{label}</span>
						<Icon className="w-6 h-6 invert" />
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
		Icon: Humidity,
	},
	{
		label: "Cloudiness (%)",
		value: "cloudCover",
		Icon: Cloud,
	},
	{
		label: "UV Index",
		value: "uvi",
		Icon: UV,
	},
	{
		label: "Wind Direction ( ° )",
		value: "windDeg",
		Icon: Wind,
	},
	{
		label: "Pressure (hPa)",
		value: "pressure",
		Icon: Pressure,
	},
] as const;

export default AdditionalInfo;
