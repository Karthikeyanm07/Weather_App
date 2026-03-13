import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getGeoCode } from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropDowns";

function App() {
	const [coordinates, setCoords] = useState<Coords>({ lat: 80, lon: 50 });
	const [location, setLocation] = useState("Tokyo");
	const [mapType, setMapType] = useState("clouds_new");

	const { data: geoCodeData } = useQuery({
		queryKey: ["geocode", location],
		queryFn: () => getGeoCode(location),
	});

	//console.log(geoCodeData);

	const onMapClick = (lat: number, lon: number) => {
		setCoords({ lat, lon });
		setLocation("custom");
	};
	const coords =
		location === "custom"
			? coordinates
			: {
					lat: geoCodeData?.[0].lat ?? 0,
					lon: geoCodeData?.[0].lon ?? 0,
				};

	return (
		<div className="flex flex-col gap-8">
			<div className="flex gap-8">
				<div className="flex gap-4">
					<h1 className="text-2xl font-semibold">Location: </h1>
					<LocationDropdown
						location={location}
						setLocation={setLocation}
					/>
				</div>
				<div className="flex gap-4">
					<h1 className="text-2xl font-semibold">Map Type: </h1>
					<MapTypeDropdown
						mapType={mapType}
						setMapType={setMapType}
					/>
				</div>
			</div>
			<Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
			<CurrentWeather coords={coords} />
			<HourlyForecast coords={coords} />
			<DailyForecast coords={coords} />
			<AdditionalInfo coords={coords} />
		</div>
	);
}

export default App;
