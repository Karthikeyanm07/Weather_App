import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";
type Props = {
	location: string;
	setLocation: Dispatch<SetStateAction<string>>;
};

function LocationDropdown({ location, setLocation }: Props) {
	return (
		<Select value={location} onValueChange={(value) => setLocation(value)}>
			<SelectTrigger className="w-full max-w-48">
				<SelectValue placeholder="Search a city" />
			</SelectTrigger>
			<SelectContent className="z-1001">
				{location === "custom" && (
					<SelectItem value="custom">Custom</SelectItem>
				)}
				{locations.map((city) => (
					<SelectItem key={city} value={city}>
						{city}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export default LocationDropdown;

const locations = [
	"Bangkok",
	"Tokyo",
	"Seoul",
	"Dubai",
	"Manila",
	"New York",
	"Paris",
	"London",
	"Rome",
];
