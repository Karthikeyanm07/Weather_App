import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";
type Props = {
	mapType: string;
	setMapType: Dispatch<SetStateAction<string>>;
};

function MapTypeDropdown({ mapType, setMapType }: Props) {
	return (
		<Select value={mapType} onValueChange={(value) => setMapType(value)}>
			<SelectTrigger className="w-full xs:w-[180px]">
				<SelectValue placeholder="Search a city" />
			</SelectTrigger>
			<SelectContent className="z-1001">
				{mapTypes.map((type) => (
					<SelectItem key={type} value={type} className="capitalize">
						{type.split("_")[0]}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export default MapTypeDropdown;

const mapTypes = [
	"clouds_new",
	"precipitation_new",
	"pressure_new",
	"wind_new",
	"temp_new",
];
