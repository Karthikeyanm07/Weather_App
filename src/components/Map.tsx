import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in production
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
import type { Coords } from "../types";
import { useEffect } from "react";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

type Props = {
	coords: Coords;
	onMapClick: (lat: number, lon: number) => void;
	mapType: string;
};

const Map = ({ coords, onMapClick, mapType }: Props) => {
	const { lat, lon } = coords;

	//console.log(coords)
	return (
		<MapContainer
			center={[lat, lon]}
			zoom={5}
			style={{ width: "100%", height: "100%" }}
		>
			<MapClick onMapClick={onMapClick} coords={coords} />
			<MapTileLayer />
			<TileLayer
				opacity={0.7}
				url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
			/>
			<Marker position={[lat, lon]} />
		</MapContainer>
	);
};

export default Map;

function MapClick({
	onMapClick,
	coords,
}: {
	onMapClick: (lat: number, lon: number) => void;
	coords: Coords;
}) {
	const map = useMap();
	map.panTo([coords.lat, coords.lon]);

	map.on("click", (e) => {
		const { lat, lng } = e.latlng;
		onMapClick(lat, lng);
	});

	return null;
}

function MapTileLayer() {
	const map = useMap();

	useEffect(() => {
		const tileLayer = new MaptilerLayer({
			style: "basic-dark",
			apiKey: MAPTILER_API_KEY,
		});
		tileLayer.addTo(map);

		return () => {
			map.removeLayer(tileLayer);
		};
	}, [map]);

	return null;
}
