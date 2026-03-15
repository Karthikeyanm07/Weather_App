import { getAirPollution } from "@/api";
import type { Coords } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, type Dispatch, type SetStateAction } from "react";
import Card from "./cards/Card";
import { Slider } from "@/components/ui/slider";
import clsx from "clsx";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";
import { ChevronLeft, Info } from "lucide-react";
import SidePanelSkeleton from "./skeletons/SidePanelSkeleton";
type Props = {
	coords: Coords;
	isSidePanelOpen: boolean;
	setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};
const SidePanel = (props: Props) => {
	const { isSidePanelOpen, setIsSidePanelOpen } = props;
	return (
		<div
			className={`
				fixed top-0 right-0 h-screen shadow-md w-(--sidebar-width) z-1001 
				bg-sidebar py-8 px-4 overflow-y-scroll transition-transform duration-300 lg:translate-x-0!
				${isSidePanelOpen ? "translate-x-0" : "translate-x-full"}
			`}
		>
			<button onClick={() => setIsSidePanelOpen(false)}>
				<ChevronLeft className="size-8 -ml-2 lg:hidden" />
			</button>
			<Suspense fallback={<SidePanelSkeleton />}>
				<AirPollution {...props} />
			</Suspense>
		</div>
	);
};

export default SidePanel;

function AirPollution({ coords }: Props) {
	const { data } = useSuspenseQuery({
		queryKey: ["pollution", coords],
		queryFn: () => getAirPollution(coords),
	});
	//console.log(data);
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-semibold">Air Pollution</h1>
			<h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
			<div className="flex items-center gap-2">
				<h1 className="text-2xl font-semibold">AQI</h1>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Info className="size-4" />
						</TooltipTrigger>
						<TooltipContent className="z-2000">
							<p className="max-w-xs">Air Quality Index</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			{Object.entries(data.list[0].components).map(
				([airName, airValue]) => {
					const pollutant =
						airQualityRanges[
							airName.toUpperCase() as keyof typeof airQualityRanges
						];

					const maxPollutantValue = Math.max(
						pollutant["Very Poor"].min,
						airValue,
					);

					// Get CURRENT LEVEL
					const currentLevel = (() => {
						for (const [level, range] of Object.entries(
							pollutant,
						)) {
							if (
								airValue >= range.min &&
								(range.max === null || airValue <= range.max)
							) {
								return level;
							}
							return "Very Poor";
						}
					})();

					//Define Quality LEvel color
					const qualityColor = (() => {
						switch (currentLevel) {
							case "Good":
								return "bg-green-500";
							case "Fair":
								return "bg-yellow-500";
							case "Moderate":
								return "bg-orange-500";
							case "Poor":
								return "bg-red-500";
							case "Very Poor":
								return "bg-purple-500";
							default:
								return "bg-zinc-500";
						}
					})();
					return (
						<Card
							key={airName}
							className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
							childrenClassName="flex flex-col gap-3"
						>
							<div className="flex justify-between">
								<div className="flex items-center gap-2">
									<span className="text-lg font-bold capitalize">
										{airName}
									</span>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger>
												<Info className="size-4" />
											</TooltipTrigger>
											<TooltipContent className="z-2000">
												<p className="max-w-xs">
													Concentration of{" "}
													{
														pollutantNameMapping[
															airName.toUpperCase() as Pollutant
														]
													}
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
								<span className="text-lg font-semibold">
									{airValue}
								</span>
							</div>
							<Slider
								disabled
								min={0}
								max={maxPollutantValue}
								value={[airValue]}
							/>
							<div className="flex justify-between text-xs">
								<p>0</p>
								<p>{maxPollutantValue}</p>
							</div>
							<div className="flex justify-between">
								{Object.keys(pollutant).map((quality) => (
									<span
										key={quality}
										className={clsx(
											"py-2 px-1 text-xs rounded-md font-medium",
											quality === currentLevel
												? qualityColor
												: "bg-muted text-muted-foreground",
										)}
									>
										{quality}
									</span>
								))}
							</div>
						</Card>
					);
				},
			)}
		</div>
	);
}

// This is below code for define Air quality number range definition like 0 - 100 good
type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

interface Range {
	min: number;
	max: number | null;
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3";

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>;

const airQualityRanges: AirQualityRanges = {
	SO2: {
		Good: { min: 0, max: 20 },
		Fair: { min: 20, max: 80 },
		Moderate: { min: 80, max: 250 },
		Poor: { min: 250, max: 350 },
		"Very Poor": { min: 350, max: null },
	},
	NO2: {
		Good: { min: 0, max: 40 },
		Fair: { min: 40, max: 70 },
		Moderate: { min: 70, max: 150 },
		Poor: { min: 150, max: 200 },
		"Very Poor": { min: 200, max: null },
	},
	PM10: {
		Good: { min: 0, max: 20 },
		Fair: { min: 20, max: 50 },
		Moderate: { min: 50, max: 100 },
		Poor: { min: 100, max: 200 },
		"Very Poor": { min: 200, max: null },
	},
	PM2_5: {
		Good: { min: 0, max: 10 },
		Fair: { min: 10, max: 25 },
		Moderate: { min: 25, max: 50 },
		Poor: { min: 50, max: 75 },
		"Very Poor": { min: 75, max: null },
	},
	O3: {
		Good: { min: 0, max: 60 },
		Fair: { min: 60, max: 100 },
		Moderate: { min: 100, max: 140 },
		Poor: { min: 140, max: 180 },
		"Very Poor": { min: 180, max: null },
	},
	CO: {
		Good: { min: 0, max: 4400 },
		Fair: { min: 4400, max: 9400 },
		Moderate: { min: 9400, max: 12400 },
		Poor: { min: 12400, max: 15400 },
		"Very Poor": { min: 15400, max: null },
	},
	NO: {
		Good: { min: 0, max: 20 },
		Fair: { min: 20, max: 40 },
		Moderate: { min: 40, max: 60 },
		Poor: { min: 60, max: 80 },
		"Very Poor": { min: 80, max: null },
	},
	NH3: {
		Good: { min: 0, max: 40 },
		Fair: { min: 40, max: 70 },
		Moderate: { min: 70, max: 150 },
		Poor: { min: 150, max: 200 },
		"Very Poor": { min: 200, max: null },
	},
};

const pollutantNameMapping: Record<Pollutant, string> = {
	SO2: "Sulfur dioxide",
	NO2: "Nitrogen dioxide",
	PM10: "Particulate matter 10",
	PM2_5: "Fine particles matter",
	O3: "Ozone",
	CO: "Carbon monoxide",
	NO: "Nitrogen monoxide",
	NH3: "Ammonia",
};
